import React from "react";
import Card from "@mui/material/Card";
import { Table, TableRow, TableCell } from "@mui/material/";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ColorNameAvatar from "./ColorNameAvatar";
import { Tooltip } from "@mui/material";

export default function UserCard(prop) {
  const {
    username,
    first_major,
    second_major,
    education_status,
    interests,
    description,
  } = prop.profile;

  return (
    <Card
      sx={{
        ...prop.sx,
        borderRadius: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: "340px"
      }}
    >
      <CardHeader
        avatar={
          <ColorNameAvatar
            username={username}
            sx={{ width: "48px", height: "48px", fontSize: "18px" }}
          />
        }
        sx={{
          textAlign: "center",
          backgroundColor: "#DFF1FF",
          "& .MuiCardHeader-subheader": {
            fontSize: "14px",
          },
        }}
        title={`${username} (${
          education_status === "Undergraduate"
            ? "BA"
            : education_status === "Master"
            ? "MA"
            : education_status === "Doctorate"
            ? "PhD"
            : "Alum"
        })`}
        subheader={`${first_major} ${second_major ? `/ ${second_major}` : ""}`}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "16px" }}
        >
          {description
            ? description
            : "This user is lazy, doesn't really leave anything over here..."}
        </Typography>
        {interests.length > 0 && (
          <Table>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Interest:</TableCell>
              <TableCell>
                <ul
                  style={{
                    listStyleType: "disc",
                    margin: 0,
                    paddingInlineStart: "20px",
                  }}
                >
                  {interests.map((interest, index) => (
                    <li key={index} style={{ fontWeight: "lighter" }}>
                      {interest}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          </Table>
        )}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ marginTop: "auto", backgroundColor: "#EFF9FF" }}
      >
        <Tooltip title="Add to favorites">
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={`Message ${username}`}>
          <IconButton>
            <MailOutlineIcon aria-label="Message user" />
          </IconButton>
        </Tooltip>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
