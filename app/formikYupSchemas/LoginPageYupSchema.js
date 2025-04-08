import * as Yup from "yup";
import { EmailValidations } from "./FormikYupStandards/EmailValidations";
import PasswordValidations from "./FormikYupStandards/PasswordValidations";



const LoginPageYupSchema = Yup.object().shape({
  email:EmailValidations,
  password:PasswordValidations
});
export { LoginPageYupSchema }