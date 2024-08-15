import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
const moment = require("moment");

export default function CommunicarionStepper({
  projectId,
  company,
  communicationReload, // Reload flag to refetch communication data
}) {
  // State to manage the current step in the Stepper
  const [activeStep, setActiveStep] = React.useState(0);

  // State to store customer profile data
  const [customerProfile, setCustomerProfile] = React.useState([]);

  // State to store communication data fetched from the server
  const [communication, setCommunication] = React.useState([]);

  // State to manage the loading state
  const [loading, setLoading] = React.useState(true);

  // Function to fetch customer profile data from the server
  const fetchCusomerProfile = async () => {
    try {
      // Make a GET request to fetch communication data by project ID
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/message/messagebyId/${projectId}`
      );
      console.log(res.data);

      // Update state with fetched communication data
      setCommunication(res.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching customer profile:", error);
      setLoading(false); // Ensure loading is turned off even if there's an error
    }
  };

  // Effect to fetch communication data whenever `communicationReload` changes
  React.useEffect(() => {
    fetchCusomerProfile();
  }, [communicationReload]);

  // Function to format dates to IST (Indian Standard Time)
  const dateFunction = (date) => {
    let dateGMT = new Date(date);

    // Get the UTC timestamp in milliseconds
    let utcTimestamp = dateGMT.getTime();

    // Offset for IST (Indian Standard Time) is UTC +5 hours 30 minutes
    let ISTOffset = 5.5 * 60 * 60 * 1000;

    // Calculate IST time by adding the offset to UTC time
    let dateIST = new Date(utcTimestamp + ISTOffset);

    // Format the IST date as a string
    let formattedIST = dateIST.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    return formattedIST;
  };

  return (
    <Box>
      {/* Show a loading indicator while data is being fetched */}
      {loading && <LinearProgress />}

      {/* Stepper component to show communication steps */}
      <Stepper activeStep={activeStep} orientation="vertical">
        {/* Iterate through communication data and create a Step for each item */}
        {communication.reverse().map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>
                {/* Display communication details */}
                <Typography>
                  <strong>Communicate with: </strong>
                  {step.CustomerFirstName} {step.CustomerLastName}
                </Typography>
                <Typography>
                  <strong>ChatMessage: </strong>
                  {step.ChatMessage}
                </Typography>
                <Typography>
                  <strong>CurrentStatus: </strong>
                  {step.CurrentStatus}
                </Typography>
                <Typography>
                  <strong>User: </strong>
                  {step.UserFirstName} {step.UserLastName}
                </Typography>

                <Typography>
                  <strong>NextFollowUpDateTime: </strong>
                  {dateFunction(step.NextFollowUpDateTime)}{" "}
                  {/* Format and display the follow-up date */}
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <div>
                    {/* Optional buttons for navigating steps (currently commented out) */}
                    {/* <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button> */}
                  </div>
                </Box>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      {/* Optional content for when all steps are completed (currently commented out) */}
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}
