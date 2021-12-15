import { makeStyles } from "@material-ui/core";


export const useStyles = makeStyles({
    container: {
      padding: "30px 20px",
      maxWidth: 1200,
      margin: "auto",
    },
    language_content: {
        cursor: "pointer",
        marginLeft: "35px",
        fontSize: "18px",
        marginTop: 90,
      },
      language_header:{
        display: "inline-block",
        padding: "20px ",
        marginTop: 110,
      },
      logo_header:{
          font: "italic"
      },
      buttonLogin: {
        marginTop: 68,
        marginLeft: 230,
        backgroundColor: "#e3f2c4"
      },
      buttonRegister: {
        marginTop: 68,
        backgroundColor: "#88b1f2"
      },
  });
