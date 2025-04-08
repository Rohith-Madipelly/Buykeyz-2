import * as Yup from "yup";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";
import OtpValidations from "../FormikYupStandards/OtpValidations";

const ForgetOtpYupSchema = Yup.object().shape({
    email: EmailValidations,
    otp: OtpValidations,
});
export { ForgetOtpYupSchema }