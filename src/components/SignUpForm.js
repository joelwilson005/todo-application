import React from "react";
import { motion } from "framer-motion";
import SignUpFormSchema from "../schemas/signUpFormSchema";
import { useFormik } from "formik";
import CreateToastNotification from "../components/CreateToastNotification";
import { useDispatch } from "react-redux";
import { fetchSignUpUser } from "../data/userSlice";
import DisabledLoadingButton from "./DisabledLoadingButton";
import { Link } from "react-router-dom";
import { checkUsernameAndEmailAvailability } from "../api/userAPI";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Form initial values
const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  emailAddress: "",
  dateOfBirth: "",
  gender: "",
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const dispatch = useDispatch();

  // Send form data to REST endpoint
  const sendFormData = async (payload) => {
    const usernameAndEmail = {
      username: payload.username,
      emailAddress: payload.emailAddress,
    };

    try {
      const response = await checkUsernameAndEmailAvailability(
        usernameAndEmail
      );

      const { username, emailAddress } = response.data;

      if (username || emailAddress) {
        if (username) {
          CreateToastNotification("error", "Username already taken");
        }

        if (emailAddress) {
          CreateToastNotification("error", "Email address already taken");
        }

        return;
      }
    } catch (error) {
      CreateToastNotification("error", "An error has occurred");
    }

    dispatch(fetchSignUpUser(payload))
      .unwrap()
      .then(() => {
        navigate("/dashboard")
      }).catch((error) => {


        if(error.code) {

          CreateToastNotification("error", "An unexpected error has occurred");
        }
      });
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
    validationSchema: SignUpFormSchema,

    onSubmit: async (values, actions) => {
      await sendFormData(values);
    },
    validateOnChange: false,
  });

  return (
    <>
      <div className="flex flex-col p-10 bg-neutralBackground 2xl:place-self-center sm:py-20">
        <h2 className="text-center text-neutralText">Sign up</h2>{" "}
        <form className="flex flex-col p-10" onSubmit={onsubmit}>
          <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="text"
            placeholder="First name"
            value={values.firstName}
            name="firstName"
            id="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            className={
              errors.firstName && touched.firstName
                ? "form-input error"
                : "form-input"
            }
          />

          {errors.firstName && <p className="error-text">{errors.firstName}</p>}

          <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="text"
            placeholder="Last name"
            value={values.lastName}
            name="lastName"
            id="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            className={
              errors.lastName && touched.lastName
                ? "form-input error"
                : "form-input"
            }
          />

          {errors.lastName && <p className="error-text">{errors.lastName}</p>}

          <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="text"
            placeholder="Username"
            value={values.username}
            name="username"
            id="username"
            onBlur={handleBlur}
            onChange={handleChange}
            className={
              errors.username && touched.username
                ? "form-input error"
                : "form-input"
            }
          />

          {errors.username && <p className="error-text">{errors.username}</p>}

          <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="email"
            placeholder="Email address"
            value={values.emailAddress}
            name="emailAddress"
            id="emailAddress"
            onBlur={handleBlur}
            onChange={handleChange}
            className={
              errors.emailAddress && touched.emailAddress
                ? "form-input error"
                : "form-input"
            }
          />

          {errors.emailAddress && (
            <p className="error-text">{errors.emailAddress}</p>
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

          {errors.password && <p className="error-text">{errors.password}</p>}

          <div className="flex mb-4">
            <motion.input
              whileFocus={{
                scale: 1.02,
              }}
              type={type}
              placeholder="Confirm password"
              name="confirmPassword"
              value={values.confirmPassword}
              id="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.confirmPassword && touched.confirmPassword
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

          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          <select
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.gender && touched.gender
                ? "form-input error"
                : "form-input"
            }
          >
            <option value="" label="Select a gender">
              Select a gender{" "}
            </option>
            <option value="male" label="Male" className="option"></option>
            <option value="female" label="Female" className="option"></option>
          </select>
          {errors.gender && touched.gender && (
            <p className="error-text">{errors.gender}</p>
          )}

          <label for="dateOfBirth" className="mt-4 text-neutralText">
            Date of birth
          </label>

          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.dateOfBirth && touched.dateOfBirth
                ? "form-input error"
                : "form-input"
            }
          />
          {errors.dateOfBirth && touched.dateOfBirth && (
            <p className="error-text">{errors.dateOfBirth}</p>
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
          Already have an account?{" "}
          <motion.span
            whileHover={{
              scale: 1.05,
            }}
            className="block mt-4 max-w-fit text-accent "
          >
            <Link to="/signin" className="hover:underline">
              Sign in
            </Link>
          </motion.span>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
