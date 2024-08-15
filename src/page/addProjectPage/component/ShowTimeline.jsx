import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import utc plugin
import timezone from "dayjs/plugin/timezone";

// function for showing date time ============

export default function ShowTimeline({ projectId, updateTimeline }) {
  const [timeline, setTimeline] = React.useState([]);
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const dateTimeFn = (dateTime) => {
    // Convert UTC timestamp to Date object
    const date = new Date(dateTime);

    // Adjust for UTC+5:30 timezone (India Standard Time)
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    // Format the date
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Construct formatted date string
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
    return formattedDate;
  };

  const token2 = JSON.parse(sessionStorage.getItem("token2"));

  const headers = {
    Authorization: `Bearer ${token2}`, // Assuming Bearer token authentication
    "Content-Type": "application/json", // Assuming the content type is JSON
  };

  // for fetching ti;meline ===============================
  React.useEffect(() => {
    const fetchTimeline = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/timeline/${projectId}`,
        {
          headers: headers,
        }
      );
      setTimeline(res.data);
    };
    fetchTimeline();
  }, [updateTimeline]);
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#e0f2f1",
        borderRadius: "20px",
        margin: "1rem",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#00695c" }}>
            <TableCell sx={{ color: "#fff" }}> Seq No:</TableCell>
            <TableCell align="right" sx={{ color: "#fff" }}>
              Development
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff" }}>
              Testing
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff" }}>
              Live
            </TableCell>
            <TableCell align="right" sx={{ color: "#fff" }}>
              Customer review
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeline.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.SEQNumber}
              </TableCell>
              <TableCell align="right">{dateTimeFn(row.Development)}</TableCell>
              <TableCell align="right">{dateTimeFn(row.Testing)}</TableCell>
              <TableCell align="right">{dateTimeFn(row.GoLive)}</TableCell>
              <TableCell align="right">
                {dateTimeFn(row.CustomerReview)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
