import * as Yup from "yup";
import PasswordValidations from "../FormikYupStandards/PasswordValidations";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";



const ChangePasswordYupSchema = Yup.object().shape({
  oldPassword: PasswordValidations.required("Password is required"),
  password: PasswordValidations.required("Password is required"),
  retypePassword: PasswordValidations.required("Retype password is required"),
});
export { ChangePasswordYupSchema }