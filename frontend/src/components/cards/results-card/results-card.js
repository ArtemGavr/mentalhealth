import { Grid, Button, Typography, Card, CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import jsPDF from 'jspdf'
import React, { useState} from "react";
import { useStyles } from "./results-card.styles";
import toast from "../../toast";
import { getResults } from "../../../api/results";
import logo from "../../../assets/logo.png";
const getCurrentDate =() => {
     let newDate = new Date()
     let date = newDate.getDate();
     let month = newDate.getMonth() + 1;
     let year = newDate.getFullYear();
     let hour = newDate.getHours();
     let minutes = newDate.getMinutes();

     return `${year}.${month<10?`0${month}`:`${month}`}.${date}  ${hour}:${minutes}`
}
const Results = () => {
  const classes = useStyles();
  const [commments, setComments] = useState([]);
  const { t } = useTranslation();
  const messageErr = t("An error occured, please reload this page");
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const { status, data } = useQuery("results", getResults, {
    onSuccess: data => {
        let heartRateComment = "";
        let mentalComment = "";
      let weightComment = "";
        console.log(data);
         data.weightIsOk ? weightComment = "Your weight looks good. " : weightComment = "Obesity might cause productivy loss and depression. ";
        (data.hr > 99 || data.hr < 59) ? heartRateComment=("Heart rate over normal might be caused by stress. "):
        heartRateComment = "Your cardiovascular system looks okay. ";
        (data.mentalInstruction) ? mentalComment =("We strongly advise a visit to a therapist. "):
        mentalComment =("Your mental health is good. ");
        const arr =[];
        arr.push(weightComment, heartRateComment, mentalComment);
        console.log(arr)
        setComments(arr)
    },
    onError: () => {
      notify("error", messageErr);
    },
  });

  const  generatePDF = () => {
    const date = getCurrentDate();
    var doc = new jsPDF('p', 'pt');
    doc.setFont("times",  "bold")
    doc.text(250, 20, 'My results')
    doc.setFont("times", "italic", "normal")
    doc.text(20, 90, ` ${commments[0]}`)
    doc.text(20, 120, ` ${commments[1]}`)

    doc.text(20, 150, `Mental results:`)
    let text = ("Stress") + "  " + data.stress_p;
    doc.text(20, 180,  text)
    doc.text(250, 180, `General: ${data.general_p}`)
    doc.text(20, 210, `Happiness: ${data.happiness_p}`)
    doc.text(250, 210, `Depression: ${data.depression_p}`)
    doc.text(20, 240, `Anxiety: ${data.anxiety_p}`)

    doc.text(20, 370, `Psychological check: `)
    doc.text(200, 370, `${commments[2]}`)
    doc.text(360, 420, `${date}`)
    doc.addImage(logo, "PNG", 360, 450, 180, 180)

    //doc.text(20, 100, 'This is the second title.')
    //doc.text(20, 140, 'This is the thrid title.')
    doc.save('results.pdf')
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
        <Card className={classes.paper}>
        <Grid container direction="column" justifyContent="center">
          <Grid item sm={12} >
            <Typography color="primary" variant="h5">
              {t("Your recommendations are ready")}
            </Typography>
          </Grid>
          <Grid item sm={12} >
            <Typography color="primary" variant="h6">
              {t("Your parameters are below")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("General")}: <strong>{data.general_p}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("Anxiety")}: <strong>{data.anxiety_p}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("Depression")}: <strong>{data.depression_p}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("Happiness")}: <strong>{data.happiness_p}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("Stress")}: <strong>{data.stress_p}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("Recommendations")}: <strong>{t(commments[0]) + " " + t(commments[1]) + " " + t(commments[2])}</strong>
            </Typography>
          </Grid>

        {/*  <Grid item sm={12}>*/}
        {/*  <Typography variant="subtitle1" color="textSecondary">*/}
        {/*    {t("To download your recommendations press the Download button")}*/}
        {/*  </Typography>*/}
        {/*</Grid>*/}
          <Grid className container alignItems="flex-start" spacing={1}>

            {/*<Grid item sm={12}>*/}
            {/*  <Button  className={classes.button} onClick={generatePDF} >*/}
            {/*    {t("Download")}*/}
            {/*  </Button>*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
        </Card>
      )}
    </Grid>
  );
};

export default Results;
