import * as Yup from "yup";


const BankDetailsSchema = Yup.object().shape({
  accountNumber: Yup.string().required("Account Number is a Required Field "),
  ifsc: Yup.string().required("IFSC CODE is a Required Field "),
});
export { BankDetailsSchema }