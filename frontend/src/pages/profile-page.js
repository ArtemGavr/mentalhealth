import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid} from "@material-ui/core"
import UserParams from "../components/cards/user-params/user-params";
import Profile from "../components/profile/profile";
import UserIllness from "../components/cards/user-illness/user-illness";
import Diary from "../components/cards/diary-card/diary-card";
import Statistic from "../components/cards/statistic/statistic";

const useStyles = makeStyles({
    container: {
      padding: "30px 20px",
      maxWidth: 1200,
      margin: "auto",
    },
  });
  


const ProfilePage = () => {
    const classes = useStyles();
    return(
    <Grid className={classes.container} container spacing={1}  direction="row">
    <Grid item xs={12} sm={4} >
    <Profile />
    </Grid>
    <Grid item xs={12} sm={4}>
    <UserParams />
   </Grid>
    <Grid item xs={12} sm={4}>
    <UserIllness />
    </Grid>
    <Grid item xs={12} sm={6}>
    <Diary/>
    </Grid>
    <Grid item xs={12} sm={6}>
    <Statistic />
    </Grid>
    </Grid>
    )
};

export default ProfilePage;