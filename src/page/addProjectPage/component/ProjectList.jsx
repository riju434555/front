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
import axios from "axios";
import NewCommunicarion from "../../addCustomerPage/component/NewCommunicartion";
import AddTimeLineForm from "../component/AddTimeLineForm";
import ShowTimeline from "./ShowTimeline";
import JsonToExcelConverter from "./JsonToExcelConverter";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

function Row(props) {
  const { row, searchText, selectSearchType, index } = props;
  const [open, setOpen] = React.useState(false);
  const [updateTimeline, setupdateTimeline] = React.useState("");
  // const [allTimeline, setAllTimeline] = React.useState([]);

  //for timeline fetching =========================================
  const timelingFetch = async () => {
    setupdateTimeline(Date.now());
  };

  return (
    <React.Fragment>
      {/* // for dropdown ================================================== */}

      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          textAlign: "right",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" align="right">
          {row.ID}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          // align="right"
          sx={{ textAlign: "right" }}
        >
          {row.ProjectName}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.FirstName} {row.LastName}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.ProjectStatusName}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.projectDeadline}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Stack>
                <Stack direction="row" sx={{ gap: "1rem" }}>
                  <AddTimeLineForm
                    projectId={row.ID}
                    timelingFetch={timelingFetch}
                  />
                </Stack>
                <Stack
                  direction="row"
                  sx={{
                    gap: "1rem",
                    padding: " 0 2rem",
                  }}
                >
                  <ShowTimeline
                    projectId={row.ID}
                    updateTimeline={updateTimeline}
                  />
                </Stack>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ProjectList({
  searchText,
  selectSearchType,
  fetchProjectsAfterAdd,
}) {
  // console.log(searchText);
  // console.log(selectSearchType);
  const [projectsList, setProjectsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const navigate = useNavigate();

  const token2 = JSON.parse(sessionStorage.getItem("token2"));

  const headers = {
    Authorization: `Bearer ${token2}`, // Assuming Bearer token authentication
    "Content-Type": "application/json", // Assuming the content type is JSON
  };
  const fetchCustomer = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/project/all`,
        {
          headers: headers,
        }
      );
      setProjectsList(res.data);
    } catch (err) {
      console.log(err.response.data.code);
      if (err.response.data.code == -2) {
        navigate("/");
      }
    }
  };
  React.useEffect(() => {
    fetchCustomer();
  }, [fetchProjectsAfterAdd]);
  // React.useEffect(() => {
  //   const newList = projectsList.filter((item) =>
  //     item[selectSearchType]
  //       ? item[selectSearchType]
  //           .toLowerCase()
  //           .includes(searchText.toLowerCase())
  //       : false
  //   );
  //   setProjectsList(newList);
  // }, [searchText, selectSearchType, projectsList]);

  // for pagination ======================================
  const itemsPerPage = 10;
  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  // Get current items
  const startIndex = (page - 1) * itemsPerPage;
  const afterFilter = projectsList.filter((item) =>
    item[selectSearchType]
      ? item[selectSearchType].toLowerCase().includes(searchText.toLowerCase())
      : false
  );
  const currentItems = afterFilter.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(afterFilter.length / itemsPerPage);

  return (
    <>
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
                align="right"
              >
                Project Id
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
                align="right"
              >
                Project Name
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
                Project Status
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
                align="right"
              >
                Timeline
              </TableCell>
              {/* <TableCell
              sx={{
                backgroundColor: "#555",
                color: "#fff",
              }}
              align="right"
            /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <JsonToExcelConverter jsonData={projectsList} fileName="rij" />

            {projectsList.length == 0 ? (
              <Box sx={{ height: "10rem", width: "100%" }}>
                <Typography variant="h6">Please wait...</Typography>{" "}
                <CircularProgress />
              </Box>
            ) : (
              currentItems.map((row, index) => {
                return (
                  <Row
                    key={index}
                    row={row}
                    index={index}
                    searchText={searchText}
                    selectSearchType={selectSearchType}
                  />
                );
              })
            )}
            {projectsList.length == 0 ||
              (afterFilter.length == 0 && <p>No Records found</p>)}
          </TableBody>
        </Table>
      </TableContainer>
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
