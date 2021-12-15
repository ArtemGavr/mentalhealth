import { Grid, Button, Typography, Card, CircularProgress } from "@material-ui/core";
import { useQuery } from "react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useStyles } from "./user-illness.styles";
import toast from "../../toast";
import IllnessCard from "../illness-card/illness-card";
import { getUserIllness } from "../../../api/user-illness";


const UserIllness = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const { status, data } = useQuery("userIllness", getUserIllness, {
      onSuccess:(data) => {
        console.log("--------------------")
        console.log(data);
      },
    onError: () => {
      notify("error", t("An error occured getting illness, please reload this page!"));
    },
  });

  const redirectToIllness = () => {
      history.push('/illness')
  }

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
              {t("My current illnesses")}
            </Typography>
          </Grid>
          <Grid className={classes.paramContainer} container alignItems="flex-start" spacing={1}>
            <Grid item xs={12}>
             {data.map(illness => <IllnessCard key={illness._id} illness={illness} />)}
            </Grid>

          </Grid>
        </Card>
      )}
    </Grid>
  );
};

export default UserIllness;
