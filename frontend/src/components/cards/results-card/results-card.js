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
        let saturationComment = "";
        let passedComment = "";
        let mentalComment = "";
        console.log(data);
        (data.saturation<93) ?  saturationComment = "We advise you to get lungs screen and go to the specialist":
        saturationComment ="Your saturation looks okay";
        (data.passed) ? passedComment ="Your blood test: passed":
        passedComment ="Your blood test: failed";
        (data.heartRate > 99 || data.heartRate < 59) ? heartRateComment="We advise you to make a visit to cardiologist":
        heartRateComment = "Your heart looks okay";
        (data.mentalInstruction) ? mentalComment ="Your mental state is okay":
        mentalComment ="We advise you to make a psychologist visit";
        const arr =[];
        arr.push(saturationComment, passedComment, heartRateComment, mentalComment);
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
    doc.text(20, 60, `saturation: ${data.saturation}`)
    doc.text(20, 90, `${commments[0]}`)
    doc.text(20, 120, `${commments[1]}`)
    doc.text(20, 150, `Bllod results:`)
    doc.text(20, 180, `Leukocytes: ${data.leuko}`)
    doc.text(250, 180, `Lymphocytes: ${data.limfo}`)
    doc.text(20, 210, `Bazophils: ${data.bezof}`)
    doc.text(250, 210, `Erythrocytes: ${data.eryth}`)
    doc.text(20, 240, `Eosinophils: ${data.ezino}`)
    doc.text(250, 240, `Hemoglobin: ${data.hemo}`)
    doc.text(20, 270, `Monocytes: ${data.mono}`)
    doc.text(250, 270, `Patelets: ${data.trombo}`)
    doc.text(20, 310, `${commments[2]}`)
    doc.text(20, 340, `Heart rate ${data.heartRate}`)
    doc.text(20, 370, `Psychological check: `)
    doc.text(200, 370, `${commments[3]}`)
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
             Your results are ready
            </Typography>
          </Grid>
          <Grid item sm={12}>
          <Typography variant="subtitle1" color="textSecondary">
           To download your results press the "Download" button
          </Typography>
        </Grid>
          <Grid className container alignItems="flex-start" spacing={1}>

            <Grid item sm={12}>
              <Button  className={classes.button} onClick={generatePDF} >
               Download
              </Button>
            </Grid>
          </Grid>
        </Grid>
        </Card>
      )}
    </Grid>
  );
};

export default Results;
