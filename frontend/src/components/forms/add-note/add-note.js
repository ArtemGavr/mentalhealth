import { Grid, Button, Typography, Card, TextField, Modal, Box} from "@material-ui/core";
import { useStyles } from "./add-note.styles";
import {useFormik} from "formik";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import toast from "../../toast";
import React from "react";
import { addUserNote } from "../../../api/user-notes";

const ModalAddNote = ({open, handleClose}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
}, []);
  const mutation = useMutation( addUserNote, {
    onSuccess: (data) => {

    notify("success", t("Your comment is added"));

    },
    onError: (error) => {
        console.log("denyed");
      notify("error", t("Something went wrong"));
    },
})
  const formik = useFormik({
    initialValues :{
        note: '',
    },
    onSubmit: note => {
        console.log(note)
        mutation.mutate(note);
    }
} )
  return (
    <Modal  open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <Grid container className={classes.modal}>
    <Box className={classes.paper}>
    <form onSubmit={formik.handleSubmit}>
    <Grid item xs={12}>
    <Typography> {t("Please, add your note")}</Typography>
        </Grid>
    <Grid item xs={12}>
        <TextField
            value={formik.values.note}
            onChange={formik.handleChange}
            fullWidth
            multiline
            rows={2}
            rowsMax={4}
            name="note"
            placeholder={t("Type your note")}
            type="text"
        />
        {formik.errors.commentText && formik.touched.commentText ? <div>{formik.errors.commentText}</div> : null}
        </Grid>
        <Button className={classes.button} type="submit" variant="contained" color="primary">
        {t("Add")}
    </Button>
        </form>
    </Box>
    </Grid>
    </Modal>
  );
};

export default ModalAddNote ;
