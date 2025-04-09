import * as Yup from "yup";
import PasswordValidations from "../FormikYupStandards/PasswordValidations";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";



const LoginPageYupSchema = Yup.object().shape({
  email:EmailValidations,
  password:PasswordValidations,
  fcmToken: Yup.string().notRequired(),
  type: Yup.string()
  // .oneOf(['ios', 'android'], 'Invalid platform type')  // Validates if the value is 'ios' or 'android'
  .notRequired(),  // Makes it optional
});
export { LoginPageYupSchema }