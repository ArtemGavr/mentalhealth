import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid} from "@material-ui/core"
import AdminOnly from "../components/shared/admin-only";
import AdminDashboard from "../components/cards/admin-card/admin-card";
import AdminUserManage from "../components/cards/admin-user-card/admin-user-card";
import AdminDashboardWrapper from "../components/cards/admin-dashboard/admin-dashboard";

const useStyles = makeStyles({
    container: {
      padding: "30px 20px",
      maxWidth: 1200,
      margin: "auto",
    },
  });

  const user = JSON.parse(sessionStorage.getItem('user'));


const AdminPage = () => {
    const classes = useStyles();
    return(
        <Grid className={classes.container} container spacing={1}  direction="row">
        <Grid item s={12} sm={12}>
        <AdminOnly user={user}>
        <AdminDashboardWrapper />
        </AdminOnly>
        </Grid>
        <Grid item s={12} sm={6}>
        <AdminOnly user={user}>
        <AdminDashboard />
        </AdminOnly>
        </Grid>
        <Grid item s={12} sm={6}>
        <AdminOnly user={user}>
        <AdminUserManage />
        </AdminOnly>
        </Grid>
        </Grid>
    )
};

export default AdminPage;