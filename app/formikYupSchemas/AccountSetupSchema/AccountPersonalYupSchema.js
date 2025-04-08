import * as Yup from "yup";

const AccountPersonalYupSchema = Yup.object().shape({

  passPortPicture: Yup.mixed().required('File is required')
    .test(
      'fileType',
      'Unsupported file format upload only jpg format less than 10mb',

      value => value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.mimeType)
      // value => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.mimeType)
      // value => value && value.mimeType === 'application/pdf'
      // value =>{console.log("smhv",value.mimeType)}
    ),
    // .test(
    //   'fileSize',
    //   'File too large',
    //   value => value && value.size <= 1024 * 1024 * 10 // 10MB limit
    // ),


  fullName: Yup.string().required("Full Name is a requied field"),
  email: Yup.string().required("Email is a requied field"),
  phoneNumber: Yup.string().required("Phone number is a requied field"),
  dateOfBirth: Yup.string().required("Date of Birth is a requied field"),
  district: Yup.string().required("District is a requied field"),
  address: Yup.string().required("Address is a requied field"),
  street: Yup.string().required("Street is a requied field"),
  area: Yup.string().required("Area is a requied field"),
  pincode: Yup.string().required("Pincode is a requied field"),

});
export { AccountPersonalYupSchema }