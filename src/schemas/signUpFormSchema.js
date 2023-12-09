import * as yup from "yup";

// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const nameRules = /^[A-Za-z'-]{1,50}(?:\s[A-Za-z'-]{1,50})?$/;

const userNameRules = /^[a-zA-Z][a-zA-Z0-9_]{7,24}$/;

const SignUpFormSchema = yup.object().shape({
    emailAddress: yup
        .string()
        .email("Please enter a valid email address")
        .required("*Required"),
    firstName: yup
        .string()
        .matches(nameRules, {
            message:
                "First name should consist of 1 to 50 characters and can include letters (A-Z, a-z), hyphens (-), apostrophes ('), and spaces.",
        })
        .required("*Required"),

    lastName: yup
        .string()
        .matches(nameRules, {
            message:
                "Last name should consist of 1 to 50 characters and can include letters (A-Z, a-z), hyphens (-), apostrophes ('), and spaces.",
        })
        .required("*Required"),

    password: yup
        .string()
        .min(8, "Password should be at least 8 characters.")
        .matches(passwordRules, {
            message:
                "Your password must be at least 8 characters long and include at least 1 digit, 1 lowercase letter, and 1 uppercase letter. Special characters are allowed.",
        })
        .required("*Required"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("*Required"),

    username: yup
        .string()
        .matches(
            userNameRules,
            "\n" +
            "Your username should be between 8 and 25 characters in length and must start with a letter. It can consist of letters, digits (0-9), and underscores (_), but it cannot start with a digit or underscore."
        )
        .required("*Required"),

    dateOfBirth: yup
        .date()
        .max(new Date(), "Date of birth must be in the past")
        .required("*Required"),

    gender: yup
        .string()
        .oneOf(["male", "female"], "Invalid gender")
        .lowercase()
        .required("*Required"),
});

export default SignUpFormSchema;
