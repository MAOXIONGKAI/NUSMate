import React from 'react'
import { Typography } from '@mui/material';
import Link from "@mui/material/Link";

export default function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color= {props.color ? props.color : "text.secondary" }
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/MAOXIONGKAI/NUSMate">
          Team XtraOrdinary Kaleidoscope
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }