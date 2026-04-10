import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const isError = useSelector((state) => state.notification.isError)

  if (!message) {
    return null;
  }

  const severity = isError ? "error" : "success"

  // const style = {
  //   color: isError ? "red" : "green",
  //   background: "lightgrey",
  //   fontSize: 20,
  //   borderStyle: "solid",
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // };

  return <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={severity} >{message}</Alert>;
};

export default Notification;
