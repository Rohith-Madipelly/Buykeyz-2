import * as Yup from "yup";
import { EmailValidations } from "./FormikYupStandards/EmailValidations";
import PasswordValidations from "./FormikYupStandards/PasswordValidations";



const UpdateProfileYupSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is a required field"),
  last_name: Yup.string().required("Last Name is a required field"),

  phone: Yup.string()
    .trim()
    // .matches(phoneRegExp, 'Phone number must start with 6, 7, 8, or 9 and have at least 6 digits')
    .test(
      'valid-start',
      'Mobile number must start with 6, 7, 8, or 9',
      (value) => {
        if (!value) return false; // Handles the case when value is null or undefined.
        return /^[6-9]/.test(value); // Checks if the first digit is 6, 7, 8, or 9.
      }
    )
    .required("Mobile number is a required field")
    .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number"),



  gender: Yup.string().required("gender is a required field"),
  city_id: Yup.string().required("city_id is a required field"),
  address: Yup.string().required("address is a required field"),
  pincode: Yup.string()
  .matches(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit pincode")
  .required("Pincode is required"),


  // isPhotoRequired: Yup.mixed(),


  // photo: Yup.mixed().when('isPhotoRequired', ([isPhotoRequired], schema) => {
  //   if (isPhotoRequired === "true")
  //     return schema.required('File is required')
  //       .test(
  //         'fileSize',
  //         'File too large Image should not be more then 5 mb',
  //         value => {
  //           console.log("ddd", value.fileSize)
  //           return value && value.fileSize <= 1024 * 1024 * 5 // 10MB limit
  //         }
  //       )
  //       .test(
  //         'fileType',
  //         'Unsupported file format Upload Only pdf format less than 10mb',
  //         value => value && value.type == 'image'
  //       )

  //   return schema
  // }),


});
export { UpdateProfileYupSchema }