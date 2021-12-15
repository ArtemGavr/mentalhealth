import {AppBar, Avatar, Box, Button, Icon, Link, Toolbar, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import {useStyles} from "./heades.styles";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useHistory, useLocation} from "react-router-dom";
import MedicationIcon from '@mui/icons-material/Medication';
import ArticleIcon from '@mui/icons-material/Article';
import AdminOnly from "../../shared/admin-only";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const user = JSON.parse(sessionStorage.getItem('user'))

const Navbar = () => {
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const [condition, setCondition] = useState(false);
    const defPages = ['/login', '/register', '/'];
    const { t } = useTranslation();
   useEffect(() => {
       setCondition(!defPages.includes(location.pathname));
     }, [location])

   // console.log(location.pathname);

    if (condition) {
        return (
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.logo}>
                            MentalHealth
                    </Typography>
                    <div className={classes.navlinks}>
                    <AdminOnly user={user} >
                    <Typography
                    className={classes.link}
               onClick={() => {history.push("/admin");}}>
                {t("Admin")}
                   <AdminPanelSettingsIcon/>
                    </Typography>
                    </AdminOnly>
                    <Typography
                    className={classes.link}
               onClick={() => {history.push("/results");}}>
                {t("Last Results")}
                   <ArticleIcon/>
                    </Typography>
                             <Typography
                              className={classes.link}
                         onClick={() => {history.push("/analyzes");}}>
                          {t("Health Check")}
                             <MedicationIcon/>
                              </Typography>
                        <Typography
                            className={classes.link}
                            onClick={() => {history.push("/profile");}}>
                            {t("Profile")}
                            <PersonOutlineIcon/>
                        </Typography>
                        <Typography
                            className={classes.link}
                            onClick={() => {sessionStorage.clear();
                                history.push("/");}}>
                            <LogoutIcon/>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        )
    } else {
        return null;
    }
}
export default Navbar;