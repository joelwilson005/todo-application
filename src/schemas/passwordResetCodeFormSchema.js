import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const passwordResetCodeFormSchema = yup.object().shape({
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

    verificationCode: yup
        .string()
        .matches(/^\d{6}$/, "Verification code must be a 6-digit number")
        .required("*Required"),
});

export default passwordResetCodeFormSchema;
