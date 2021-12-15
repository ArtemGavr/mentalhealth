import React, {useEffect} from "react";
import { Grid, Typography, Card, Icon, IconButton} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useStyles } from "./profile.styles";
import EditIcon from '@mui/icons-material/Edit';
import EditProfileModal from "../forms/edit-profile/edit-profile";

const Profile = () => {

    const classes = useStyles();
    const history = useHistory();


    if(JSON.parse(sessionStorage.getItem('user')) == null){
      history.push("/");
    }
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    useEffect(() => {
        console.log( JSON.parse(sessionStorage.getItem('user')))
        if ( sessionStorage.getItem('user') === null) {
           history.push('/login');
        }
    })
    return (
        <Card className={classes.paper}>
        <Grid container direction="column">
          <Grid item xs={12} sm={12}>
            <Typography color="primary" variant="h5">
              {t("My account")}:
            </Typography>
          </Grid>
  
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("First Name")}: <strong>{user.userWithEmail.firstName}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("Last Name")}: <strong>{user.userWithEmail.lastName}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("sex")}: <strong>{user.userWithEmail.sex}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1" color="textSecondary">
              {t("age")}: <strong>{user.userWithEmail.age}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" color="textSecondary">
          {t("doc's gmail")}: <strong>{user.userWithEmail.doctorMail}</strong>
          </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" color="textSecondary">
          {t("mail")}: <strong>{user.userWithEmail.email}</strong>
          </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
          <IconButton className={classes.editButton} size="small" className={classes.editButton} aria-label="edit" onClick={handleOpen} >
         <EditIcon color="primary" />
      </IconButton>
      <EditProfileModal open={open} handleClose={handleClose} values={{lastName: user.userWithEmail.lastName, firstName: user.userWithEmail.firstName, email: user.userWithEmail.email, password: user.userWithEmail.password, age:  user.userWithEmail.age, doctorMail: user.userWithEmail.doctorMail, id: user.userWithEmail.id}}/>
      </Grid>
        </Grid>
      </Card>
    )

}

export default Profile;