import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ToggleMenu from "../component/ToggleMenu";
import NoActivityPage from "../image/NoActivityPage.jpg";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../component/FormDialog";
import CustomizedSnackbar from "../component/CustomizedSnackbar";

export default function Activity(prop) {
  const groupOptions = [
    { value: "All Activities" },
    { value: "My Activities" },
  ];
  const [currentGroup, setCurrentGroup] = React.useState("All Activities");
  const [currentResult, setCurrentResult] = React.useState([]);
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        margin: "30px 0px",
        position: "relative",
      }}
    >
      <CustomizedSnackbar
        text="Successfully added new activity"
        open={openSuccess}
        setOpen={setOpenSuccess}
      />
      <CustomizedSnackbar
        text="Added new activity failed: Unknown Server Error"
        open={openFail}
        setOpen={setOpenFail}
      />
      <FormDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        setOpenSuccess={setOpenSuccess}
        setOpenFail={setOpenFail}
        profile={prop.profile}
        title="Create New Activity"
        content="Fill up information about your proposed event for others to join!"
      />
      <Tooltip title="Add new activity">
        <IconButton
          onClick={() => {
            setOpenCreateDialog(true);
          }}
          sx={{
            position: "fixed",
            left: "90%",
            top: "80%",
            background:
              "linear-gradient(90deg, rgba(83,207,255,1) 0%, rgba(100,85,240,1) 100%)",
            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(83,207,255,0.8) 0%, rgba(100,85,240,0.8) 100%)",
            },
          }}
        >
          <AddIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <ToggleMenu
        size="small"
        value={currentGroup}
        setValue={setCurrentGroup}
        options={groupOptions}
      />
      <Box>
        {currentResult.length === 0 ? (
          <Box sx={{ marginTop: "30px" }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                fontFamily: "Handlee, sans-serif",
                marginBottom: "20px",
              }}
            >
              No activity found at the moment...
              <br /> Perhaps you can try add your first one?
            </Typography>
            <img
              src={NoActivityPage}
              width="35%"
              style={{ borderRadius: "50%" }}
              alt="Background for blank Activity Page"
            />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
