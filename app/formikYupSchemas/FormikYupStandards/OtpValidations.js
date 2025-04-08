import * as Yup from 'yup';


const OtpValidations = Yup.string()
    .required('Please enter the OTP to proceed')
    .length(6, 'OTP must be 6 digits long') 
    .matches(/^\d+$/, 'OTP must only contain digits (0-9)') 


export default OtpValidations


