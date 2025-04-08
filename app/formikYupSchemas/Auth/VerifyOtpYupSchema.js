import * as Yup from "yup";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";
import OtpValidations from "../FormikYupStandards/OtpValidations";

const VerifyOtpYupSchema = Yup.object().shape({
    otp: OtpValidations,
});
export { VerifyOtpYupSchema }