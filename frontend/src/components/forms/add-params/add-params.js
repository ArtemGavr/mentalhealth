import { Grid, Button, TextField, FormLabel, FormControl, InputLabel, Select, Card, Modal } from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { useStyles } from "./add-params.styles";
import {useHistory} from "react-router-dom";
import bodyParams_schema from "../../../validations/body-params";
import { addBodyParams } from "../../../api/body-params";
import toast from "../../toast";


const INITIAL_FORM_STATE = {
  weight: 0,
  height: 0,
  activity: 0,
};

const AddBodyParamsModal = ({open, handleClose}) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const mutation = useMutation(addBodyParams, {
    onSuccess: values => {
        notify("success", t("New params were successfully added"));
        handleClose();
        redirectToProfile();
      return values;
    },
    onError: () => {
      notify("error", t("An error occured, please try again!"));
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
            <h2>{t("Calculator")}</h2>
          </Grid>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            onSubmit={values => mutation.mutate(values)}
            validationSchema={bodyParams_schema}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={6}>
                    <FormLabel>{t("Weight")}</FormLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.field}
                      value={values.weight}
                      onChange={handleChange}
                      InputProps={{
                        inputProps: {
                          max: 200,
                          min: 0,
                        },
                      }}
                      name="weight"
                      placeholder="Enter your weight"
                      type="number"
                    />
                    {errors.weight && touched.weight ? <div>{errors.weight}</div> : null}
                  </Grid>
                  <Grid item xs={6}>
                    <FormLabel>{t("Height")}</FormLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.field}
                      value={values.height}
                      onChange={handleChange}
                      InputProps={{
                        inputProps: {
                          max: 250,
                          min: 0,
                        },
                      }}
                      name="height"
                      placeholder="Enter your height"
                      type="number"
                    />
                    {errors.height && touched.height ? <div>{errors.height}</div> : null}
                  </Grid>
                  <Grid item xs={6}>
                    <FormLabel>{t("Sex")}</FormLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel>{t("Sex")}</InputLabel>
                      <Select
                        native
                        value={values.sex}
                        onChange={handleChange}
                        label="Gender"
                        inputProps={{
                          name: "sex",
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={true}>{t("Male")}</option>
                        <option value={false}>{t("Female")}</option>
                      </Select>
                    </FormControl>
                    {errors.sex && touched.sex ? <div>{errors.sex}</div> : null}
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

export default AddBodyParamsModal;
