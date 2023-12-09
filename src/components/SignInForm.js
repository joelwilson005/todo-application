import React, {useState} from "react";
import {motion} from "framer-motion";
import signInFormSchema from "../schemas/signInFormSchema";
import {useFormik} from "formik";
import CreateToastNotification from "../components/CreateToastNotification";
import {useDispatch} from "react-redux";
import {fetchSignInUser} from "../data/userSlice";
import DisabledLoadingButton from "./DisabledLoadingButton";
import {Link, useNavigate} from "react-router-dom";
import {Icon} from "react-icons-kit";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {eye} from "react-icons-kit/feather/eye";

// Form initial values
const initialValues = {
    username: "",
    password: "",
};

const SignInForm = () => {
    const dispatch = useDispatch();

    // React Router's navigation hook
    const navigate = useNavigate();

    // State to manage password visibility
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    // Function to send form data to REST endpoint
    const sendFormData = (payload) => {
        dispatch(fetchSignInUser(payload))
            .unwrap()
            .then(() => {
                navigate(0); // Navigate to the dashboard on successful login
            })
            .catch((error) => {
                // Handle different error scenarios
                if (error.code === "ERR_BAD_REQUEST") {
                    CreateToastNotification("error", "Invalid username or password");
                } else if (error) {
                    CreateToastNotification("error", "An unexpected error has occurred");
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
        validationSchema: signInFormSchema,
        onSubmit: async (values, actions) => {
            await sendFormData(values); // Call the function to send form data on form submission
        },
    });

    return (
        <>
            <div className="flex flex-col p-10 bg-neutralBackground 2xl:place-self-center sm:py-20">
                <h2 className="text-center text-neutralText">Sign in</h2>
                <form className="flex flex-col p-10" onSubmit={handleSubmit}>
                    {/* Username input field */}
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
                    {errors.password && (
                        <p className="error-text">Please enter a valid password</p>
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

                {/* Sign-up link */}
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

                {/* Forgot password link */}
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
