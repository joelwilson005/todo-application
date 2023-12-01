import React from "react";
import { motion } from "framer-motion";
import signInFormSchema from "../schemas/signInFormSchema";
import { useFormik } from "formik";
import CreateToastNotification from "../components/CreateToastNotification";
import { useDispatch } from "react-redux";
import { fetchSignInUser } from "../data/userSlice";
import DisabledLoadingButton from "./DisabledLoadingButton";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";

// Form initial values
const initialValues = {
  username: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  // Send form data to REST endpoint
  const sendFormData = async (payload) => {
    try {
      const action = await dispatch(fetchSignInUser(payload));

      // Check if the action type is 'rejected' and if there is an error property
      if (fetchSignInUser.rejected.match(action) && action.error) {
        const errorCode = action.error.code;

        if (errorCode === "ERR_BAD_REQUEST") {
          CreateToastNotification("error", "Invalid username or password");
        } else {
          CreateToastNotification("error", "An error occurred");
        }
      }
    } catch (error) {
      CreateToastNotification("error", "An unexpected error occurred");
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signInFormSchema,

    onSubmit: async (values, actions) => {
      await sendFormData(values);
    },
  });

  return (
    <>
      <div className="flex flex-col p-10 bg-neutralBackground 2xl:place-self-center sm:py-20">
        <h2 className="text-center text-neutralText">Sign in</h2>{" "}
        <form className="flex flex-col p-10" onSubmit={onsubmit}>
          <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="text"
            placeholder="Username"
            value={values.username}
            onBlur={handleBlur}
            name="username"
            id="username"
            onChange={handleChange}
            className={errors.username ? "form-input error" : "form-input"}
          />

          {errors.username && (
            <p className="error-text">Please enter a valid username</p>
          )}

          <div className="flex mb-4">
            <motion.input
              whileFocus={{
                scale: 1.02,
              }}
              type={type}
              placeholder="Password"
              name="password"
              value={values.password}
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password
                  ? "form-input error min-w-full"
                  : "form-input min-w-full"
              }
            />
            <span
              className="flex items-center justify-around"
              onClick={handleToggle}
            >
              <Icon className="absolute mr-10" icon={icon} size={25} />
            </span>
          </div>
          {errors.username && (
            <p className="error-text">Please enter a valid password</p>
          )}

          {(!isSubmitting && (
            <motion.button
              whileHover={{
                scale: 1.02,
                rotate: "-3deg",
              }}
              className="hover:drop-shadow-md"
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Submit
            </motion.button>
          )) || <DisabledLoadingButton />}
        </form>
        <p className="px-10 text-main">
          Don't have an account?{" "}
          <motion.span
            whileHover={{
              scale: 1.05,
            }}
            className="block mt-4 max-w-fit text-accent"
          >
            <Link to="/signup" className="hover:underline">
              Sign up
            </Link>
          </motion.span>
        </p>
        <p className="px-10 mt-8 text-main">
          Forgot your password?{" "}
          <motion.span
            whileHover={{
              scale: 1.05,
            }}
            className="block mt-4 max-w-fit text-accent"
          >
            <Link to="/reset" className="hover:underline">
              Reset password
            </Link>
          </motion.span>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
