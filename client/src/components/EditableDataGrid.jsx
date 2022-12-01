import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { addTeamToLeague, editTeam, getLeagueTeams } from "../state/League";
import AlertPopup from "./AlertPopup";
import dayjs from 'dayjs'

const EditableDataGrid = () => {
  const [data, setData] = useState({});
  const [teamData, setTeamData] = useState({});
  // const [lastUpdated,setLastUpdated] = useState()

  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddTeamForm, setShowAddTeamForm] = useState(false);

  const dispatch = useDispatch();

  const leagueTable = useSelector((state) => state.leagueTable);

  const rows = leagueTable?.leagues?.Teams;

  const { teamAdded, message, teamEdited, error, teamsFullError } = leagueTable;

  const handleChange = (e) => {
    setTeamData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const columns = [
    { field: "number", headerName: "#", width: 70 },
    { field: "team_name", headerName: "Team Name", width: 130 },
    { field: "match_played", headerName: "Match Played", width: 130 },
    {
      field: "goal_diff",
      headerName: "Goal Difference",
      type: "number",
      width: 90,
    },
    {
      field: "points",
      headerName: "Points",
      type: "number",
      width: 90,
    },
    {
      field: "actions",
      headerName: "Actions",
    },
  ];

  // const onKeyDown = (e) => {
  //   console.log(e.target.name);
  //   setData((prevData) => ({
  //     ...prevData,
  //     [e.target.value]: e.target.value,
  //   }));
  //   console.log(data);
  // };

  const onChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: parseInt(e.target.value),
    }));
  }

  let arrDates = []

  rows?.forEach((row) => {
    arrDates.push(row.updated_at)
  })

  arrDates = arrDates.sort((a,b) => b - a);

  console.log(arrDates)

  useEffect(() => {
    dispatch(getLeagueTeams());
  }, [dispatch]);

  return (
    <Box>
      <Box textAlign={"center"}>
        <Button variant="outlined" onClick={() => setShowAddTeamForm(true)}>
          Add Team
        </Button>
      </Box>
      <br />
      {
        teamAdded && <AlertPopup open={true} message={message} />
      }
      {
        teamEdited && <AlertPopup open={true} message={message} />
      }
      {
        error && <AlertPopup open={true} message={message} severity={'error'} />
      }
      {
        teamsFullError && <AlertPopup open={true} message={message} severity={'error'} />
      }
      {showAddTeamForm && (
        <form id="form">
          <Table>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell>
                  <TextField
                    name={"team_name"}
                    size="small"
                    label={"Club Name"}
                    autoComplete={"off"}
                    type="text"
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name={"match_played"}
                    size="small"
                    label={"Match Played"}
                    autoComplete={"off"}
                    type="number"
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name={"goal_diff"}
                    size="small"
                    label={"Goal Difference"}
                    autoComplete={"off"}
                    type="number"
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name={"points"}
                    size="small"
                    label={"Points"}
                    autoComplete={"off"}
                    type="number"
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <IconButton
                        size="medium"
                        sx={{ border: "1px solid #5DADE2" }}
                        onClick={() => {
                          dispatch(addTeamToLeague(teamData));
                        }}
                      >
                        <CheckCircleIcon sx={{ color: "#5DADE2" }} />
                      </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        size="medium"
                        sx={{ border: "1px solid #5DADE2" }}
                        onClick={() => setShowAddTeamForm(false)}
                      >
                        <CancelIcon sx={{ color: "#5DADE2" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      )}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#34495E",
                      color: "white",
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
              {showEditForm && (
                <>
                  <TableRow>
                    <Formik>
                      {({ values, errors, handleSubmit }) => {
                        console.log(errors);
                        return (
                          <>
                            {columns.map((column) => {
                              return column.field !== "actions" ? (
                                <TableCell key={column.field}>
                                  <TextField
                                    name={column.field}
                                    disabled={column.field === "number"}
                                    size="small"
                                    label={column.headerName}
                                    autoComplete={"off"}
                                    type="text"
                                    value={data[`${column?.field}`] || ""}
                                    onChange={onChange}
                                  />
                                </TableCell>
                              ) : (
                                <TableCell key={column.field}>
                                  <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                      <IconButton
                                        size="medium"
                                        sx={{ border: "1px solid #5DADE2" }}
                                        onClick={() => {
                                          dispatch(editTeam(data))
                                        }}
                                      >
                                        <CheckCircleIcon
                                          sx={{ color: "#5DADE2" }}
                                        />
                                      </IconButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <IconButton
                                        size="medium"
                                        sx={{ border: "1px solid #5DADE2" }}
                                        onClick={() => setShowEditForm(false)}
                                      >
                                        <CancelIcon sx={{ color: "#5DADE2" }} />
                                      </IconButton>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              );
                            })}
                          </>
                        );
                      }}
                    </Formik>
                  </TableRow>
                </>
              )}
            </TableHead>
            <TableBody>
              {rows?.map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.team_name}</TableCell>
                    <TableCell>{row.match_played}</TableCell>
                    <TableCell>{row.goal_diff}</TableCell>
                    <TableCell>{row.points}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          console.log(row);
                          setData({
                            ...row,
                          });
                          setShowEditForm(true);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
      <br />
      <Typography>
        {
          arrDates[0]
        }
      </Typography>
    </Box>
  );
};

export default EditableDataGrid;
