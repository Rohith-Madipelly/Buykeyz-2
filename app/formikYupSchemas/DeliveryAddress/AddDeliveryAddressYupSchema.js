import * as Yup from 'yup';
import NameValidations from '../FormikYupStandards/NameValidations';
import PhoneValidations from '../FormikYupStandards/PhoneValidations';

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const AddDeliveryAddressYupSchema = Yup.object().shape({

    name: NameValidations.required('First Name is required'),
    addressName: Yup.string().matches(/^\S.*\S$|^\S$/, 'Address title cannot start or end with a space').required('Address Name is required'),
    address: Yup.string()
        .matches(/^\S.*\S$|^\S$/, 'Address cannot start or end with a space')
        .min(5, 'Address must be at least 5 characters')
        .max(100, 'Address cannot exceed 100 characters').required('Address is required'),

    city: Yup.string()
        .matches(/^\S.*\S$|^\S$/, 'City cannot start or end with a space')
        .matches(nameRegex, 'Only alphabets allowed')
        .min(3, 'City must be at least 3 characters')
        .max(50, 'City cannot exceed 50 characters')
        .required('City is required'),
    area: Yup
        .string()
        .matches(/^\S.*\S$|^\S$/, 'Area cannot start or end with a space')
        .min(3, 'Area must be at least 3 characters')
        .max(50, 'Area cannot exceed 50 characters'),
    // .required('Area is required'),

    pincode: Yup.string()
        .matches(/^\d{6}$/, 'Pincode must be 6 digits')
        .required('Pincode is required'),
    state: Yup.string()
        .matches(/^\S.*\S$|^\S$/, 'State cannot start or end with a space')
        .matches(nameRegex, 'Only alphabets allowed')
        .min(3, 'State must be at least 3 characters')
        .max(30, 'State cannot exceed 30 characters')
        .required('State is required'),

    district: Yup.string()
        .matches(/^\S.*\S$|^\S$/, 'District cannot start or end with a space')
        .matches(nameRegex, 'Only alphabets allowed')
        .min(3, 'District must be at least 3 characters')
        .max(50, 'District cannot exceed 50 characters')
        .required('District is required'),


    phoneNumber: PhoneValidations.required('Phone is required'),

    alternatePhoneNumber:  PhoneValidations
        .matches(/^\d{10}$/, 'Alternate phone must be 10 digits').required('Alternate Phone is required'),
});

export { AddDeliveryAddressYupSchema };
// address