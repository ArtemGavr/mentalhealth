import { Grid, Button, Typography, Card } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useStyles } from "./illness-card.styles";
import React from "react";


const IllnessCard = (illness) => {
  const classes = useStyles();
  const { t } = useTranslation();
  let title;
  console.log(illness.ilnessId)

  title = "Anxiety"

  console.log(title)


  return (
      <Grid className={classes.paper} container direction="row" alignItems="center">
      <Grid item xs={9} >
        <Typography className={classes.title} variant="body1">
       <strong> {t("Name")}</strong>
        </Typography>
        </Grid>
        <Grid item xs={3} >
        <Typography className={classes.title} variant="body1">
        <strong> {t("Severity")} </strong>
        </Typography>
        </Grid>
      <Grid item xs={9} >
        <Typography className={classes.title} variant="body1">
        {title}
        </Typography>
        </Grid>
        <Grid item xs={3} >
        <Typography className={classes.title} variant="body1">
        2
        </Typography>
        </Grid>
        </Grid>
  );
};

export default IllnessCard ;