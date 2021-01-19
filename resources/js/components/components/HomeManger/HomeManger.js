import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { apiBaseUrl } from "../../config.json";
import MenuItem from "@material-ui/core/MenuItem";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getToken, isAuth, logout, getRole } from "../../services/Auth";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: 1,
    padding: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function HomeManger() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [matches, setMatches] = useState([]);

  const [dialogOptions, setDialogOptions] = React.useState({
    open: false,
    type: null,
    data: null
  });

  const handleDialog = (open, type, data) => {
    if (!isAuth()) {
      logout();
      return history.push("/login/");
    }
    let copyOfData = { ...data };
    setDialogOptions({
      open: open,
      type: type,
      data: copyOfData
    });
  };

  const handleClose = () => {
    setDialogOptions(false, null, null);
  };
  const newMatch = {
    id: 1,
    home_team_id: "7",
    away_team_id: "12",
    stadium_id: "3",
    date_time: "2019-12-01 00:00:00",
    main_referee: "River Cole PhD",
    linesmen_1: "Rachel Dickinson",
    linesmen_2: "Ashleigh Fritsch",
    created_at: "2020-12-31T03:00:36.000000Z",
    updated_at: "2020-12-31T03:00:36.000000Z",
    stadium: {
      id: 3,
      name: "Tremblay-Koelpin",
      rows: "2",
      seats_per_row: "4",
      created_at: "2020-12-31T03:00:35.000000Z",
      updated_at: "2020-12-31T03:00:35.000000Z"
    },
    away_team: {
      id: 12,
      name: "Kohler-Schaefer",
      created_at: "2020-12-31T03:00:35.000000Z",
      updated_at: "2020-12-31T03:00:35.000000Z"
    },
    home_team: {
      id: 7,
      name: "Wiza, Rice and Lehner",
      created_at: "2020-12-31T03:00:34.000000Z",
      updated_at: "2020-12-31T03:00:34.000000Z"
    },
    seats: [
      [1, 1, 1, 1],
      [1, 1, 0, 1]
    ]
  };

  const handleSubmit = () => {
    if (dialogOptions.type === "Edit") {
      Axios.post(
        apiBaseUrl + "manager/update/match/" + dialogOptions.data.id.toString(),
        {
          home_team_id: dialogOptions.data.home_team.id,
          away_team_id: dialogOptions.data.away_team.id,
          stadium_id: dialogOptions.data.stadium.id,
          date_time: dialogOptions.data.date_time,
          main_referee: dialogOptions.data.main_referee,
          linesmen_1: dialogOptions.data.linesmen_1,
          linesmen_2: dialogOptions.data.linesmen_2
        },

        {
          headers: { Authorization: "Bearer " + getToken() }
        }
      )
        .then((res) => {
          try {
            if (res.data.error[0]) {
              setAlert(res.data.error[0]);
              setOpenAlert(true);
            }
            if (!isAuth()) {
              logout();
              return history.push("/login/");
            }
          } catch (err) {}
          setRefresh(!refresh);
        })
        .catch((err) => {});
    } else if (dialogOptions.type === "New Match") {
      Axios.post(
        apiBaseUrl + "manager/add/match/",
        {
          home_team_id: dialogOptions.data.home_team.id,
          away_team_id: dialogOptions.data.away_team.id,
          stadium_id: dialogOptions.data.stadium.id,
          date_time: dialogOptions.data.date_time,
          main_referee: dialogOptions.data.main_referee,
          linesmen_1: dialogOptions.data.linesmen_1,
          linesmen_2: dialogOptions.data.linesmen_2
        },

        {
          headers: { Authorization: "Bearer " + getToken() }
        }
      )
        .then((res) => {
          try {
            if (res.data.error[0]) {
              setAlert(res.data.error[0]);
              setOpenAlert(true);
            }
            if (!isAuth()) {
              logout();
              return history.push("/login/");
            }
          } catch (err) {}
          setRefresh(!refresh);
        })
        .catch((err) => {});
    } else {
      Axios.post(
        apiBaseUrl + "manager/add/stadium/",
        {
          name: dialogOptions.data.name,
          rows: dialogOptions.data.rows,
          seats_per_row: dialogOptions.data.seats_per_row
        },

        {
          headers: { Authorization: "Bearer " + getToken() }
        }
      )
        .then((res) => {
          setRefresh(!refresh);
        })
        .catch((err) => {});
    }
    handleClose();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAuth()) {
        logout();
        return history.push("/admin/login/");
      } else {
        setRefresh(!refresh);
      }
    }, 5000);

    Axios.get(apiBaseUrl + "matches/").then((res) => {
      if (res.data.matches) {
        setMatches(res.data.matches);
      }
    });
    Axios.get(apiBaseUrl + "manager/stadiums/", {
      headers: { Authorization: "Bearer " + getToken() }
    }).then((res) => {
      if (res.data.stadiums) {
        setStadiums(res.data.stadiums);
      }
    });
    Axios.get(apiBaseUrl + "manager/teams/", {
      headers: { Authorization: "Bearer " + getToken() }
    }).then((res) => {
      if (res.data.teams) {
        setTeams(res.data.teams);
      }
    });
    console.log("loading...");

    return () => clearInterval(interval);
  }, [refresh, history]);

  if (getRole() === "admin") {
    history.push("/home/admin/");
  }
  if (getRole() === "fan") {
    history.push("/");
  }
  if (getRole() !== "manager") {
     history.push("/login/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Manager
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              handleDialog(true, "New Match", newMatch);
            }}
          >
            New Match
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              handleDialog(
                true,
                "New Stadium",

                { name: "Stadium", rows: 1, seats_per_row: 5 }
              );
            }}
          >
            New Stadium
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              logout();
              history.push("/login/");
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Home Team</TableCell>
            <TableCell align="center">Away Team</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">View Details</TableCell>
            <TableCell align="center">View Seats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.home_team.name}</TableCell>
              <TableCell align="center">{row.away_team.name}</TableCell>
              <TableCell align="center">{row.date_time}</TableCell>

              <TableCell
                align="center"
                onClick={() => {
                  handleDialog(true, "Edit", row);
                }}
              >
                {" "}
                <EditIcon />
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  handleDialog(true, "Match Details", row);
                }}
              >
                {" "}
                <VisibilityIcon />
              </TableCell>

              <TableCell
                align="center"
                onClick={() => {
                  handleDialog(true, "Seats", row);
                }}
              >
                <EventSeatIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        fullScreen
        open={dialogOptions.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogOptions.type}</DialogTitle>

        {dialogOptions.type === "New Stadium" && (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Stadium Name"
              value={dialogOptions.data.name}
              fullWidth
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.name = e.target.value;

                setDialogOptions(temp);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Rows"
              type="tel"
              value={dialogOptions.data.rows}
              fullWidth
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.rows = e.target.value;

                setDialogOptions(temp);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Seats Per Row"
              type="tel"
              value={dialogOptions.data.seats_per_row}
              fullWidth
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.seats_per_row = e.target.value;

                setDialogOptions(temp);
              }}
            />
          </DialogContent>
        )}

        {dialogOptions.type === "Match Details" && (
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Home Team"
              value={dialogOptions.data.home_team.name}
              readonly
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Away Team"
              value={dialogOptions.data.away_team.name}
              readonly
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Stadium"
              value={dialogOptions.data.stadium.name}
              readonly
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Date"
              value={dialogOptions.data.date_time}
              readonly
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Main Referee"
              value={dialogOptions.data.main_referee}
              readonly
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Linesmen 1"
              value={dialogOptions.data.linesmen_1}
              readonly
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Linesmen 2"
              value={dialogOptions.data.linesmen_2}
              readonly
              fullWidth
            />
          </DialogContent>
        )}

        {dialogOptions.type === "Seats" && (
          <DialogContent>
            <Grid container xs={12} margin={2}>
              {dialogOptions.data.seats
                ? dialogOptions.data.seats.map((row, rindex) => {
                    return (
                      <Grid container justify="center" spacing={2}>
                        {row.map((item, cindex) => (
                          <Tooltip
                            title={item === 1 ? "Avaiable" : "Not avaiable"}
                            placement="top"
                          >
                            <Paper
                              style={{
                                backgroundColor:
                                  item === 1
                                    ? "limegreen"
                                    : item === 0
                                    ? "gray"
                                    : "gold",
                                height: 60,
                                width: 50,
                                textAlign: "center",
                                color: "white",
                                padding: 5,
                                margin: 10,
                                userSelect: "none",
                                cursor: "pointer"
                              }}
                              className={classes.paper}
                            >
                              <Typography
                                style={{
                                  textAlign: "right",
                                  fontSize: "10px"
                                }}
                              >
                                Row: {rindex + 1} <br></br>
                              </Typography>

                              {item === 1 && <PersonAddIcon />}
                              {item === 0 && <PersonAddDisabledIcon />}

                              <Typography
                                style={{
                                  textAlign: "left",
                                  fontSize: "8px"
                                }}
                              >
                                No.:{" "}
                                {cindex +
                                  1 +
                                  rindex *
                                    dialogOptions.data.stadium
                                      .seats_per_row}{" "}
                              </Typography>
                            </Paper>
                          </Tooltip>
                        ))}
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </DialogContent>
        )}

        {dialogOptions.type === "Edit" || dialogOptions.type === "New Match" ? (
          <DialogContent>
            <InputLabel margin="dense" shrink="true">
              Home Team
            </InputLabel>
            <Select
              value={dialogOptions.data.home_team.id}
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.home_team.id = e.target.value;

                setDialogOptions(temp);
              }}
            >
              {teams.map((row, index) => (
                <MenuItem value={row.id}>{row.name}</MenuItem>
              ))}
            </Select>

            <InputLabel margin="dense" shrink="true">
              Away Team
            </InputLabel>
            <Select
              value={dialogOptions.data.away_team.id}
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.away_team.id = e.target.value;

                setDialogOptions(temp);
              }}
            >
              {teams.map((row, index) => (
                <MenuItem value={row.id}>{row.name}</MenuItem>
              ))}
            </Select>

            <InputLabel margin="dense" shrink="true">
              Stadium
            </InputLabel>
            <Select
              value={dialogOptions.data.stadium.id}
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.stadium.id = e.target.value;
                setDialogOptions(temp);
              }}
            >
              {stadiums.map((row, index) => (
                <MenuItem value={row.id}>{row.name}</MenuItem>
              ))}
            </Select>

            <TextField
              autoFocus
              margin="dense"
              label="Date"
              type="datetime-local"
              fullWidth
              value={
                dialogOptions.data.date_time.substr(0, 10) +
                "T" +
                dialogOptions.data.date_time[11] +
                dialogOptions.data.date_time[12] +
                dialogOptions.data.date_time[13] +
                dialogOptions.data.date_time[14] +
                dialogOptions.data.date_time[15]
              }
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.date_time = e.target.value;
                setDialogOptions(temp);
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              label="Main Referee"
              value={dialogOptions.data.main_referee}
              fullWidth
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.main_referee = e.target.value;
                setDialogOptions(temp);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Linesmen 1"
              value={dialogOptions.data.linesmen_1}
              fullWidth
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.linesmen_1 = e.target.value;
                setDialogOptions(temp);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Linesmen 2"
              value={dialogOptions.data.linesmen_2}
              fullWidth
              onChange={(e) => {
                let temp = { ...dialogOptions };
                temp.data.linesmen_2 = e.target.value;
                setDialogOptions(temp);
              }}
            />
          </DialogContent>
        ) : null}

        {dialogOptions.type === "Match Details" ||
        dialogOptions.type === "Seats" ? (
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        ) : null}
        {dialogOptions.type === "Edit" ||
        dialogOptions.type === "New Match" ||
        dialogOptions.type === "New Stadium" ? (
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
      <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
        <DialogContent>
          <DialogContentText>{alert}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAlert(false)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
