import { Typography } from '@mui/material';
import React from 'react';

export default function ActivityRequestCard(prop) {
    const {participantName, activityName} = prop;
    return (<Typography>{participantName} requests to join {activityName}</Typography>);
}