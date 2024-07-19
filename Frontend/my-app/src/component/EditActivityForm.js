import React from "react";
import dayjs from "dayjs";
import EditActivity from "../data/Activity/EditActivity";
import { Box, FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function FormDialog(prop) {
  const {
    open,
    setOpen,
    handleRefresh,
    activity,
    setOpenEditSuccess,
    setOpenEditFail,
    setHasModified,
    currentPax,
  } = prop;
  let {
    _id,
    hostID,
    hostName,
    activityName,
    pax,
    startDate,
    endDate,
    location,
    description,
  } = activity;

  const handleClose = () => {
    setOpen(false);
    handleRefresh();
  };

  const [formData, setFormData] = React.useState({
    hostID: hostID,
    hostName: hostName,
    activityName: activityName,
    pax: pax,
    startDate: dayjs(startDate),
    endDate: dayjs(endDate),
    location: location,
    description: description,
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

    if (formData.pax < currentPax) {
      isValid = false;
    }

    fieldsToValidate.forEach((field) => {
      const input = document.querySelector(`[name="${field}"]`);
      const value =
        field === "startDate" || field === "endDate" || field === "pax"
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
      if (EditActivity(_id, formData)) {
        setOpenEditSuccess(true);
        handleClose();
        setHasModified((prev) => !prev);
      } else {
        setOpenEditFail(true);
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
          Edit - {activityName}
        </DialogTitle>
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
              sx={{ flex: 3 }}
              inputProps={{ maxLength: 60 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                flex: 2,
              }}
            >
              <TextField
                required
                margin="none"
                size="small"
                name="pax"
                label="Number of Participants"
                value={formData.pax}
                onChange={handleChange}
                type="number"
                inputProps={{ min: 1, max: 999 }}
              />
              {formData.pax && formData.pax < currentPax && (
                <FormHelperText
                  sx={{ margin: "none", marginLeft: "auto", color: "red" }}
                >
                  New limit must be at least the number of people who joined the
                  activity now
                </FormHelperText>
              )}
            </Box>
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
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
