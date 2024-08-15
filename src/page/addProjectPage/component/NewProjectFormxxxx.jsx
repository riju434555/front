// import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import AddIcon from "@mui/icons-material/Add";
// import { Box, Stack, TextField } from "@mui/material";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { yupResolver } from "@hookform/resolvers/yup";

// const NewProjectForm = ({ CustomerID, fetchCustomer }) => {
//   const [open, setOpen] = useState(false);
//   const [scroll, setScroll] = useState("paper");
//   const [inputValue, setInputValue] = React.useState({
//     BackEndStackID: [],
//     FrontEndStackID: [],
//     ProjectStatus: [],
//     projectType: [],
//     Developer: [],
//     ProjectManager: [],
//     ProductManager: [],
//     TechnicalManager: [],
//     TestManager: [],
//   });

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     // defaultValues: initialValues,
//   });

//   // Validation schema using Yup
//   const validationSchema = Yup.object().shape({
//     ProjectStatusID: Yup.number().required("Project Status ID is required"),
//     Developer1NameID: Yup.number().required("Developer 1 Name ID is required"),
//     ProductManagerID: Yup.number().required("Product Manager ID is required"),
//     ProjectManagerID: Yup.number().required("Project Manager ID is required"),
//     TechnicalManagerID: Yup.number().required(
//       "Technical Manager ID is required"
//     ),
//     DEVDBDetails: Yup.string().required("DEV DB Details are required"),
//     QADBDetails: Yup.string().required("QA DB Details are required"),
//     PRODDBDetails: Yup.string().required("PROD DB Details are required"),
//     ProjectName: Yup.string().required("Project Name is required"),
//     ProjectDetails: Yup.string().required("Project Details are required"),
//     ProjectTypeID: Yup.number().required("Project Type ID is required"),
//     ProjectSponsor: Yup.string().required("Project Sponsor is required"),
//   });

//   // Initial form values
//   // const initialValues = {
//   //   ProjectName: "",
//   //   ProjectDetails: "",
//   //   ProjectTypeID: "",
//   //   ProjectSponsor: "",
//   //   DEVDBDetails: "",
//   //   QADBDetails: "",
//   //   PRODDBDetails: "",
//   //   Developer1NameID: "",
//   //   ProductManagerID: 1,
//   //   ProjectManagerID: 1,
//   //   TechnicalManagerID: "",
//   //   TestManagerID: 1,
//   //   TechnologyStackDetails: "",
//   //   ServerName: "",
//   //   DEVURL: "",
//   //   QAURL: "",
//   //   PRODURL: "",
//   // };

//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const onSubmit = async (data) => {
//     const res = await axios.post(
//       "http://localhost:8080/v1/project/projectCreate",
//       { ...data, CustomerID }
//     );
//     fetchCustomer();
//     handleClose();
//   };
//   const fetchinputData = async (url, key) => {
//     const res = await axios.get(url);
//     setInputValue((prev) => ({ ...prev, [key]: res.data }));
//   };

//   useEffect(() => {
//     fetchinputData(
//       "http://localhost:8080/v1/project/PiBackEndTechController",
//       "BackEndStackID"
//     );
//     fetchinputData(
//       "http://localhost:8080/v1/project/projectType",
//       "projectType"
//     );

//     fetchinputData(
//       "http://localhost:8080/v1/project/PiFrontEndTechController",
//       "FrontEndStackID"
//     );
//     fetchinputData(
//       "http://localhost:8080/v1/project/projectStatus",
//       "ProjectStatus"
//     );

//     fetchinputData(
//       "http://localhost:8080/v1/allId/productManager/4",
//       "ProductManager"
//     );
//     fetchinputData(
//       "http://localhost:8080/v1/allId/productManager/5",
//       "Developer"
//     );
//     fetchinputData(
//       "http://localhost:8080/v1/allId/productManager/6",
//       "ProjectManager"
//     );
//     fetchinputData(
//       "http://localhost:8080/v1/allId/productManager/7",
//       "TechnicalManager"
//     );
//     fetchinputData(
//       "http://localhost:8080/v1/allId/productManager/8",
//       "TestManager"
//     );
//   }, []);
//   return (
//     <React.Fragment>
//       <Button
//         size="large"
//         variant="contained"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           borderRadius: "20px",
//           marginBottom: "1rem",
//         }}
//         color="info"
//         onClick={handleClickOpen("paper")}
//       >
//         <AddIcon /> New Project
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         scroll={scroll}
//         aria-labelledby="scroll-dialog-title"
//         aria-describedby="scroll-dialog-description"
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle id="scroll-dialog-title">
//           Add a new Project:
//         </DialogTitle>
//         <DialogContent dividers={scroll === "paper"}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <DialogContentText
//               id="scroll-dialog-description"
//               tabIndex={-1}
//               sx={{ padding: "1rem" }}
//             >
//               <Stack sx={{ gap: "1rem" }}>
//                 {/* ProjectName and ProjectDetails */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <TextField
//                     {...register("ProjectName")}
//                     variant="standard"
//                     label="Project Name"
//                     fullWidth
//                     error={!!errors.ProjectName}
//                     helperText={errors.ProjectName?.message}
//                   />
//                   <TextField
//                     {...register("ProjectDetails")}
//                     variant="standard"
//                     label="Project Details"
//                     fullWidth
//                     error={!!errors.ProjectDetails}
//                     helperText={errors.ProjectDetails?.message}
//                   />
//                 </Stack>

