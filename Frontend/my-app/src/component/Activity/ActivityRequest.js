import React from "react";
import dayjs from "dayjs";
import {
  TableRow,
  TableCell,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import UserButton from "./UserButton";
import CalculateTimesAgo from "../../data/CalculateTimesAgo";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import GetAllJoinedParticipants from "../../data/Participant/GetAllJoinedParticipants";

export default function ActivityRequest(prop) {
  const {
    request,
    triggerNotification,
    handleOpenActivityDetail,
    handleApproveActivityRequest,
    handleAcceptActivityInvitation,
    handleDeclineActivityRequest,
    handleRejectActivityInvitation,
  } = prop;
  const [participants, setParticipants] = React.useState([]);
  React.useEffect(() => {
    const checkIfFull = async () => {
      const participants = await GetAllJoinedParticipants(request.activityID);
      setParticipants(participants);
    };
    checkIfFull();
  }, [triggerNotification]);

  return (
    <TableRow key={request._id + prop.profile._id}>
      {<UserButton
        request={request}
        userID={prop.profile._id}
        triggerNotification={triggerNotification}
      />}
      <TableCell sx={{ textAlign: "center" }}>
        <Typography>
          <Typography
            sx={{
              display: "inline",
              color: "gray",
              fontSize: "16px",
            }}
          >
            {request.status === "Pending"
              ? "requested to join"
              : request.status === "Invited"
              ? "has invited you to join"
              : ""}
          </Typography>{" "}
          <Button
            onClick={() =>
              handleOpenActivityDetail(
                prop.profile,
                request.activityID,
                request.hostID,
                request.hostName,
                request.activityName,
                request.pax,
                dayjs(request.startDate).format("ddd, MMM D, YYYY h:mm A"),
                dayjs(request.endDate).format("ddd, MMM D, YYYY h:mm A"),
                request.activityLocation,
                request.activityDescription
              )
            }
          >
            {request.activityName}
          </Button>
        </Typography>
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            color: "gray",
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          {CalculateTimesAgo(request.updatedAt)}
        </Typography>
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Tooltip
          title={
            request.hostID === prop.profile._id
              ? `Approve join request from ${request.username}`
              : `Accept Invitation from ${request.username}`
          }
        >
          <IconButton
            sx={{ color: "#32CD32" }}
            disabled={request.pax <= participants?.length + 1}
            onClick={
              request.hostID === prop.profile._id
                ? () => {
                    handleApproveActivityRequest(request._id);
                  }
                : () => {
                    handleAcceptActivityInvitation(request._id);
                  }
            }
          >
            <CheckCircleOutline />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            request.hostID === prop.profile._id
              ? `Decline join request from ${request.username}`
              : `Reject invitation from ${request.username}`
          }
        >
          <IconButton
            sx={{ color: "red" }}
            onClick={
              request.hostID === prop.profile._id
                ? () => {
                    handleDeclineActivityRequest(request._id);
                  }
                : () => {
                    handleRejectActivityInvitation(request._id);
                  }
            }
          >
            <CancelOutlined />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
