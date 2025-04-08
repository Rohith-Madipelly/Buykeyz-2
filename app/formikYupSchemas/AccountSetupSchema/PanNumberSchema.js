import * as Yup from "yup";

// Custom PAN validation function
const isValidPAN = (value) => {
  // PAN regex pattern
  const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(value);
};

// Yup schema for PAN validation
const PanNumberSchema = Yup.object().shape({

  name: Yup.string().required("Name is a required field"),
  panNumber: Yup.string()
    .required("PAN number is a required field")
    .test('pan-validation', 'Invalid PAN', isValidPAN)
});

export { PanNumberSchema };
