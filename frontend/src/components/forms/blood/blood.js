import { Grid, Paper, Avatar, Button, TextField, Typography, FormLabel, CircularProgress } from "@material-ui/core";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useStyles } from "./blood.styles";
import MedicationIcon from '@mui/icons-material/Medication';
import React, {useEffect} from "react";
import {Link, useHistory, } from "react-router-dom";
import toast from "../../toast";
import {  getLastAnalyzes } from "../../../api/analyzes";
import { addBlood } from "../../../api/blood";



const Blood = props => {
   
  const formik = useFormik({
    initialValues :{
    eryth: 0,
    hemo:0,
    leuko: 0,
    trombo:0,
    bezof:0,
    ezino:0,
    limfo:0,
    mono:0,
  }, 
  onSubmit:values => {
     const blood = {values, analyzesId}
      mutation.mutate(blood)}
    } )
const [analyzesId, setAnalyzesId ] = React.useState("");

  const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const { status, data } = useQuery("analyzes", getLastAnalyzes, {
    keepPreviousData: true,
      onSuccess:(data) => {
       setAnalyzesId(data._id);
      },
    onError: () => {
      notify("error", t("An error occured, please reload this page!"));
    },
  });

  const mutation = useMutation(addBlood, {
    onSuccess: ({data }) => {
        redirectToMental();
          notify("success", t("Your answers were saved"));
          
    },
    onError: () => {
      notify("error", t("Something went wrong, please try again!"));
    },
  });

  const redirectToMental = () => {
      history.push("/mental");
  }

  return (
      <Grid container>
    {status === "error" && <p>Error fetching data</p>}
    {status === "loading" && (
      <Grid justifyContent="center" container>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )}
    {status === "success" && (
    <Paper className={classes.paper} elevation={20}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <MedicationIcon fontSize="large"  />
      </Grid>
          <form onSubmit={formik.handleSubmit}>
           <Grid container alignItems="center">
           <Grid item xs={8}>
                    <FormLabel>{t("Erythrocytes")}</FormLabel>
                  </Grid>
           <Grid item className={classes.container} xs={3}>
           <TextField
           value={formik.values.eryth}
           fullWidth
           onChange={formik.handleChange}
           InputProps={{
            inputProps: {
              max: 20,
              min: 0,
            },
          }}
          name="eryth"
          placeholder="Enter your temperture"
          type="number"
           />

         </Grid>
         <Grid item xs={8}>
         <FormLabel>{t("Hemoglobin")}</FormLabel>
       </Grid>
<Grid item className={classes.container} xs={3}>
<TextField
value={formik.values.hemo}
fullWidth
onChange={formik.handleChange}
InputProps={{
 inputProps: {
   max: 200,
   min: 0,
 },
}}
name="hemo"
placeholder="Enter your temperture"
type="number"
/>

</Grid>
<Grid item xs={8}>
<FormLabel>{t("Leukocytes")}</FormLabel>
</Grid>
<Grid item className={classes.container} xs={3}>
<TextField
value={formik.values.leuko}
fullWidth
onChange={formik.handleChange}
InputProps={{
inputProps: {
max: 30,
min: 0,
},
}}
name="leuko"
placeholder="Enter your temperture"
type="number"
/>

</Grid>
<Grid item xs={8}>
<FormLabel>{t("Patelets")}</FormLabel>
</Grid>
<Grid item className={classes.container} xs={3}>
<TextField
value={formik.values.trombo}
fullWidth
onChange={formik.handleChange}
InputProps={{
inputProps: {
max: 400,
min: 0,
},
}}
name="trombo"
placeholder="Enter your temperture"
type="number"
/>

</Grid>
<Grid item xs={8}>
<FormLabel>{t("Basophils")}</FormLabel>
</Grid>
<Grid item className={classes.container} xs={3}>
<TextField
value={formik.values.bezof}
fullWidth
onChange={formik.handleChange}
InputProps={{
inputProps: {
max: 100,
min: 0,
},
}}
name="bezof"
placeholder="Enter your temperture"
type="number"
/>

</Grid>
<Grid item xs={8}>
<FormLabel>{t("Eosinophils")}</FormLabel>
</Grid>
<Grid item className={classes.container} xs={3}>
<TextField
value={formik.values.ezino}
fullWidth
onChange={formik.handleChange}
InputProps={{
inputProps: {
max: 100,
min: 0,
},
}}
name="ezino"
placeholder="Enter your temperture"
type="number"
/>

</Grid>
         
         <Grid item xs={8}>
                    <FormLabel>{t("Lymphocytes")}</FormLabel>
                  </Grid>
            <Grid item className={classes.container} xs={3}>
              <TextField
              value={formik.values.limfo}
              fullWidth
              onChange={formik.handleChange}
              InputProps={{
               inputProps: {
                 max: 100,
                 min: 0,
               },
             }}
             name="limfo"
             placeholder="Enter your heart rate"
             type="number"
              />

            </Grid>
            <Grid item xs={8}>
                    <FormLabel>{t("Monocytes")}</FormLabel>
             </Grid>
            <Grid item className={classes.container} xs={3}>
              <TextField
              value={formik.values.mono}
              fullWidth
              onChange={formik.handleChange}
              InputProps={{
               inputProps: {
                 max: 100,
                 min: 0,
               },
             }}
             name="mono"
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
    )}
    </Grid>
  );
};

export default Blood;
