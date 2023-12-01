import * as yup from "yup"


const signInFormSchema = yup.object().shape({
    password: yup
      .string()
      .min(8)
      .required("*Required"),
  
    username: yup
      .string()
      .min(8)
      .required("*Required"),
  });
  
  export default signInFormSchema;