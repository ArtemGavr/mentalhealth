import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  paper: {
    padding: "20px 20px",
    width: 500,
    margin: "10px auto",
  },
  button: {
    marginTop: 10,
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
