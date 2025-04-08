import * as Yup from "yup";

const PasswordValidations = Yup.string()
  .matches(/^[\x20-\x7E]*$/, "Password should not contain emojis")
  .min(8, "Password is wrong.")
  .max(15, "Password is wrong.")
  // .required("Password is required")
  .test(
    "no-whitespace",
    "Password cannot contain leading or trailing spaces",
    (value) => value && value.trim() === value
  )
  .test(
    "uppercase",
    "Password must contain at least one uppercase letter",
    (value) => /[A-Z]/.test(value)
  )
  .test(
    "lowercase",
    "Password must contain at least one lowercase letter",
    (value) => /[a-z]/.test(value)
  )
  .test(
    "digit",
    "Password must contain at least one digit",
    (value) => /\d/.test(value)
  )

  .test(
    "special-character",
    "Password must contain at least one special character",
    (value) => /[\W_]/.test(value)
  )


export default PasswordValidations;




// const passwordSchema = Yup.string()
//   .min(8, 'Password must be at least 8 characters long')
//   .max(20, 'Password must not exceed 20 characters')
//   .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//   .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
//   .matches(/[0-9]/, 'Password must contain at least one digit')
//   .matches(/[\W_]/, 'Password must contain at least one special character')
//   .required('Password is required');