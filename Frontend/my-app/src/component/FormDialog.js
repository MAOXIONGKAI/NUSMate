import React from "react";
import dayjs from "dayjs";
import CreateActivity from "../data/Activity/CreateActivity";
import { Box, FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function FormDialog(prop) {
  const { open, setOpen } = prop;

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = React.useState({
    hostID: prop.profile._id,
    hostName: prop.profile.username,
    activityName: "",
    pax: "",
    startDate: null,
    endDate: null,
    location: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const input = document.querySelector(`[name="${name}"]`);
    input.setCustomValidity("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (formData) => {
    const fieldsToValidate = [
      "activityName",
      "pax",
      "startDate",
      "endDate",
      "location",
      "description",
    ];

    let isValid = true;

    if (
      formData.startDate &&
      formData.endDate &&
      (dayjs(formData.startDate).isAfter(dayjs(formData.endDate)) ||
        dayjs(formData.endDate).isBefore(dayjs()))
    ) {
      isValid = false;
    }

    fieldsToValidate.forEach((field) => {
      const input = document.querySelector(`[name="${field}"]`);
      const value =
        field === "startDate" || field === "endDate"
          ? formData[field]
          : formData[field]?.trim();

      if (input && !value) {
        input.setCustomValidity("Please fill up this field");
        input.reportValidity();
        isValid = false;
      } else if (input) {
        input.setCustomValidity("");
        input.reportValidity();
      }
    });

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm(formData);
    if (isValid) {
      if (CreateActivity(formData)) {
        prop.setOpenSuccess(true);
        handleClose();
      } else {
        prop.setOpenFail(true);
      }
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
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
                value={formData.startDate}
                onChange={(date) => {
                  setFormData((prev) => ({ ...prev, startDate: date }));
                }}
                slotProps={{
                  textField: { size: "small", required: true, fullWidth: true },
                }}
                sx={{ flex: 1 }}
              />
            </LocalizationProvider>
            <Divider
              flexItem
              sx={{ mx: 1, justifyContent: "center", alignItems: "center" }}
            >
              -
            </Divider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date"
                name="endDate"
                value={formData.endDate}
                onChange={(date) => {
                  setFormData((prev) => ({ ...prev, endDate: date }));
                }}
                slotProps={{
                  textField: { size: "small", required: true, fullWidth: true },
                }}
                sx={{ flex: 1 }}
              />
            </LocalizationProvider>
          </Box>
          {formData.startDate && formData.endDate ? (
            dayjs(formData.startDate).isAfter(dayjs(formData.endDate)) ? (
              <FormHelperText
                sx={{ margin: "none", marginRight: "auto", color: "red" }}
              >
                Start Date should not be behind End Date
              </FormHelperText>
            ) : dayjs(formData.endDate).isBefore(dayjs()) ? (
              <FormHelperText
                sx={{ margin: "none", marginRight: "auto", color: "red" }}
              >
                End Date should not be in the past
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ margin: "none", marginRight: "auto" }}>
                Specify the start and end date of the activity
              </FormHelperText>
            )
          ) : (
            <FormHelperText sx={{ margin: "none", marginRight: "auto" }}>
              Specify the start and end date of the activity
            </FormHelperText>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              required
              margin="none"
              name="activityName"
              label="Activity Name"
              value={formData.activityName}
              onChange={handleChange}
              type="text"
              variant="standard"
              sx={{ flex: 2 }}
              inputProps={{ maxLength: 60 }}
            />
            <TextField
              required
              margin="none"
              size="small"
              name="pax"
              label="Number of Participants"
              value={formData.pax}
              onChange={handleChange}
              type="number"
              sx={{ flex: 1 }}
              inputProps={{ min: 1, max: 999 }}
            />
          </Box>
          <TextField
            required
            margin="dense"
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="standard"
            sx={{ marginTop: "20px" }}
            inputProps={{ maxLength: 140 }}
          />
          <TextField
            required
            margin="dense"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            type="text"
            multiline
            maxRows={2}
            fullWidth
            variant="standard"
            sx={{ marginTop: "20px" }}
            inputProps={{ maxLength: 300 }}
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
