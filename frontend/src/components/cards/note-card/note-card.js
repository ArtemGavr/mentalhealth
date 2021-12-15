import { Grid, Button, Typography, Card,  CardHeader, CardContent, CardActions, Avatar } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useStyles } from "./note-card.styles";
import React from "react";
import moment from "moment";


const NoteCard = (note) => {
  const classes = useStyles();
  const { t } = useTranslation();
  let title;
  console.log(note.note.note)
  var gmtDateTime = moment.utc(note.note.createdAt);
  var local = gmtDateTime.format('YYYY MMM DD | HH:mm');
  //if (illness.illness.ilnessId === "61802ac813cc0dae9bb3ba91"){
  //  title = "COVID"
 // }
 // console.log(title)
 console.log(local)


  return (
      
      <Grid className={classes.paper} container direction="row" alignItems="center">
      <CardHeader
         
          title={t("Daily note")}
          subheader=
              {  local}
      />
      <Grid item xs={12} sm={12} >
        <Typography className={classes.title} variant="body1">
        {note.note.note}
        </Typography>
        </Grid>
        </Grid>
       
  );
};

export default NoteCard ;