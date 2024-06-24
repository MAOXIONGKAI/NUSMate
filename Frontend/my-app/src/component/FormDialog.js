import React from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function FormDialog(prop) {
  const { open, setOpen, fields } = prop;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
        sx={{
          textAlign: "center",
        }}
      >
        <DialogTitle>{prop.title}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "75%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogContentText>{prop.content}</DialogContentText>
          {fields.map((field) => (
            <TextField
              required
              margin="dense"
              id={field.id}
              name={field.name}
              label={field.label}
              type={field.type}
              fullWidth
              variant="standard"
            />
          ))}
          <Box sx={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker />
            </LocalizationProvider>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
