import React, { useState } from "react";
import { motion } from "framer-motion";
import resetPasswordSchema from "../schemas/resetPasswordFormSchema";
import { useFormik } from "formik";
import CreateToastNotification from "../components/CreateToastNotification";
import DisabledLoadingButton from "./DisabledLoadingButton";
import { Link } from "react-router-dom";
import { requestResetPasswordToken } from "../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import PasswordResetCodeForm from "./PasswordResetCodeForm";

// Form initial values
const initialValues = {
  emailAddress: "",
};

const ResetPasswordForm = () => {
  const [resetCodeSent, setResetCodeSent] = useState(false);

  const getPasswordResetTokenMutation = useMutation({
    mutationFn: requestResetPasswordToken,
  });

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
    validationSchema: resetPasswordSchema,
    validateOnChange: false,

    onSubmit: async (values, actions) => {
      await getPasswordResetTokenMutation.mutateAsync(values, {
        onError: async (error) => {
          const errorStatus = await error.response?.status;

          if (errorStatus === 404) {
            CreateToastNotification("error", "User does not exist");
          } else if (errorStatus) {
            CreateToastNotification("error", "An error has occurred");
          }
        },

        onSuccess: async () => {
          CreateToastNotification(
            "info",
            "Please check your email for your verification code"
          );

          setResetCodeSent(true);
          localStorage.setItem("emailAddress", values.emailAddress);
        },
      });
    },
  });

  return (
    <>
      <div className="flex flex-col p-10 bg-neutralBackground 2xl:place-self-center sm:py-20">
        <h2 className="text-center text-neutralText">Reset password</h2>{" "}
        {(!resetCodeSent && (
          <form className="flex flex-col p-10" onSubmit={onsubmit}>
            <motion.input
              whileFocus={{
                scale: 1.02,
              }}
              type="email"
              disabled={isSubmitting}
              placeholder="Email address"
              value={values.emailAddress}
              name="emailAddress"
              id="emailAddress"
              onBlur={handleBlur}
              onChange={handleChange}
              className={`
            ${
              errors.emailAddress && touched.emailAddress
                ? "form-input error"
                : "form-input"
            }
            ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}
          `}
            />

            {errors.emailAddress && (
              <p className="error-text">{errors.emailAddress}</p>
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
        )) || <PasswordResetCodeForm></PasswordResetCodeForm>}
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
          Back to sign in{" "}
          <motion.span
            whileHover={{
              scale: 1.05,
            }}
            className="block mt-4 max-w-fit text-accent"
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

export default ResetPasswordForm;
