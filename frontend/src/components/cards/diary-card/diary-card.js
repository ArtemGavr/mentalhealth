import { Grid, Button, Typography, Card, CircularProgress } from "@material-ui/core";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import React from "react";
import { useStyles } from "./diary-card.styles";
import toast from "../../toast";
import { getUserDiaries } from "../../../api/user-diaries";
import NoteCard from "../note-card/note-card";
import ModalAddNote from "../../forms/add-diary/add-diary";

const Diary = () => {
  const classes = useStyles();
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  const messageErr = t("An error occured, please reload this page");
  const { status, data } = useQuery("diaries_new", getUserDiaries, {
    onError: () => {
      notify("error", messageErr);
    },
  });
  console.log(data);

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
            <Typography color="primary" variant="h3">
              {t("Diary")}
            </Typography>
          </Grid>
          <Grid className={classes.paramContainer} container alignItems="flex-start" spacing={1}>
          <Grid item xs={12}>
          {data.map((note =>  <NoteCard note={note} key={note._id}  />
          ))}
          </Grid>
          <Button className={classes.button} onClick={handleOpen}>
          {t("Add new note")}
          </Button >
          <ModalAddNote open={open} handleClose={handleClose} />
          </Grid>
        </Card>
      )}
    </Grid>
  );
};

export default Diary;
