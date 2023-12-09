import React, {useState} from "react";
import {motion} from "framer-motion";
import SignUpFormSchema from "../schemas/signUpFormSchema";
import {useFormik} from "formik";
import CreateToastNotification from "../components/CreateToastNotification";
import {useDispatch} from "react-redux";
import {fetchSignUpUser} from "../data/userSlice";
import DisabledLoadingButton from "./DisabledLoadingButton";
import {Link, useNavigate} from "react-router-dom";
import {checkUsernameAndEmailAvailability} from "../api/userAPI";
import {Icon} from "react-icons-kit";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {eye} from "react-icons-kit/feather/eye";

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

    // Function to send form data to REST endpoint
    const sendFormData = async (payload) => {
        // Extract username and email from payload for availability check
        const usernameAndEmail = {
            username: payload.username,
            emailAddress: payload.emailAddress,
        };

        try {
            // Check if username or email address is already taken
            const response = await checkUsernameAndEmailAvailability(
                usernameAndEmail
            );

            const {username, emailAddress} = response.data;

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

        // Dispatch action to sign up user
        dispatch(fetchSignUpUser(payload))
            .unwrap()
            .then(() => {
                navigate(0);
                CreateToastNotification(
                    "success",
                    "Account successfully created",
                    5000
                );
            })
            .catch((error) => {
                if (error.code) {
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
        validationSchema: SignUpFormSchema,

        onSubmit: async (values) => {
            await sendFormData(values);
        },
        validateOnChange: false,
    });

    return (
        <>
            <div className="flex flex-col p-10 bg-neutralBackground 2xl:place-self-center sm:py-20">
                <h2 className="text-center text-neutralText">Sign up</h2>{" "}
                <form className="flex flex-col p-10" onSubmit={handleSubmit}>
                    {/* First name input field */}
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

                    {/* Last name input field */}
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

                    {/* Username input field */}
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

                    {/* Email address input field */}
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

                    {/* Gender selection dropdown */}
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

                    {/* Date of birth input field */}
                    <label htmlFor="dateOfBirth" className="mt-4 text-neutralText">
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
                {/* Link to Sign In page */}
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
                <p className="px-10 text-main mt-10 text-sm">
                    By creating an account, you agree to our{" "}
                    <motion.span
                        whileHover={{
                            scale: 1.05,
                        }}
                        className="block mt-4 max-w-fit text-accent "
                    >
                        <Link to="/terms" className="hover:underline text-sm">
                            Terms & Conditions
                        </Link>
                    </motion.span>
                </p>
            </div>
        </>
    );
};

export default SignUpForm;
