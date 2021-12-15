import { Grid, Button, Typography, Card, CircularProgress } from "@material-ui/core";
import { useQuery } from "react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { getCurrentParams } from "../../../api/body-params";
import { useStyles } from "./user-params.styles";
import toast from "../../toast";
import AddBodyParamsModal from "../../forms/add-params/add-params";

const UserParams = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const [open, setOpen] = React.useState(false);
  const[params, setParams] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { status, data } = useQuery("params", getCurrentParams, {
    onError: () => {
      notify("error", t("An error occured, please reload this page!"));
    },
    onSuccess: (data) => {
      if(window.localStorage.getItem("i18nextLng") === "en") {
       let weight = Math.round(data.weight * 2.2);
       let height = Math.round(data.height * 0.03);
       let sex = data.sex;
       setParams([weight, height, sex])
      }else{
     let  weight = data.weight
     let height = data.height
        let sex = data.sex;
      setParams([weight, height, sex])
      }
    }
  });

  return (
    <Grid container>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && (
        <Grid justifyContent="center" container>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
      {status === "success" && (
        <Card className={classes.paper}>
          <Grid container direction="column">
            <Typography color="primary" variant="h5">
              {t("My body parameters")}
            </Typography>
          </Grid>
          <Grid className={classes.paramContainer} container alignItems="flex-start" spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary">
                {t("My weight")}: <strong> {params[1]}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary">
                {t("My height")}: <strong>{params[0]}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary">
                {t("My sex")}: <strong> {params[2] ? "man" : "women"}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button  className={classes.button} onClick={handleOpen}>
                {t("Add new body parameters")}
              </Button>
            </Grid>
            <AddBodyParamsModal open={open} handleClose={handleClose} />
          </Grid>
        </Card>
      )}
    </Grid>
  );
};

export default UserParams;
