import * as Yup from "yup";
import PasswordValidations from "../FormikYupStandards/PasswordValidations";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";



const PasswordYupSchema = Yup.object().shape({
  password: PasswordValidations.required("Password is required"),
  retypePassword: PasswordValidations.required("Retype password is required"),
});
export { PasswordYupSchema }