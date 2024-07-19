import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbar(prop) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    prop.setOpen(false);
  };

  return (
    <Snackbar
      open={prop.open}
      autoHideDuration={(prop.time ? prop.time : 3) * 1000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={prop.severity ? prop.severity : "success"}
        variant={prop.variant ? prop.variant : "filled"}
        sx={{ width: "100%" }}
      >
        {prop.text}
      </Alert>
    </Snackbar>
  );
}
