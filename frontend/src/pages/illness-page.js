import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import {Grid, Card, Typography} from "@material-ui/core"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const useStyles = makeStyles({
    container: {
      padding: "30px 20px",
      maxWidth: 900,
      margin: "100px auto",
    },
  });
  

const IllnessPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    return(
    <Grid container>
    <Card className={classes.container}>
    <Grid item sm={6}>
    <Typography variant="h5"> 
    {t("Sorry")}...
    </Typography>
    <SentimentVeryDissatisfiedIcon />
    </Grid>
    <Grid item>
    <Typography variant="body1"> 
   {t("Unfortunatelly, for now, we can support only COVID illness. We will develop new tools soon")}...
    </Typography>
    </Grid>
    </Card>

    </Grid>
    )
};

export default IllnessPage;