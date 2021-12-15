import React from "react";
import {Link } from "react-router-dom";
import HomeWrapper from "../components/home/home";
import { makeStyles } from "@material-ui/core/styles";
import {Grid} from "@material-ui/core"
import Stethoscope from "../assets/Stethoscope.jpeg"


const useStyles = makeStyles({
    container: {
      padding: "30px 20px",
      width: 1400,
      margin: "100px",
    },
  });

const HomePage = () => {
     
const classes = useStyles();
    return(
        <Grid className={classes.container} container>
        <Grid item sm={5}>
        <img src={Stethoscope} width={565} height={520} />
        </Grid>
        <Grid item sm={6}>
       <HomeWrapper />
       </Grid>
       </Grid>
  );

    
    
};

export default HomePage;