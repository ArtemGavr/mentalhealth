import { Grid, Button, TextField, FormLabel, FormControl, InputLabel, Select, Card, Modal } from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { useStyles } from "./add-illness.styles";
import {useHistory} from "react-router-dom";
import bodyParams_schema from "../../../validations/body-params";
import toast from "../../toast";
import { createIllnes } from "../../../api/illness";


const INITIAL_FORM_STATE = {
  title: '',
  stage: 0,
};

const AddIllnessModal = ({open, handleClose}) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const mutation = useMutation(createIllnes, {
    onSuccess: values => {
        notify("success", t("New illness was successfully added"));
        handleClose();
        redirectToProfile();
      return values;
    },
    onError: () => {
      notify("error",t( "An error occured, please try again!"));
    },
  });

  const redirectToProfile = () => {
    history.push("/profile");
}


  const min = 1;
  const mid = 2;
  const extra = 3;
  return (
      <Modal  open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
    <Grid container className={classes.modal}>
        <Card className={classes.paper}>
          <Grid container direction="column" justify="center" alignItems="center">
            <h2>{t("Add Illness")}</h2>
          </Grid>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            onSubmit={values => mutation.mutate(values)}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={6}>
                    <FormLabel>{t("Illness")}</FormLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.field}
                      value={values.title}
                      onChange={handleChange}
                      name="title"
                      type="text"
                    />
                    {errors.title && touched.title ? <div>{errors.title}</div> : null}
                  </Grid>
                  <Grid item xs={6}>
                    <FormLabel>{t("Level")}</FormLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>{t("Level")}</InputLabel>
                      <Select
                        native
                        value={values.stage}
                        onChange={handleChange}
                        label="stage"
                        inputProps={{
                          name: "stage",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={min}>1</option>
                        <option value={mid}>2</option>
                        <option value={extra}> 3</option>
                      </Select>
                    </FormControl>
                    {errors.stage && touched.stage ? <div>{errors.stage}</div> : null}
                  </Grid>
                  <Grid item>
                    <Button
                      allign="center"
                      className={classes.button}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                     {t("Submit")}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Card>
    </Grid>
    </Modal>
  );
};

export default AddIllnessModal;
