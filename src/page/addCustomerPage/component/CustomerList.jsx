import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Stack } from "@mui/material";
import Stepper from "./CommunicarionStepper";
import CommunicarionStepper from "./CommunicarionStepper";
import CustomerProjectAccordion from "./CustomerProjectAccordion";
import DownloadLink from "react-download-link";
import CircularProgress from "@mui/material/CircularProgress";
import NewCustomerForm from "./NewCustomerForm";
import JsonToExcelConverter from "../../addProjectPage/component/JsonToExcelConverter";
import Pagination from "@mui/material/Pagination";

// Row component for rendering individual customer rows in the table
function Row(props) {
  const { row, fetchCustomer, companySearch, fetchAfterEditFn } = props;
  const [open, setOpen] = React.useState(false); // State to manage row expansion
  const [imageUrl, setImageUrl] = React.useState(""); // State to store fetched image URL
  const [logoUrl, setLogoUrl] = React.useState(""); // State to store fetched logo URL
  const [forImageLoad, setImageLoad] = React.useState(""); // State to trigger image re-fetch

  // Function to fetch and set the image URL
  const fetchImageUrl = async () => {
    try {
      const response = await fetch(row.Picture);
      if (response.ok) {
        const imageUrl = URL.createObjectURL(await response.blob());
        setImageUrl(imageUrl); // Set the image URL state
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // Function to fetch and set the logo URL
  const fetchLogoUrl = async () => {
    try {
      const response = await fetch(row.Logo);
      if (response.ok) {
        const imageUrl = await URL.createObjectURL(await response.blob());
        setLogoUrl(imageUrl); // Set the logo URL state
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  React.useEffect(() => {
    // Fetch the image and logo URLs when the component mounts or `forImageLoad` changes
    fetchImageUrl();
    fetchLogoUrl();
  }, [forImageLoad]);

  // Function to trigger image re-fetching
  const forImageLoadFn = () => {
    setImageLoad(Date.now()); // Update `forImageLoad` state to trigger re-fetch
  };

  return (
    <React.Fragment>
      {/* Table row for customer details */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {/* Button to expand or collapse row */}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.CompanyName}
        </TableCell>
        <TableCell align="right">
          {row.FirstName} {row.LastName}
        </TableCell>
        <TableCell align="right">{row.Email}</TableCell>
        <TableCell align="right">{row.PhoneNumber}</TableCell>
        <TableCell align="right">{row.WhatsAppNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {/* Collapsible section for additional customer details */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Projects:
                </Typography>
                {/* Form for adding or editing customer */}
                <NewCustomerForm
                  type="edit"
                  customer={row}
                  fetchCustomer={fetchCustomer}
                  forImageLoadFn={forImageLoadFn}
                  fetchImageUrl={fetchImageUrl}
                  fetchLogoUrl={fetchLogoUrl}
                  fetchAfterEditFn={fetchAfterEditFn}
                />
              </Stack>
              <Stack direction="row" sx={{ gap: "2rem" }}>
                {
                  <img
                    src={row.Picture}
                    alt="Profile Image"
                    width="100em"
                    height="50rem"
                  />
                }
                <img
                  src={row.Logo}
                  alt="Profile Logo"
                  width="100em"
                  height="50rem"
                />
              </Stack>
              <Stack direction="row" sx={{ gap: "1rem" }}>
                {/* Accordion for showing customer projects */}
                <CustomerProjectAccordion
                  customerId={row.ID}
                  fetchCustomer={fetchCustomer}
                />
                {/* Uncomment if needed: */}
                {/* <CommunicarionStepper
                    projectId={row.ID}
                    company={row.CompanyName}
                    communicationReload={fetchAfterEditFn}
                  /> */}
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Main component for rendering the list of customers
export default function CustomerList({
  customerList,
  fetchCustomer,
  companySearch,
  fetchAfterEdit,
  fetchAfterEditFn,
}) {
  const [loading, setLoading] = React.useState(true); // State to manage loading state
  const [filterCustomerList, setFilterCustomerList] = React.useState([]); // State to manage filtered customer list
  const [page, setPage] = React.useState(1); // State to manage pagination page

  React.useEffect(() => {
    // Filter customers based on company search term
    const response = customerList.filter((item) =>
      item.CompanyName.toLowerCase().includes(companySearch.toLowerCase())
    );
    setFilterCustomerList(response);
  }, [companySearch, customerList, fetchAfterEdit]);

  // Pagination settings
  const itemsPerPage = 210; // Number of items per page
  const totalPages = Math.ceil(filterCustomerList.length / itemsPerPage); // Total number of pages

  // Handle page change for pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Get items for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filterCustomerList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      {/* Table container for displaying customer data */}
      <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
              />
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
              >
                Company Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
                align="right"
              >
                Customer Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
                align="right"
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
                align="right"
              >
                Phone No
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
                align="right"
              >
                Whatsapp No
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
                align="right"
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList.length === 0 ? (
              <Box sx={{ height: "10rem", width: "100%" }}>
                <Typography variant="h6">Please wait...</Typography>{" "}
                <CircularProgress />
              </Box>
            ) : (
              <>
                {/* Button to export customer data to Excel */}
                <JsonToExcelConverter jsonData={customerList} fileName="rij" />
                {/* Display a message if no records are found */}
                {currentItems.length === 0 && <p>No Records found</p>}
                {/* Render rows for the current page */}
                {currentItems.map((row, index) => {
                  return (
                    <Row
                      key={index}
                      row={row}
                      fetchCustomer={fetchCustomer}
                      companySearch={companySearch}
                      fetchAfterEditFn={fetchAfterEditFn}
                    />
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination controls */}
      <Stack sx={{ alignItems: "center", margin: "2rem" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 2 }}
        />
      </Stack>
    </>
  );
}
