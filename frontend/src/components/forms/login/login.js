import { Grid, Paper, Avatar, Button, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useMutation } from "react-query";
 import { authenticate } from "../../../api/patient";
import { useStyles } from "./login.styles";
import { login_shema } from "../../../validations/user";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next"
import { ActionCreators } from "../../../redux/user/user.actions";
import {Link, useHistory, } from "react-router-dom";
import toast from "../../toast";


const Login = props => {
    useEffect(() => {
        if (sessionStorage.getItem('token') !== null) {
            redirectToProfile();
        }
    })
    const { t } = useTranslation();
const dispatch = useDispatch();
  const formik = useFormik({
    initialValues :{
    email: "",
    password: "",
  }, validationSchema: login_shema,
  onSubmit:values => {
    const i18nextLng = window.localStorage.getItem("i18nextLng");
    window.localStorage.setItem("i18nextLng", i18nextLng )
    mutation.mutate(values)}
    } )

  const classes = useStyles();
    const history = useHistory();

    const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const mutation = useMutation(authenticate, {
    onSuccess: ({userWithEmail, token }) => {
        console.log(userWithEmail, token
            );

       const newUser = {userWithEmail, token}
        dispatch(ActionCreators.login(newUser));
          notify("success", t("Successfully logged in"));
          redirectToProfile();
    },
    onError: () => {
      notify("error", t("Invalid username or password, please try again!"));
    },
  });

  const redirectToProfile = () => {
      history.push("/profile");
  }

  return (
    <Paper className={classes.paper} elevation={20}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Avatar className={classes.avatar} />
        <h2>{t("sign in")}</h2>
      </Grid>
          <form onSubmit={formik.handleSubmit}>
           <Grid container alignItems="center">
           <Grid item className={classes.container} xs={12}>
           <TextField
             value={formik.values.email}
             onChange={formik.handleChange}
             fullWidth
             name="email"
             placeholder={t("Enter your username")}
             type="text"
           />

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

            </Grid>
            <Grid item className={classes.buttonAllign} xs ={12}>
              <Button className={classes.button} type="submit" variant="contained" color="primary">
                {t("sign in")}
              </Button>
            </Grid>
            <Grid className={classes.containerLink} container direction="row">
              <Grid item xs={12}>
                <Typography variant="body1">
                  {t("Don't have an account?")}{" "}
                  <Link to="/register" onClick={()=> {sessionStorage.clear();
                      history.push("/register");}}>
                    {t("sign up")}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            </Grid>
          </form>
    </Paper>
  );
};

export default Login;