//                 {/* ProjectTypeID and ProjectSponsor */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="project-type-label">
//                       Project Type
//                     </InputLabel>
//                     <Select
//                       {...register("ProjectTypeID")}
//                       labelId="project-type-label"
//                       id="project-type-select"
//                       label="Project Type"
//                       fullWidth
//                       error={!!errors.ProjectTypeID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>
//                       {inputValue.projectType.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.ProjectTypeName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.ProjectTypeID && (
//                       <p>{errors.ProjectTypeID.message}</p>
//                     )}
//                   </FormControl>

//                   <TextField
//                     {...register("ProjectSponsor")}
//                     variant="standard"
//                     label="Project Sponsor"
//                     fullWidth
//                     error={!!errors.ProjectSponsor}
//                     helperText={errors.ProjectSponsor?.message}
//                   />
//                 </Stack>

//                 {/* DEVDBDetails and QADBDetails */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <TextField
//                     {...register("DEVDBDetails")}
//                     variant="standard"
//                     label="DevDb details"
//                     fullWidth
//                     error={!!errors.DEVDBDetails}
//                     helperText={errors.DEVDBDetails?.message}
//                   />

//                   <TextField
//                     {...register("QADBDetails")}
//                     variant="standard"
//                     label="QA db details"
//                     fullWidth
//                     error={!!errors.QADBDetails}
//                     helperText={errors.QADBDetails?.message}
//                   />
//                 </Stack>

//                 {/* PRODDBDetails and DEVURL */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <TextField
//                     {...register("PRODDBDetails")}
//                     variant="standard"
//                     label="PRODDBDetails"
//                     fullWidth
//                     error={!!errors.PRODDBDetails}
//                     helperText={errors.PRODDBDetails?.message}
//                   />

//                   <TextField
//                     {...register("DEVURL")}
//                     variant="standard"
//                     label="DEVURL"
//                     fullWidth
//                     error={!!errors.DEVURL}
//                     helperText={errors.DEVURL?.message}
//                   />
//                 </Stack>

//                 {/* QAURL and PRODURL */}
//                 <Stack
//                   direction="row"
//                   sx={{ gap: "2rem", marginBottom: "1rem" }}
//                 >
//                   <TextField
//                     {...register("QAURL")}
//                     variant="standard"
//                     label="QAURL"
//                     fullWidth
//                     error={!!errors.QAURL}
//                     helperText={errors.QAURL?.message}
//                   />

//                   <TextField
//                     {...register("PRODURL")}
//                     variant="standard"
//                     label="PRODURL"
//                     fullWidth
//                     error={!!errors.PRODURL}
//                     helperText={errors.PRODURL?.message}
//                   />
//                 </Stack>

//                 {/* ProjectStatusID and Developer1NameID */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="project-status-label">
//                       Project Status
//                     </InputLabel>
//                     <Select
//                       {...register("ProjectStatusID")}
//                       labelId="project-status-label"
//                       id="project-status-select"
//                       label="Project Status"
//                       fullWidth
//                       error={!!errors.ProjectStatusID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>

//                       {inputValue.ProjectStatus.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.ProjectStatusName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.ProjectStatusID && (
//                       <p>{errors.ProjectStatusID.message}</p>
//                     )}
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel id="developer-name-label">
//                       Developer 1st NameID
//                     </InputLabel>
//                     <Select
//                       {...register("Developer1NameID")}
//                       labelId="developer-name-label"
//                       id="developer-name-select"
//                       label="Developer 1st NameID"
//                       fullWidth
//                       error={!!errors.Developer1NameID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>
//                       {inputValue.Developer.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.FirstName} {item.LastName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.Developer1NameID && (
//                       <p>{errors.Developer1NameID.message}</p>
//                     )}
//                   </FormControl>
//                 </Stack>

