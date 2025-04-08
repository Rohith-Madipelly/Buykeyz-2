import * as Yup from "yup";
import PasswordValidations from "./FormikYupStandards/PasswordValidations";




const ChangePasswordYupSchema = Yup.object().shape({
  old_password: PasswordValidations.required("Old password is required"),
  password: PasswordValidations,
  password_confirmation: Yup.string()
    // .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Password confirmation is required")
});
export { ChangePasswordYupSchema }