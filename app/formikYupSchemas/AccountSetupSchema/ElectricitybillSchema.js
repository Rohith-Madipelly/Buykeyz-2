import * as Yup from "yup";

const ElectricitybillSchema = Yup.object().shape({
  billNumber: Yup.string().required(),
  // electricityProvider:Yup.string().required(),
  state:Yup.string()
});

export { ElectricitybillSchema };

