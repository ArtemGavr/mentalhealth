import {
    Grid,
    Button,
    Typography,
    Card,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
  } from "@material-ui/core";
  import { DataGrid } from "@material-ui/data-grid";
  import { useQuery, useMutation } from "react-query";
  import { useStyles } from "./admin-user-card.styles";
  import { userGrid } from "./admin-user-datagrid";
  import toast from "../../toast";
  import React, {useState} from 'react';
  import { useTranslation } from "react-i18next";
  import { deleteUser, getAllUsers } from "../../../api/patient";

  const columns = userGrid;

  const AdminUserManage = () => {

    const classes = useStyles();
    const { t } = useTranslation();
    const [selectedIllness, setSelectedIllness] = useState([]);
    const [open, setOpen] = useState(false);
    const [illness, setIllness] = useState([]);
    const [open2, setOpen2] = useState(false);
    const messageErr = t("An error occured, please reload this page");
    const messageSuc = t("Item was successfully deleted!")
    const messageErr2 = t("An error occured, try again!")

  //  const currentPage = router.query?.page || 1;

    const notify = React.useCallback((type, message) => {
      toast({ type, message });
    }, []);

    const handleClose = () => {
      setOpen(!open);
    };
    const handleOpen = () => setOpen(true);
    const handleClose2 = () => {
        setOpen2(!open2);
      };

    const { data, isLoading , isSuccess, status} = useQuery("userList", getAllUsers, {
      keepPreviousData: true,
      onSuccess: data => {
        console.log(data);
       const rows = data.data.map(item => {
        const { _id, name, surname } = item;
          return { id: _id, name, surname };
        });
        setIllness(rows);
       console.log(rows);
      },
      onError: () => {
        notify("error", messageErr);
      },
    });

    const mutation = useMutation(deleteUser, {
     onSuccess: () => {
      const updatedIllness = illness.filter(item => !selectedIllness.includes(item.id));
       setIllness(updatedIllness);
       handleClose();
        notify("success", messageSuc);
     },
    onError: () => {
       notify("error",messageErr2);
     },
   });


    return (
      <Card className={classes.paper}>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && (
        <Grid justifyContent="center" container>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
      {status === "success" && (
        <Grid container alignItems="center">
          <Grid item className={classes.title} xs={11} sm={12}>
            <Typography variant="h4" color="primary">
             {t("USER LIST")}
            </Typography>
          </Grid>
          <Grid item className={classes.title} xs={1} sm={4}>
            {selectedIllness.length !== 0 && (
              <Button className={classes.deleteButton} onClick={handleClose}>
                {t("Delete")}
              </Button>
            )}
            <Dialog open={open} onClose={handleClose} closeAfterTransition>
              <DialogTitle>{t("Do you want to delete?")}</DialogTitle>
              <DialogContent>
                <DialogContentText>{t("This action is irreversible")}</DialogContentText>
                <DialogActions>
                  <Button onClick={handleClose}>{t("Cancel")}</Button>
                  <Button className={classes.deleteButton} onClick={() => mutation.mutate(selectedIllness)} >
                    {t("Delete")}
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <div className={classes.container}>
              <DataGrid
                rows={illness}
                rowCount={data.total}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={newSelection => {setSelectedIllness(newSelection)
                console.log(selectedIllness)}}
                selectionModel={selectedIllness}
              />
            </div>
          </Grid>
        </Grid>
      )}
      </Card>
    );
  };

  export default AdminUserManage;