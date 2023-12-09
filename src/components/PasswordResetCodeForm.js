import React, {useState} from "react";
import {motion} from "framer-motion";
import passwordResetCodeFormSchema from "../schemas/passwordResetCodeFormSchema";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import DisabledLoadingButton from "./DisabledLoadingButton";
import {fetchResetUserPassword} from "../data/userSlice";
import CreateToastNotification from "./CreateToastNotification";
import {useNavigate} from "react-router-dom";
import {Icon} from "react-icons-kit";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {eye} from "react-icons-kit/feather/eye";

// Form initial values
const initialValues = {
    verificationCode: "",
    password: "",
    confirmPassword: "",
};

const PasswordResetCodeForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State to manage password visibility
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    // Function to send form data to REST endpoint
    const sendFormData = (values) => {
        dispatch(fetchResetUserPassword(values))
            .unwrap()
            .then(() => {
                navigate("/dashboard");
                CreateToastNotification("success", "Password reset successfully");
            })
            .catch((error) => {
                // Handle different error scenarios
                if (error.code === "ERR_BAD_REQUEST") {
                    navigate(0);
                    CreateToastNotification("error", "Invalid token", 6000);
                } else if (error.code) {
                    navigate(0);
                    CreateToastNotification(
                        "error",
                        "An unexpected error has occurred",
                        6000
                    );
                }
            });
    };

    // Function to toggle password visibility
    const handleToggle = () => {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    };

    // Formik hook for form handling
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
        validationSchema: passwordResetCodeFormSchema,
        validateOnChange: false,
        onSubmit: async (values, actions) => {
            sendFormData(values); // Call the function to send form data on form submission
        },
    });

    return (
        <>
            <form className="flex flex-col p-10" onSubmit={handleSubmit}>
                {/* Verification code input field */}
                <motion.input
                    whileFocus={{
                        scale: 1.02,
                    }}
                    type="text"
                    onBlur={handleBlur}
                    maxLength={"6"}
                    placeholder="Verification code"
                    name="verificationCode"
                    value={values.verificationCode}
                    id="verificationCode"
                    onChange={handleChange}
                    className={
                        errors.verificationCode && touched.verificationCode
                            ? "form-input error"
                            : "form-input"
                    }
                />

                {errors.verificationCode && (
                    <p className="error-text">{errors.verificationCode}</p>
                )}

                {/* Password input field */}
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
                    {/* Password visibility toggle */}
                    <span
                        className="flex items-center justify-around"
                        onClick={handleToggle}
                    >
            <Icon className="absolute mr-10" icon={icon} size={25}/>
          </span>
                </div>

                {errors.password && <p className="error-text">{errors.password}</p>}

                {/* Confirm password input field */}
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
                    {/* Password visibility toggle for confirm password */}
                    <span
                        className="flex items-center justify-around"
                        onClick={handleToggle}
                    >
            <Icon className="absolute mr-10" icon={icon} size={25}/>
          </span>
                </div>

                {errors.confirmPassword && (
                    <p className="error-text">{errors.confirmPassword}</p>
                )}

                {/* Submit button */}
                {(!isSubmitting && (
                    <motion.button
                        whileHover={{
                            scale: 1.02,
                            rotate: "-3deg",
                        }}
                        className="hover:drop-shadow-md"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Submit
                    </motion.button>
                )) || <DisabledLoadingButton/>}
            </form>
        </>
    );
};

export default PasswordResetCodeForm;
