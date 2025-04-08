import * as Yup from "yup";
import PasswordValidations from "../FormikYupStandards/PasswordValidations";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";



const LoginPageYupSchema = Yup.object().shape({
  email:EmailValidations,
  password:PasswordValidations,
   fcmToken: Yup.mixed()
});
export { LoginPageYupSchema }