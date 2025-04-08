import * as Yup from "yup";
import PasswordValidations from "../FormikYupStandards/PasswordValidations";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";



const ForgetSetPwdYupSchema = Yup.object().shape({
  email: EmailValidations,
  password: PasswordValidations,
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")  
    .required("Password confirmation is required")
});
export { ForgetSetPwdYupSchema }