import { Grid, Paper, Avatar, Button, TextField, Typography, FormLabel } from "@material-ui/core";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { useStyles } from "./analyzes.styles";
import MedicationIcon from '@mui/icons-material/Medication';
import React, {useEffect} from "react";
import {Link, useHistory, } from "react-router-dom";
import toast from "../../toast";
import { addAnalyzes } from "../../../api/analyzes";


const Analyzes = props => {
   
  const formik = useFormik({
    initialValues :{
    temp: 0,
    heartRate:0,
    saturation: 0
  }, 
  onSubmit:values => mutation.mutate(values)
    } )

  const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  

  const mutation = useMutation(addAnalyzes, {
    onSuccess: ({data }) => {
        console.log(data)
        redirectToBlood();
          notify("success", t("Your answers were saved"));
          
    },
    onError: () => {
      notify("error", t("Invalid username or password, please try again!"));
    },
  });

  const redirectToBlood = () => {
      history.push("/blood");
  }

  return (
    <Paper className={classes.paper} elevation={20}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <MedicationIcon fontSize="large"  />
      </Grid>
          <form onSubmit={formik.handleSubmit}>
           <Grid container alignItems="center">
           <Grid item xs={8}>
                    <FormLabel>{t("Temperature")}</FormLabel>
                  </Grid>
           <Grid item className={classes.container} xs={3}>
           <TextField
           value={formik.values.temp}
           fullWidth
           onChange={formik.handleChange}
           InputProps={{
            inputProps: {
              max: 42,
              min: 36,
            },
          }}
          name="temp"
          placeholder="Enter your temperture"
          type="number"
           />

         </Grid>
         <Grid item xs={8}>
                    <FormLabel>{t("Heart rate")}</FormLabel>
                  </Grid>
            <Grid item className={classes.container} xs={3}>
              <TextField
              value={formik.values.heartRate}
              fullWidth
              onChange={formik.handleChange}
              InputProps={{
               inputProps: {
                 max: 200,
                 min: 40,
               },
             }}
             name="heartRate"
             placeholder="Enter your heart rate"
             type="number"
              />

            </Grid>
            <Grid item xs={8}>
                    <FormLabel>{t("Saturation")}</FormLabel>
             </Grid>
            <Grid item className={classes.container} xs={3}>
              <TextField
              value={formik.values.saturation}
              fullWidth
              onChange={formik.handleChange}
              InputProps={{
               inputProps: {
                 max: 100,
                 min: 40,
               },
             }}
             name="saturation"
             placeholder="Enter your saturation"
             type="number"
              />

            </Grid>
            <Grid item className={classes.buttonAllign} xs ={12}>
              <Button className={classes.button} type="submit" variant="contained" color="primary">
                {t("Continue")}
              </Button>
            </Grid>
            </Grid>
          </form>
    </Paper>
  );
};

export default Analyzes;
