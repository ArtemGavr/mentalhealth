import { Grid, Paper, Avatar, Button, TextField, Typography, FormLabel, CircularProgress, FormControl, InputLabel, Select } from "@material-ui/core";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useStyles } from "./mental.styles";
import MedicationIcon from '@mui/icons-material/Medication';
import React, {useEffect} from "react";
import {Link, useHistory, } from "react-router-dom";
import toast from "../../toast";
import {  getUserDiariesLast } from "../../../api/user-diaries";
import { addMental } from "../../../api/mental";



const Mental = props => {

  const formik = useFormik({
    initialValues :{
      stress: 0,
      anxiety: 0,
      depression: 0,
      general: 0,
      happiness: 0
  },
  onSubmit:values => {
     const mental = {values, diariesId}
      mutation.mutate(mental)}
    } )
const [diariesId, setDiariesId ] = React.useState("");

  const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const { status, data } = useQuery("lastDiary", getUserDiariesLast, {
    keepPreviousData: true,
      onSuccess:(data) => {
        setDiariesId(data._id);
      },
    onError: () => {
      notify("error", t("An error occured, please reload this page!"));
    },
  });

  const mutation = useMutation(addMental, {
    onSuccess: ({data }) => {
        redirectToResults();
          notify("success", t("Your answers were saved"));

    },
    onError: () => {
      notify("error", t("Something went wrong, please try again!"));
    },
  });

  const redirectToResults = () => {
      history.push("/profile");
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
           <Grid item xs={6}>
           <FormLabel>{t("Rate your feeling of stress")}</FormLabel>
         </Grid>
         <Grid item xs={6}>
           <FormControl variant="outlined" className={classes.formControl}>
             <InputLabel>{t("Question 1")}</InputLabel>
             <Select
               native
               value={formik.values.stress}
               onChange={formik.handleChange}
               label="stress"
               inputProps={{
                 name: "stress",
               }}
             >
               <option aria-label="None" value="" />
               <option value={1}>1</option>
               <option value={2}>2</option>
               <option value={3}>3</option>
               <option value={4}>4</option>
               <option value={5}>5</option>
               <option value={6}>6</option>
               <option value={7}>7</option>
               <option value={8}>8</option>
               <option value={9}>9</option>
               <option value={10}>10</option>
             </Select>
           </FormControl>
         </Grid>
         <Grid item xs={6}>
         <FormLabel>{t("Rate your feeling of anxiety")}</FormLabel>
       </Grid>
       <Grid item xs={6}>
         <FormControl variant="outlined" className={classes.formControl}>
           <InputLabel>{t("Question 2")}</InputLabel>
           <Select
             native
             value={formik.values.anexityRate}
             onChange={formik.handleChange}
             label="anxiety"
             inputProps={{
               name: "anxiety",
             }}
           >
             <option aria-label="None" value="" />
             <option value={1}>1</option>
             <option value={2}>2</option>
             <option value={3}>3</option>
             <option value={4}>4</option>
             <option value={5}>5</option>
             <option value={6}>6</option>
             <option value={7}>7</option>
             <option value={8}>8</option>
             <option value={9}>9</option>
             <option value={10}>10</option>
           </Select>
         </FormControl>
       </Grid>
       <Grid item xs={6}>
       <FormLabel>{t("Rate your feeling of depression")}</FormLabel>
     </Grid>
     <Grid item xs={6}>
       <FormControl variant="outlined" className={classes.formControl}>
         <InputLabel>{t("Question 3")}</InputLabel>
         <Select
           native
           value={formik.values.indeffRate}
           onChange={formik.handleChange}
           label="depression"
           inputProps={{
             name: "depression",
           }}
         >
           <option aria-label="None" value="" />
           <option value={1}>1</option>
           <option value={2}>2</option>
           <option value={3}>3</option>
           <option value={4}>4</option>
           <option value={5}>5</option>
           <option value={6}>6</option>
           <option value={7}>7</option>
           <option value={8}>8</option>
           <option value={9}>9</option>
           <option value={10}>10</option>
         </Select>
       </FormControl>
     </Grid>
     <Grid item xs={6}>
     <FormLabel>{t("Rate your feeling of general")}</FormLabel>
   </Grid>
   <Grid item xs={6}>
     <FormControl variant="outlined" className={classes.formControl}>
       <InputLabel>{t("Question 4")}</InputLabel>
       <Select
         native
         value={formik.values.lonelRate}
         onChange={formik.handleChange}
         label="general"
         inputProps={{
           name: "general",
         }}
       >
         <option aria-label="None" value="" />
         <option value={1}>1</option>
         <option value={2}>2</option>
         <option value={3}>3</option>
         <option value={4}>4</option>
         <option value={5}>5</option>
         <option value={6}>6</option>
         <option value={7}>7</option>
         <option value={8}>8</option>
         <option value={9}>9</option>
         <option value={10}>10</option>
       </Select>
     </FormControl>
   </Grid>
             <Grid item xs={6}>
               <FormLabel>{t("Rate your feeling of happiness")}</FormLabel>
             </Grid>
             <Grid item xs={6}>
               <FormControl variant="outlined" className={classes.formControl}>
                 <InputLabel>{t("Question 5")}</InputLabel>
                 <Select
                     native
                     value={formik.values.lonelRate}
                     onChange={formik.handleChange}
                     label="happiness"
                     inputProps={{
                       name: "happiness",
                     }}
                 >
                   <option aria-label="None" value="" />
                   <option value={1}>1</option>
                   <option value={2}>2</option>
                   <option value={3}>3</option>
                   <option value={4}>4</option>
                   <option value={5}>5</option>
                   <option value={6}>6</option>
                   <option value={7}>7</option>
                   <option value={8}>8</option>
                   <option value={9}>9</option>
                   <option value={10}>10</option>
                 </Select>
               </FormControl>
             </Grid>
</Grid>

            <Grid item className={classes.buttonAllign} xs ={12}>
              <Button className={classes.button} type="submit" variant="contained" color="primary">
                {t("Complete")}
              </Button>
            </Grid>
          </form>
    </Paper>
    )}
    </Grid>
  );
};

export default Mental;
