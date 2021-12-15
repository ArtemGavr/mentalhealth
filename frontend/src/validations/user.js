import * as Yup from "yup";

export const login_shema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

export const register_shema = Yup.object().shape({
    firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
    lastName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    age: Yup.number().min(16, "You cannot be under 16").max(100, "Please enter valid age").required("Required"),
    sex: Yup.string().required("This field is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must be the same!")
      .required("Required!"),
  });

  export const edit_user_shema = Yup.object().shape({
    firstName: Yup.string().max(15, "Must be 15 characters or less").optional(),
    lastName: Yup.string().max(15, "Must be 15 characters or less").optional(),
    email: Yup.string().email("Email is invalid").optional(),
    age: Yup.number().min(16, "You cannot be under 16").max(100, "Please enter valid age").optional(),
    password: Yup.string().optional(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must be the same!")
      .optional(),
  });