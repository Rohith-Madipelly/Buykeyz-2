import * as Yup from 'yup';



const PhoneValidations = Yup.string()
  .trim()
  // .matches(phoneRegExp, 'Phone number must start with 6, 7, 8, or 9 and have at least 6 digits')
  .test(
    'valid-start',
    'Phone Number must start with 6, 7, 8, or 9',
    (value) => {
      if (!value) return false; // Handles the case when value is null or undefined.
      return /^[6-9]/.test(value); // Checks if the first digit is 6, 7, 8, or 9.
    }
  )
  .matches(/^[0-9]{10}$/, "Phone Number must be a 10-digit number")

export default PhoneValidations


