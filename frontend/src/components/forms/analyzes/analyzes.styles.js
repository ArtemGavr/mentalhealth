import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  paper: {
    padding: "30px 20px",
    width: 400,
    margin: "20px auto",
    marginTop: 100,
  },
  button: {
    marginTop: 30,
    marginRight: 10,
    marginBottom: 20,
  },
  buttonAllign: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#335477",
  },
  container: {
    marginTop: 10,
  },
  typography: {
    fontSize: 20,
  },
  signUpBtn: {
    fontSize: "0.875rem",
  },
});
