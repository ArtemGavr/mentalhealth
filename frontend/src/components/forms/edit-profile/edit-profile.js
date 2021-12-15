import {Box, Button, Modal, TextField, Typography, Grid } from "@material-ui/core";
import React from "react";
import {useFormik} from "formik";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import {edit_user_shema} from "../../../validations/user";
import {useStyles} from "./edit-profile.styles";
import { update } from "../../../api/patient";
import toast from "../../toast";
import {useHistory} from "react-router-dom";

const id = (JSON.parse(sessionStorage.getItem('user')) !== null) ? JSON.parse(sessionStorage.getItem('user')).patientWithEmail._id:
0;


const EditProfileModal = ({open, handleClose, values}) => {

    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();
    console.log(sessionStorage.getItem('user'));

    const mutation = useMutation(update, {
        onSuccess: ({user}) => {
          notify("success", t("Your data is updated"));
          history.push('/login');
          },
        onError: () => {
            console.log("denyed");
          notify("error", t("Something went wrong"));
        },
    })

        const notify = React.useCallback((type, message) => {
            toast({ type, message });
          }, []);
    const formik = useFormik({
        initialValues :{
            name: values.name || '',
            surname: values.surname||'',

            email: values.email || "",

            password:  '',
            confirmPassword: '',
        }, //validationSchema: edit_user_shema,
        onSubmit:values => {
          const user = {values, id}
          mutation.mutate(user)}
    } )

    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box className={classes.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {t("Edit profile")}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
            <Grid container alignItems="center">
            <Grid item className={classes.container} xs={12}>
            <TextField
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              name="name"
              placeholder="Enter your name"
              type="text"
            />
            <Grid item className={classes.container} xs={12}>
            <TextField
              value={formik.values.surname}
              onChange={formik.handleChange}
              fullWidth
              name="surname"
              placeholder="Enter your surname"
              type="text"
            />
            </Grid>
            <Grid item className={classes.container} xs={12}>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
          </Grid>



          </Grid>
             <Grid item className={classes.container} xs={12}>
               <TextField
                 value={formik.values.password}
                 onChange={formik.handleChange}
                 fullWidth
                 name="password"
                 placeholder={t("Enter your new password")}
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

            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className={classes.error}>{formik.errors.confirmPassword}</div> : null}
                <Button className={classes.submitButton} type="submit" variant="contained" color="primary">
                    {t("Change")}
                </Button>
            </Grid>
            </form>
        </Box>
    </Modal>)
}

export default EditProfileModal;
