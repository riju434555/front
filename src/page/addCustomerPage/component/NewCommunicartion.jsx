// =========================================================

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";

// NewCommunication component definition
const NewCommunication = ({
  company,
  projects,
  fetchProject,
  customerId,
  projectId,
  fetchCustomer,
  setCommunicationReloadFn,
}) => {
  // State variables for managing dialog open state, scroll type, and form values
  const [open, setOpen] = React.useState(false); // Controls whether the dialog is open
  const [scroll, setScroll] = React.useState("paper"); // Scroll type for dialog content
  const [designations, setDesignations] = React.useState([]); // List of designations (if needed)
  const [designation, setDesignation] = React.useState(""); // Current selected designation
  const [NextFollowUpDateTime, setNextFollowUpDateTime] = React.useState(null); // DateTime picker state

  // Get user ID from session storage
  const userId = JSON.parse(sessionStorage.getItem("UserID"));

  // Handler for opening the dialog
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  // Handler for closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Reference for the dialog description element to focus it when dialog opens
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    ChatType: Yup.string().required("Chat Type is required"),
    ChatDirection: Yup.string().required("Chat Direction is required"),
    CurrentStatus: Yup.string().required("Current Status is required"),
    ChatMessage: Yup.string().required("Message is required"),
  });

  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      ChatMessage: "",
      ChatType: "",
      ChatDirection: "",
      CurrentStatus: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Make an API call to submit the form data
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/v1/message/create`,
          {
            ...values,
            CustomerProfileID: projectId, // Pass project ID and other relevant data
            UserCredentialID: userId,
            CustomerProfileID: customerId,
            NextFollowUpDateTime,
            ProjectProfileID: projectId,
          }
        );
        console.log(res.data);
        if (res.data.status === 1) {
          // Update UI or fetch new data if the submission is successful
          setCommunicationReloadFn(Date.now());
        }
        handleClose();
      } catch (error) {
        console.error("Error adding communication:", error);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
  } = formik;

  return (
    <>
      {/* Button to open the dialog */}
      <Button
        variant="contained"
        color="info"
        onClick={handleClickOpen("paper")}
        sx={{ borderRadius: "20px" }}
      >
        <AddIcon />
        New Communication
      </Button>

      {/* Dialog component for adding a new communication */}
      <Dialog
        open={open}
        size="small"
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="scroll-dialog-title">
          Add a new communication
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Chat Type selection */}
              <FormControl fullWidth>
                <InputLabel id="chat-type-label">Chat Type</InputLabel>
                <Select
                  labelId="chat-type-label"
                  label="Chat Type"
                  id="chat-type-select"
                  value={values.ChatType}
                  name="ChatType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.ChatType && Boolean(errors.ChatType)}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="file">File</MenuItem>
                </Select>
                {touched.ChatType && errors.ChatType && (
                  <Box sx={{ color: "red", fontSize: 12 }}>
                    {errors.ChatType}
                  </Box>
                )}
              </FormControl>

              {/* Chat Direction selection */}
              <FormControl fullWidth>
                <InputLabel id="chat-direction-label">
                  Chat Direction
                </InputLabel>
                <Select
                  labelId="chat-direction-label"
                  label="Chat Direction"
                  id="chat-direction-select"
                  value={values.ChatDirection}
                  name="ChatDirection"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.ChatDirection && Boolean(errors.ChatDirection)}
                >
                  <MenuItem value="inbound">Inbound</MenuItem>
                  <MenuItem value="outbound">Outbound</MenuItem>
                </Select>
                {touched.ChatDirection && errors.ChatDirection && (
                  <Box sx={{ color: "red", fontSize: 12 }}>
                    {errors.ChatDirection}
                  </Box>
                )}
              </FormControl>

              {/* Current Status selection */}
              <FormControl fullWidth>
                <InputLabel id="current-status-label">
                  Current Status
                </InputLabel>
                <Select
                  labelId="current-status-label"
                  id="current-status-select"
                  label="Current Status"
                  value={values.CurrentStatus}
                  name="CurrentStatus"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.CurrentStatus && Boolean(errors.CurrentStatus)}
                >
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="Interested">Interested</MenuItem>
                  <MenuItem value="NotInterested">Not Interested</MenuItem>
                  <MenuItem value="FuturePlan">Future Plan</MenuItem>
                </Select>
                {touched.CurrentStatus && errors.CurrentStatus && (
                  <Box sx={{ color: "red", fontSize: 12 }}>
                    {errors.CurrentStatus}
                  </Box>
                )}
              </FormControl>

              {/* DateTimePicker for Next Follow-Up Date */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Next Follow-Up Date"
                  value={NextFollowUpDateTime}
                  format="DD-MM-YYYY hh:mm A"
                  renderInput={(props) => <TextField {...props} />}
                  onChange={(e) => setNextFollowUpDateTime(e)}
                />
              </LocalizationProvider>
              <p>{errors.NextFollowUpDateTime}</p>

              {/* Chat Message input field */}
              <TextField
                variant="standard"
                label="Chat Message"
                size="small"
                multiline
                rows={5}
                fullWidth
                name="ChatMessage"
                value={values.ChatMessage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.ChatMessage && Boolean(errors.ChatMessage)}
                helperText={touched.ChatMessage && errors.ChatMessage}
              />

              {/* Dialog action buttons */}
              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  color="info"
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  autoFocus
                  disabled={!isValid}
                >
                  Add
                </Button>
              </DialogActions>
            </DialogContentText>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default NewCommunication;

//======================================================================

// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import AddIcon from "@mui/icons-material/Add";
// import { Stack, TextField } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import * as Yup from "yup";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import moment from "moment";

// const NewCommunication = ({
//   company,
//   projects,
//   fetchProject,
//   customerId,
//   projectId,
//   fetchCustomer,
//   setCommunicationReloadFn,
// }) => {
//   const [open, setOpen] = React.useState(false);
//   const [scroll, setScroll] = React.useState("paper");
//   const [designations, setDesignations] = React.useState([]);
//   const [designation, setDesignation] = React.useState("");
//   const [NextFollowUpDateTime, setNextFollowUpDateTime] = React.useState(null);

//   const userId = JSON.parse(sessionStorage.getItem("UserID"));

//   // for material ui dialog
//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   // console.log(fetchCommunication);

//   const descriptionElementRef = React.useRef(null);
//   React.useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   // for formik
//   const validationSchema = Yup.object().shape({
//     ChatType: Yup.string().required("Chat Type is required"),
//     ChatDirection: Yup.string().required("Chat Direction is required"),
//     CurrentStatus: Yup.string().required("Current Status is required"),
//     ChatMessage: Yup.string().required("Message is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       ChatMessage: "",
//       ChatType: "",
//       ChatDirection: "",
//       CurrentStatus: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const res = await axios.post(
//           "http://localhost:8080/v1/message/create",
//           {
//             ...values,
//             CustomerProfileID: projectId,
//             UserCredentialID: userId,
//             CustomerProfileID: customerId,
//             NextFollowUpDateTime,
//             ProjectProfileID: projectId,
//           }
//         );
//         console.log(res.data);
//         if (res.data.status == 1) {
//           console.log("fetchProject");
//           // fetchProject();
//           // fetchCustomer();
//           setCommunicationReloadFn(Date.now());
//         }

//         handleClose();
//       } catch (error) {
//         console.error("Error adding communication:", error);
//       }
//       // fetchCommunication();
//       // fetchProject();
//     },
//   });

//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     isValid,
//   } = formik;
//   // console.log(errors);
//   return (
//     <>
//       <Button
//         variant="contained"
//         color="info"
//         onClick={handleClickOpen("paper")}
//         sx={{ borderRadius: "20px" }}
//       >
//         <AddIcon />
//         New Communication
//       </Button>

//       <Dialog
//         open={open}
//         size="small"
//         onClose={handleClose}
//         scroll={scroll}
//         aria-labelledby="scroll-dialog-title"
//         aria-describedby="scroll-dialog-description"
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle id="scroll-dialog-title">
//           Add a new communication
//         </DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent dividers={scroll === "paper"}>
//             <DialogContentText
//               id="scroll-dialog-description"
//               ref={descriptionElementRef}
//               tabIndex={-1}
//               sx={{
//                 padding: "1rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "1rem",
//               }}
//             >
//               {/* // chatType =================================================== */}
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">Chat Type</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   label="Chat Type"
//                   id="demo-simple-select"
//                   value={values.ChatType} // Assuming values.chatType is from your form state
//                   name="ChatType" // Name should match the state key you're updating
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.ChatType && Boolean(errors.ChatType)}
//                 >
//                   <MenuItem value="text">Text</MenuItem>
//                   <MenuItem value="image">Image</MenuItem>
//                   <MenuItem value="file">File</MenuItem>
//                 </Select>
//                 {touched.chatType && errors.chatType && (
//                   <Box sx={{ color: "red", fontSize: 12 }}>
//                     {errors.chatType}
//                   </Box>
//                 )}
//               </FormControl>

//               {/* chat direction ========================================== */}
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">
//                   ChatDirection
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   label="ChatDirection"
//                   id="demo-simple-select"
//                   value={values.ChatDirection} // Assuming values.chatType is from your form state
//                   name="ChatDirection" // Name should match the state key you're updating
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.ChatDirection && Boolean(errors.ChatDirection)}
//                 >
//                   <MenuItem value="inbound">inbound</MenuItem>
//                   <MenuItem value="outbound">outbound</MenuItem>
//                 </Select>
//                 {touched.ChatDirection && errors.ChatDirection && (
//                   <Box sx={{ color: "red", fontSize: 12 }}>
//                     {errors.ChatDirection}
//                   </Box>
//                 )}
//               </FormControl>

//               {/* CurrentStatus ========================================= */}
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">
//                   currentStatus
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   label="currentStatus"
//                   value={values.CurrentStatus} // Assuming values.chatType is from your form state
//                   name="CurrentStatus" // Name should match the state key you're updating
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.CurrentStatus && Boolean(errors.CurrentStatus)}
//                 >
//                   <MenuItem value="Positive">Positive</MenuItem>
//                   <MenuItem value="Interested">Interested</MenuItem>
//                   <MenuItem value="NotInterested">Not Interested</MenuItem>

//                   <MenuItem value="FuturePlan">FuturePlan</MenuItem>
//                 </Select>
//                 {touched.CurrentStatus && errors.CurrentStatus && (
//                   <Box sx={{ color: "red", fontSize: 12 }}>
//                     {errors.CurrentStatus}
//                   </Box>
//                 )}
//               </FormControl>

//               {/* next followup ============================================== */}

//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateTimePicker
//                   label="NextFollowUpDateTime"
//                   value={NextFollowUpDateTime}
//                   format="DD-MM-YYYY-hh-mm-A"
//                   renderInput={(props) => <TextField {...props} />} // Ensure you have TextField imported
//                   onChange={(e) => setNextFollowUpDateTime(e)}
//                 />
//               </LocalizationProvider>
//               <p>{errors.nextFollowUpDateTime}</p>

//               <TextField
//                 variant="standard"
//                 label="Chat Message"
//                 size="small"
//                 multiline
//                 rows={5}
//                 fullWidth
//                 name="ChatMessage"
//                 value={values.ChatMessage}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.ChatMessage && Boolean(errors.ChatMessage)}
//                 helperText={touched.ChatMessage && errors.ChatMessage}
//               />
//               <Button
//                 onClick={handleClose}
//                 variant="outlined"
//                 color="info"
//                 size="small"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="success"
//                 autoFocus
//                 disabled={!isValid}
//               >
//                 ADD
//               </Button>
//             </DialogContentText>
//           </DialogContent>
//         </form>
//       </Dialog>
//     </>
//   );
// };

// export default NewCommunication;
