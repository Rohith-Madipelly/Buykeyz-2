import * as Yup from "yup";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";

const ForgetYupSchema = Yup.object().shape({
  email:EmailValidations,
});
export { ForgetYupSchema }