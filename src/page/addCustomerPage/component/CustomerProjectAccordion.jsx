import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import axios from "axios";
import { Box, Stack, Typography } from "@mui/material";
import CommunicarionStepper from "./CommunicarionStepper";
import NewCommunicarion from "./NewCommunicartion";
import NewProjectFormp from "../../addProjectPage/NewProjectFormP";

export default function CustomerProjectAccordion({
  company,
  customerId,
  fetchCustomer,
}) {
  // State to hold the list of projects
  const [projects, setProjects] = React.useState([]);

  // State to hold projects specific to the current customer
  const [vwprojects, setvwProjects] = React.useState([]);

  // State to manage communication data
  const [communication, setCommunication] = React.useState([]);

  // State to manage loading state
  const [loading, setLoading] = React.useState(true);

  // State to control reloading of communication data
  const [communicationReload, setCommunicationReload] = React.useState(false);

  // Function to fetch projects for the current customer
  const fetchProject = async () => {
    try {
      // Make a GET request to fetch project data
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/project/projectvwByID/${customerId}`
      );
      console.log(res.data);

      // Update state with the fetched project data
      setvwProjects(res.data);

      // Set loading to false once data is fetched
      setLoading(false);
    } catch (error) {
      // Handle errors here if needed
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  React.useEffect(() => {
    fetchProject();
    // Optionally, you could also fetch communication data here
    // fetchCommunication();
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to trigger communication data reload
  const setCommunicationReloadFn = (value) => {
    setCommunicationReload(value);
  };

  return (
    <div>
      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        vwprojects.map((item, index) => {
          console.log(item);
          return (
            <Accordion sx={{ marginTop: ".5rem" }} key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  backgroundColor: "#f8bbd0",
                  borderRadius: "20px",
                  marginBottom: ".5rem",
                  color: "#555",
                  display: "flex",
                }}
              >
                <strong>
                  {index + 1}. {item.ProjectName}
                </strong>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Stack
                    direction="row"
                    sx={{
                      columnGap: "4rem",
                      width: "70%",
                      flexWrap: "wrap",
                      backgroundColor: "#fce4ec",
                      padding: "1rem",
                      borderRadius: "25px",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography variant="h6">
                      <strong>Project Id: </strong>
                      {item.ID}
                    </Typography>
                    <Typography variant="h6">
                      <strong>Project Details:</strong> {item.ProjectDetails}
                    </Typography>
                    <Typography variant="h6">
                      <strong>Frontend: </strong>
                      {item.FrontEndStack}
                    </Typography>
                    <Typography variant="h6">
                      <strong>Backend:</strong> {item.BackEndStack}
                    </Typography>
                    <Typography variant="h6">
                      <strong>Project Status:</strong> {item.ProjectStatusName}
                    </Typography>
                  </Stack>
                  <Stack sx={{ gap: "1rem" }}>
                    {/* Component to handle new communications */}
                    <NewCommunicarion
                      company={company}
                      // fetchCommunication={fetchCommunication}
                      projects={projects}
                      fetchProject={fetchProject}
                      fetchCustomer={fetchCustomer}
                      customerId={customerId}
                      projectId={item.ID}
                      setCommunicationReloadFn={setCommunicationReloadFn}
                    />

                    {/* Component to handle new project form */}
                    <NewProjectFormp id={item.ID} fetchProject={fetchProject} />
                  </Stack>
                </Stack>
                {/* Component to handle communication stepper */}
                <CommunicarionStepper
                  projectId={item.ID}
                  company={item.company}
                  communication={communication}
                  communicationReload={communicationReload}
                />
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </div>
  );
}

//====================================================================

// import * as React from "react";
// import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Button from "@mui/material/Button";
// import axios from "axios";
// import { Box, Stack, Typography } from "@mui/material";
// import CommunicarionStepper from "./CommunicarionStepper";
// import NewCommunicarion from "./NewCommunicartion";
// import NewProjectFormp from "../../addProjectPage/NewProjectFormP";

// export default function CustomerProjectAccordion({
//   company,
//   customerId,
//   fetchCustomer,
// }) {
//   const [projects, setProjects] = React.useState([]);
//   const [vwprojects, setvwProjects] = React.useState([]);

//   const [communication, setCommunication] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [communicationReload, setCommunicationReload] = React.useState(false);

//   // for company wide project =========================

//   const fetchProject = async () => {
//     const res = await axios.get(
//       `http://localhost:8080/v1/project/projectvwByID/${customerId}`
//     );
//     console.log(res.data);

//     setvwProjects(res.data);

//     setLoading(false);
//   };
//   // console.log(projects);

//   //useEffect ==========================================
//   React.useEffect(() => {
//     fetchProject();
//     // fetchCommunication();
//   }, []);
//   // console.log(communication);

//   const setCommunicationReloadFn = (value) => {
//     setCommunicationReload(value);
//   };

//   return (
//     <div>
//       {loading ? (
//         <Typography variant="h4">Loading...</Typography>
//       ) : (
//         vwprojects.map((item, index) => {
//           console.log(item);
//           return (
//             <Accordion sx={{ marginTop: ".5rem" }} key={index}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1-content"
//                 id="panel1-header"
//                 sx={{
//                   backgroundColor: "#f8bbd0",
//                   borderRadius: "20px",
//                   marginBottom: ".5rem",
//                   color: "#555",
//                   display: "flex",
//                 }}
//               >
//                 <strong>
//                   {index + 1}. {item.ProjectName}
//                 </strong>{" "}
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Stack direction="row" sx={{ justifyContent: "space-between" }}>
//                   <Stack
//                     direction="row"
//                     sx={{
//                       columnGap: "4rem",
//                       width: "70%",
//                       flexWrap: "wrap",
//                       backgroundColor: "#fce4ec",
//                       padding: "1rem",
//                       borderRadius: "25px",
//                       marginBottom: "1rem",
//                     }}
//                   >
//                     <Typography variant="h6">
//                       <strong>Project Id: </strong>
//                       {item.ID}
//                     </Typography>
//                     <Typography variant="h6">
//                       <strong>Project Details:</strong> {item.ProjectDetails}
//                     </Typography>
//                     <Typography variant="h6">
//                       <strong>Frontend: </strong>
//                       {item.FrontEndStack}
//                     </Typography>
//                     <Typography variant="h6">
//                       <strong>Backend:</strong> {item.BackEndStack}
//                     </Typography>
//                     <Typography variant="h6">
//                       <strong>Project Status:</strong> {item.ProjectStatusName}
//                     </Typography>
//                   </Stack>
//                   <Stack sx={{ gap: "1rem" }}>
//                     <NewCommunicarion
//                       company={company}
//                       // fetchCommunication={fetchCommunication}
//                       projects={projects}
//                       fetchProject={fetchProject}
//                       fetchCustomer={fetchCustomer}
//                       customerId={customerId}
//                       projectId={item.ID}
//                       setCommunicationReloadFn={setCommunicationReloadFn}
//                     />

//                     <NewProjectFormp id={item.ID} fetchProject={fetchProject} />
//                   </Stack>
//                 </Stack>
//                 <CommunicarionStepper
//                   projectId={item.ID}
//                   company={item.company}
//                   communication={communication}
//                   communicationReload={communicationReload}
//                 />
//               </AccordionDetails>
//             </Accordion>
//           );
//         })
//       )}
//     </div>
//   );
// }
