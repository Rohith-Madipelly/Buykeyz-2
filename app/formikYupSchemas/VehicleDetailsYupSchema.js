import * as Yup from "yup";


const VehicleDetailsYupSchema = Yup.object().shape({
  vehicle_type: Yup.string().required("Vehicle type is required"), // Required field
  vehicle_no: Yup.string()
  // .matches(
  //   /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
  //   "Invalid vehicle number format"
  // )
    // .matches(/^[A-Z0-9]{2,7}$/, "Invalid vehicle number format") // Simple validation pattern for vehicle numbers
    .required("Vehicle number is required"),


  vehiclePhoto: Yup.mixed().nullable(), // Optional, but can add custom validation if necessary
  ownership: Yup.string().required("Ownership is required"),
});
export { VehicleDetailsYupSchema }

// .oneOf(["Own", "Lease"], "Ownership must be 'Own' or 'Lease'")