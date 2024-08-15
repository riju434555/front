import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Stack, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Optional: For UTC handling
import localizedFormat from "dayjs/plugin/localizedFormat";

import axios from "axios";

// Styled component for the dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Main component for the timeline form
export default function AddTimeLineForm({ projectId, timelingFetch }) {
  // State hooks for dialog open/close and form data
  const [open, setOpen] = React.useState(false);
  const [SEQNumber, setSEQNumber] = React.useState("");
  const [customerReview, setCustomerReview] = React.useState(null);
  const [testing, setTesting] = React.useState(null);
  const [goLive, setgoLive] = React.useState(null);
  const [Development, setDevelopment] = React.useState(null);

  // Retrieve token from session storage
  const token2 = JSON.parse(sessionStorage.getItem("token2"));

  // Extend dayjs with UTC and localized formats
  dayjs.extend(localizedFormat);
  dayjs.extend(utc);

  // Request headers for API calls
  const headers = {
    Authorization: `Bearer ${token2}`, // Assuming Bearer token authentication
    "Content-Type": "application/json", // Assuming the content type is JSON
  };

  // Open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Submit handler for the form
  const submitTimelineHandeler = () => {
    const value = {
      SEQNumber,
      ProjectID: projectId,
      Development,
      Testing: testing,
      CustomerReview: customerReview,
      GoLive: goLive,
    };

    // Post data to the server
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/timeline/createTimeline`,
        value,
        {
          headers: headers,
        }
      )
      .then(() => {
        handleClose();
        timelingFetch(); // Fetch new timeline data
      })
      .catch((error) => {
        console.error("Error submitting timeline:", error);
      });
  };

  // Handler for date/time changes
  const handleDateChange = (newValue, setMethod) => {
    if (setMethod === "Development") setDevelopment(newValue);
    if (setMethod === "testing") setTesting(newValue);
    if (setMethod === "goLive") setgoLive(newValue);
    if (setMethod === "customerReview") setCustomerReview(newValue);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ float: "right" }}
      >
        New Timeline
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Timeline
        </DialogTitle>

        <DialogContent dividers>
          <Stack sx={{ gap: "1rem", padding: "1rem" }}>
            {/* Input field for sequence number */}
            <TextField
              label="seq No"
              variant="standard"
              value={SEQNumber}
              onChange={(e) => setSEQNumber(e.target.value)}
            />

            {/* DateTime pickers for various timeline stages */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Development"
                  onChange={(e) => handleDateChange(e, "Development")}
                  format="DD-MM-YYYY-hh-mm-a"
                />
              </DemoContainer>

              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Testing"
                  onChange={(e) => handleDateChange(e, "testing")}
                  format="DD-MM-YYYY-hh-mm-a"
                />
              </DemoContainer>

              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Go Live"
                  onChange={(e) => handleDateChange(e, "goLive")}
                  format="DD-MM-YYYY-hh-mm-a"
                />
              </DemoContainer>

              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Customer Review"
                  onChange={(e) => handleDateChange(e, "customerReview")}
                  format="DD-MM-YYYY-hh-mm-a"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
        </DialogContent>

        <DialogActions>
          {/* Cancel and Add buttons */}
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            autoFocus
            onClick={submitTimelineHandeler}
          >
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

//======================================================

// import * as React from "react";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
// import { Stack, TextField } from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc"; // Optional: For UTC handling
// import localizedFormat from "dayjs/plugin/localizedFormat";

// import { values } from "lodash";
// import axios from "axios";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// export default function AddTimeLineForm({ projectId, timelingFetch }) {
//   const [open, setOpen] = React.useState(false);
//   const [SEQNumber, setSEQNumber] = React.useState("");
//   const [customerReview, setCustomerReview] = React.useState(null);
//   const [testing, setTesting] = React.useState(null);
//   const [goLive, setgoLive] = React.useState(null);
//   const [Development, setDevelopment] = React.useState(null);

//   const token2 = JSON.parse(sessionStorage.getItem("token2"));
//   dayjs.extend(localizedFormat);
//   dayjs.extend(utc);

//   const headers = {
//     Authorization: `Bearer ${token2}`, // Assuming Bearer token authentication
//     "Content-Type": "application/json", // Assuming the content type is JSON
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const submitTimelineHandeler = () => {
//     const value = {
//       SEQNumber,
//       ProjectID: projectId,
//       Development,
//       Testing: testing,
//       CustomerReview: customerReview,
//       GoLive: goLive,
//     };
//     const res = axios.post(
//       `http://localhost:8080/v1/timeline/createTimeline`,
//       value,
//       {
//         headers: headers,
//       }
//     );

//     handleClose();
//     timelingFetch();
//   };

//   // date change handeler ===========================================
//   const handleDateChange = (newValue, setMethod) => {
//     // Convert the selected date/time to a more readable format
//     // const formattedValue = dayjs(newValue).format("DD-MM-YYYY HH:mm:ss A");
//     setMethod == "Development" && setDevelopment(newValue);
//     setMethod == "testing" && setTesting(newValue);
//     setMethod == "goLive" && setgoLive(newValue);
//     setMethod == "customerReview" && setCustomerReview(newValue);
//   };

//   return (
//     <React.Fragment>
//       <Button
//         variant="contained"
//         onClick={handleClickOpen}
//         sx={{ float: "right" }}
//       >
//         New Timeline
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Add New Timeline
//         </DialogTitle>

//         <DialogContent dividers>
//           <Stack sx={{ gap: "1rem", padding: "1rem" }}>
//             <TextField
//               label="seq No"
//               variant="standard"
//               value={SEQNumber}
//               onChange={(e) => setSEQNumber(e.target.value)}
//             />
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["DateTimePicker"]}>
//                 <DateTimePicker
//                   label="Development"
//                   // value={Development}
//                   onChange={(e) => handleDateChange(e, "Development")}
//                   format="DD-MM-YYYY-hh-mm-a"
//                 />{" "}
//               </DemoContainer>

//               <DemoContainer components={["DateTimePicker"]}>
//                 <DateTimePicker
//                   label="Testing"
//                   // value={testing}
//                   onChange={(e) => handleDateChange(e, "testing")}
//                   format="DD-MM-YYYY-hh-mm-a"
//                 />{" "}
//               </DemoContainer>

//               <DemoContainer components={["DateTimePicker"]}>
//                 <DateTimePicker
//                   label="go live"
//                   format="DD-MM-YYYY-hh-mm-a"
//                   // value={goLive}
//                   onChange={(e) => handleDateChange(e, "goLive")}
//                 />{" "}
//               </DemoContainer>

//               <DemoContainer components={["DateTimePicker"]}>
//                 <DateTimePicker
//                   label="Customer Review"
//                   // value={customerReview}
//                   onChange={(e) => handleDateChange(e, "customerReview")}
//                   format="DD-MM-YYYY-hh-mm-a"
//                 />
//               </DemoContainer>
//             </LocalizationProvider>
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             autoFocus
//             onClick={submitTimelineHandeler}
//           >
//             Add
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </React.Fragment>
//   );
// }

// ============================================================================================
