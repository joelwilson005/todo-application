import * as yup from "yup";

const resetPasswordSchema = yup.object().shape({
    emailAddress: yup
        .string()
        .email("Please enter a valid email address")
        .required("*Required"),
});

export default resetPasswordSchema;
