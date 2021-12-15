import { Card, Typography, Grid, Button } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { useStyles } from "./home.styles";
import { useTranslation, Trans } from 'react-i18next';
import logo from "../../assets/lono.jpeg"
import {useHistory, useLocation} from "react-router-dom";


const HomeWrapper = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(
      localStorage.getItem("i18nextLng") || "en"
    );
  const history = useHistory();
    useEffect(() => {
      i18n.changeLanguage(language);
    }, [language]);

    const RedirectToLogin = () => {
        history.push("/login")

    }
    const RedirectToRegister = () => {
        history.push("/register")

    }

    const handleLanguageChange = (value) => {
        localStorage.setItem("i18nextLng", value);
        setLanguage(value);
        i18n.changeLanguage(language);
      };
   const classes = useStyles();
    return(
        <Card className={classes.container} >
        <Grid container>
        <Grid item sm={3} >
        <img src={logo} width={150} height={120} />
        </Grid>
        <Grid item sm={9} >
        <Typography className={classes.logo_header} variant="overline" > <strong>{t("Be Healthy")} </strong></Typography>
        </Grid>
        <Grid item xs={6}>
              <Button  className={classes.buttonLogin} onClick={RedirectToLogin}>
                {t("sign in")}
              </Button>
            </Grid>
            <Grid item xs={6}>
            <Button  className={classes.buttonRegister} onClick={RedirectToRegister}>
            {t("sign up")}
            </Button>
          </Grid>
        <Grid item sm={2}>
        <Typography  className={classes.language_header} variant="body1">
      <strong>  {t("Language")}:</strong>
        </Typography>
        </Grid >
        <Grid item  className={classes.language_content} sm={6}>
        <p
              onClick={() => handleLanguageChange("ua")}

            >
              {t("Ukraine")}
            </p>
            <p
              onClick={() => handleLanguageChange("en")}

            >
              {t("English")}
            </p>
            </Grid>
            </Grid>
        </Card>

    )
}

export default  HomeWrapper;