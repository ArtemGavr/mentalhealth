import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    navlinks: {
        marginLeft: '10px',
        display: "flex",
    },
    logo: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        flexGrow: "1",
        cursor: "default",
    },
    link: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: "20px",
        "&:hover": {
            color: 'pink',
            textDecoration: "none",
            cursor: 'pointer',
        },
    },
    appbar: {
        backgroundColor: "#5da1a1"
    }
});