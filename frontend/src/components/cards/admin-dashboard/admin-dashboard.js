import { Card, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
    container: {
      padding: "30px 20px",
      maxWidth: 1200,
      margin: "auto",
    },
  });

const AdminDashboardWrapper = () => {
   const classes = useStyles();
   const { t } = useTranslation();
    return(
        <Card className={classes.container} >
        <Typography variant="h3">
       {t("Admin Dashboard")}
        </Typography>
        </Card>
    )
}

export default  AdminDashboardWrapper;