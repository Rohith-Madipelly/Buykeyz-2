import * as Yup from 'yup';

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

const NameValidations = Yup.string()
// .test(
//   "no-trailing-spaces",
//   "Name cannot start or end with a space",
//   (value) => value && value.trim() === value
// )
.matches(/^\S.*\S$|^\S$/, 'Name cannot start or end with a space')
.matches(nameRegex, 'Only alphabets allowed')
.min(3, 'Name must be at least 3 characters')
.max(50, 'Name cannot exceed 50 characters')
.required('Name is required');
// .trim()
// // .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Only alphabets and single spaces are allowed')
// .min(3, 'Name must be at least 3 characters')
// .max(50, 'Name cannot exceed 50 characters')
// .required('Name is required');


export default NameValidations


