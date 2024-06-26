import React from "react";
import { Box, FormHelperText } from "@mui/material";
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
  const { open, setOpen } = prop;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
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
        <DialogTitle
          sx={{
            background:
              "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
            color: "white",
            marginBottom: "20px",
          }}
        >
          {prop.title}
        </DialogTitle>
        <DialogContentText>{prop.content}</DialogContentText>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <TextField
              required
              margin="0px"
              name="activity-name"
              label="Activity Name"
              type="text"
              variant="standard"
            />
            <TextField
              required
              margin="0px"
              size="small"
              name="pax"
              label="Number of Participants"
              type="number"
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                name="startDate"
                slotProps={{
                  textField: { size: "small", required: true },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date"
                name="endDate"
                slotProps={{ textField: { size: "small", required: true } }}
              />
            </LocalizationProvider>
          </Box>
          <FormHelperText sx={{ marginRight: "auto" }}>
            Activity Duration
          </FormHelperText>
          <TextField
            required
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions
          sx={{
            background:
              "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: "white",
              "&:hover": { background: "rgba(50,50,50, 0.1)" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              color: "white",
              "&:hover": { background: "rgba(50,50,50, 0.1)" },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