//                 {/* Developer2NameID and ProductManagerID */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="developer2-name-label">
//                       Developer2Name
//                     </InputLabel>
//                     <Select
//                       {...register("Developer2NameID")}
//                       labelId="developer2-name-label"
//                       id="developer2-name-select"
//                       label="Developer2Name"
//                       fullWidth
//                       error={!!errors.Developer2NameID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>
//                       {inputValue.Developer.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.FirstName} {item.LastName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.Developer2NameID && (
//                       <p>{errors.Developer2NameID.message}</p>
//                     )}
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel id="product-manager-label">
//                       Product Manager
//                     </InputLabel>
//                     <Select
//                       {...register("ProductManagerID")}
//                       labelId="product-manager-label"
//                       id="product-manager-select"
//                       label="Product Manager"
//                       fullWidth
//                       error={!!errors.ProductManagerID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>
//                       {inputValue.ProductManager.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.FirstName} {item.LastName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.ProductManagerID && (
//                       <p>{errors.ProductManagerID.message}</p>
//                     )}
//                   </FormControl>
//                 </Stack>

//                 {/* ProjectManagerID and TechnicalManagerID */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="project-manager-label">
//                       Project Manager
//                     </InputLabel>
//                     <Select
//                       {...register("ProjectManagerID")}
//                       labelId="project-manager-label"
//                       id="project-manager-select"
//                       label="Project Manager"
//                       fullWidth
//                       error={!!errors.ProjectManagerID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>

//                       {inputValue.ProjectManager.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.FirstName} {item.LastName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.ProjectManagerID && (
//                       <p>{errors.ProjectManagerID.message}</p>
//                     )}
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel id="technical-manager-label">
//                       Technical Manager
//                     </InputLabel>
//                     <Select
//                       {...register("TechnicalManagerID")}
//                       labelId="technical-manager-label"
//                       id="technical-manager-select"
//                       label="Technical Manager"
//                       fullWidth
//                       error={!!errors.TechnicalManagerID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>

//                       {inputValue.TechnicalManager.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.FirstName} {item.LastName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.TechnicalManagerID && (
//                       <p>{errors.TechnicalManagerID.message}</p>
//                     )}
//                   </FormControl>
//                 </Stack>

//                 {/* TestManagerID and TechnologyStackDetails */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="test-manager-label">
//                       Test Manager
//                     </InputLabel>
//                     <Select
//                       {...register("TestManagerID")}
//                       labelId="test-manager-label"
//                       id="test-manager-select"
//                       label="Test Manager"
//                       fullWidth
//                       error={!!errors.TestManagerID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>
//                       {inputValue.TestManager.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.FirstName} {item.LastName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.TestManagerID && (
//                       <p>{errors.TestManagerID.message}</p>
//                     )}
//                   </FormControl>

//                   <TextField
//                     {...register("TechnologyStackDetails")}
//                     variant="standard"
//                     label="Technology Stack Details"
//                     fullWidth
//                     error={!!errors.TechnologyStackDetails}
//                     helperText={errors.TechnologyStackDetails?.message}
//                   />
//                 </Stack>

//                 {/* FrontEndStackID and BackEndStackID */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="front-end-label">
//                       Front End Stack
//                     </InputLabel>
//                     <Select
//                       {...register("FrontEndStackID")}
//                       labelId="front-end-label"
//                       id="front-end-select"
//                       label="Front End Stack"
//                       fullWidth
//                       error={!!errors.FrontEndStackID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>
//                       {inputValue.FrontEndStack.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.StackName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.FrontEndStackID && (
//                       <p>{errors.FrontEndStackID.message}</p>
//                     )}
//                   </FormControl>

//                   <FormControl fullWidth>
//                     <InputLabel id="back-end-label">Back End Stack</InputLabel>
//                     <Select
//                       {...register("BackEndStackID")}
//                       labelId="back-end-label"
//                       id="back-end-select"
//                       label="Back End Stack"
//                       fullWidth
//                       error={!!errors.BackEndStackID}
//                     >
//                       <MenuItem value={-1}>undecided</MenuItem>
//                       {inputValue.BackEndStack.map((item, index) => (
//                         <MenuItem key={index} value={item.ID}>
//                           {item.StackName}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {errors.BackEndStackID && (
//                       <p>{errors.BackEndStackID.message}</p>
//                     )}
//                   </FormControl>
//                 </Stack>

//                 {/* ServerName */}
//                 <Stack direction="row" sx={{ gap: "2rem" }}>
//                   <TextField
//                     {...register("ServerName")}
//                     variant="standard"
//                     label="Server Name"
//                     fullWidth
//                     error={!!errors.ServerName}
//                     helperText={errors.ServerName?.message}
//                   />
//                 </Stack>

//                 {/* DialogActions */}
//                 <DialogActions sx={{ margin: ".5rem" }}>
//                   <Button
//                     onClick={handleClose}
//                     variant="outlined"
//                     color="info"
//                     size="large"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="success"
//                     autoFocus
//                   >
//                     ADD
//                   </Button>
//                 </DialogActions>
//               </Stack>
//             </DialogContentText>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </React.Fragment>
//   );
// };

// export default NewProjectForm;
