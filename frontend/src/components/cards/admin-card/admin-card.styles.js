import { hexToRGBAlpha } from "../../../helpers/hex-to-rgb";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  paper: {
    padding: "20px 20px",
    maxWidth: 590,
    margin: "10px auto",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#e3f2c4"
  },
  container: {
    width: 400,
    height: 370,
  },
  typography: {
    marginTop: 30,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    boxShadow: `0 2px 2px 0 ${hexToRGBAlpha("#f44336", 0.14)}, 0 3px 1px -2px ${hexToRGBAlpha(
      "#f44336",
      0.2
    )}, 0 1px 5px 0 ${hexToRGBAlpha("#f44336", 0.12)}`,
    "&:hover,&:focus": {
      backgroundColor: "#f44336",
      boxShadow: `0 14px 26px -12px ${hexToRGBAlpha(
        "#f44336",
        0.42
      )}, 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px ${hexToRGBAlpha("#f44336", 0.2)}`,
    },
  },
  title: {
    height: 50,
  },
  loadContainer: {
    height: 500,
    width: 200,
    margin: "10px auto",
    display: "flex",
    alignItems: "center",
  },
  circle: {
    margin: "auto",
  },
});
