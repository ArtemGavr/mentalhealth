import * as Yup from "yup";

const bodyParams_schema = Yup.object().shape({
  weight: Yup.number().min(30, "Please enter valid weight").max(200, "Please enter valid weight").required("Required"),
  height: Yup.number()
    .min(130, "Please enter valid height")
    .max(220, "Please enter a valid height")
    .required("Required"),
  activity: Yup.number().required("This field is required"),
});

export default bodyParams_schema;
