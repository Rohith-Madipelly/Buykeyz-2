import * as Yup from "yup";
import PasswordValidations from "../FormikYupStandards/PasswordValidations";
import { EmailValidations } from "../FormikYupStandards/EmailValidations";
import NameValidations from "../FormikYupStandards/NameValidations";



const RegisterPageYupSchema = Yup.object().shape({

  fullName:Yup.string(),
  email:Yup.string(),
  phoneNumber:Yup.string(),
  iAgree:Yup.string(),
  fcmToken:Yup.mixed()
  // fullName: NameValidations.required('First Name is required'),
  // email: EmailValidations,
  // phoneNumber: Yup.string()
  //   .trim()
  //   // .matches(phoneRegExp, 'Phone number must start with 6, 7, 8, or 9 and have at least 6 digits')
  //   .test(
  //     'valid-start',
  //     'Mobile number must start with 6, 7, 8, or 9',
  //     (value) => {
  //       if (!value) return false; // Handles the case when value is null or undefined.
  //       return /^[6-9]/.test(value); // Checks if the first digit is 6, 7, 8, or 9.
  //     }
  //   )
  //   .required("Mobile number is a required field")
  //   .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number"),
  // iAgree: Yup.boolean(),
  // // fcmToken: Yup.mixed()
});
export { RegisterPageYupSchema }