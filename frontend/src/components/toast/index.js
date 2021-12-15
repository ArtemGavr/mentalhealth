import { toast } from "react-toastify";
import { Info, Check, Warning, Error, BugReport } from "@material-ui/icons";
import { PropTypes } from "prop-types";

export const displayIcon = type => {
  switch (type) {
    case "success":
      return <Check />;
    case "info":
      return <Info />;
    case "error":
      return <Error />;
    case "warning":
      return <Warning />;
    default:
      return <BugReport />;
  }
};

const ToastMessage = ({ type, message }) =>
  toast[type](
    <div style={{ display: "flex", color: "black" }}>
      <div
        style={{
          fontSize: 15,
          paddingTop: 8,
          flexShrink: 0,
          textAlign: "center",
          width: "30px",
        }}
      >
      </div>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>{message}</div>
    </div>
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
