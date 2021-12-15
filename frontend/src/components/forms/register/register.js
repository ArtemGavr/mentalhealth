import { Grid, Paper, Avatar, Button, TextField, Typography, FormControl, InputLabel, Select } from "@material-ui/core";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
 import { create } from "../../../api/patient";
import { useStyles } from "./register.styles";
import { register_shema } from "../../../validations/user";
import React, {useEffect} from "react";
import { useHistory} from "react-router-dom";
 import toast from "../../toast";


const Register = () => {

  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

    useEffect(() => {
        if (sessionStorage.getItem('token') !== null) {
           history.push('/profile');
        }
    })

  const formik = useFormik({
    initialValues :{
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    sex: "",
    doctorMail: "",
    password: "",
    confirmPassword: "",
  }, validationSchema: register_shema,
  onSubmit:values => mutation.mutate(values)
    } );




  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const mutation = useMutation(create, {
    onSuccess: ({ user }) => {
      notify("success", "Your registration went successfully");
      history.push("/login");
    },
    onError: () => {
        console.log("denyed");
      notify("error", "Something went wrong");
    },
  });

  return (
    <Paper className={classes.paper} elevation={20}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Avatar className={classes.avatar} />
        <h2>{t("sign up")}</h2>
      </Grid>
          <form onSubmit={formik.handleSubmit}>
           <Grid container alignItems="center">
           <Grid item className={classes.container} xs={12}>
           <TextField
             value={formik.values.firstName}
             onChange={formik.handleChange}
             fullWidth
             name="firstName"
             placeholder={t("Enter your name")}
             type="text"
           />
           <Grid item className={classes.container} xs={12}>
           <TextField
             value={formik.values.lastName}
             onChange={formik.handleChange}
             fullWidth
             name="lastName"
             placeholder={t("Enter your surname")}
             type="text"
           />
           </Grid>
           <Grid item className={classes.container} xs={12}>
           <TextField
             value={formik.values.email}
             onChange={formik.handleChange}
             fullWidth
             name="email"
             placeholder={t("Enter your email")}
             type="email"
           />
           {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
         </Grid>
         <Grid item className={classes.container} xs={12}>
         <TextField
           value={formik.values.doctorMail}
           onChange={formik.handleChange}
           fullWidth
           name="doctorMail"
           placeholder={t("Enter your doctor's email")}
           type="email"
         />
         {formik.errors.doctorMail && formik.touched.doctorMail ? <div>{formik.errors.doctorMail}</div> : null}
       </Grid>
         <Grid item className={classes.container} xs={12}>
         <TextField
           value={formik.values.age}
           onChange={formik.handleChange}
           fullWidth
           InputProps={{
            inputProps: {
              max: 100,
              min: 0,
            },
          }}
          name="age"
          placeholder={t("Enter your age")}
          type="number"
         />
         {formik.errors.age && formik.touched.age ? <div>{formik.errors.age}</div> : null}
       </Grid>
       <Grid item className={classes.container} xs={12}>
       <FormControl variant="outlined" className={classes.formControl}>
       <InputLabel>{t("Gender")}</InputLabel>
       <Select
         native
         value={formik.values.sex}
         onChange={formik.handleChange}
         label="Gender"
         inputProps={{
           name: "sex",
         }}
       >
         <option aria-label="None" value="" />
         <option value="male">{t("Male")}</option>
         <option value="female">{t("Female")}</option>
       </Select>
     </FormControl>
       {formik.errors.sex && formik.touched.sex ? <div>{formik.errors.sex}</div> : null}
     </Grid>

         </Grid>
            <Grid item className={classes.container} xs={12}>
              <TextField
                value={formik.values.password}
                onChange={formik.handleChange}
                fullWidth
                name="password"
                placeholder={t("Enter your password")}
                type="password"
              />
              {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}

            </Grid>
            <Grid item className={classes.container} xs={12}>
            <TextField
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              fullWidth
              name="confirmPassword"
              placeholder={t("Enter your password once more")}
              type="password"
            />
            {formik.errors.confirmPassword&& formik.touched.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
          </Grid>
            <Grid item className={classes.buttonAllign} xs ={12}>
              <Button className={classes.button} type="submit" variant="contained" color="primary">
                {t("sign up")}
              </Button>
            </Grid>
            <Grid className={classes.containerLink} container direction="row">
            </Grid>
            </Grid>
          </form>
    </Paper>
  );
};

export default Register;
