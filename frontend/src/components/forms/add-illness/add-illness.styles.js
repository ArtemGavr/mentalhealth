import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  paper: {
    padding: "30px 20px",
    maxWidth: 600,
    width: "100%",
    backgroundColor: "#f5f7f6"
  },
  formControl: {
    margin: "auto",
    minWidth: 190,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#7ebf9f"
  },
  field: {
    width: 190,
  },
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: 'white',
   // border: '1 solid black',
    borderRadius: 5,
    padding: 30,
    gap: 10,
},
});