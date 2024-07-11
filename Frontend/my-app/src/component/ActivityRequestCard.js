import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ColorNameAvatar from './ColorNameAvatar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';



export default function ActivityRequestCard(prop) {

    const {participantName, activityName} = prop;

  return (
    <Card sx={{ width: "90vw", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
      <Box>
        <ColorNameAvatar username={participantName} sx={{size: "14px", fontSize: "12px"}}/>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {activityName}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CheckCircleOutlineIcon />
        </IconButton>
        <IconButton aria-label="share">
          <CancelOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}