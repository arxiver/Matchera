import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState, useEffect } from "react";
import Axios from "axios";
import { isAuth, getToken, getRole } from "../../services/Auth";
import { apiBaseUrl } from "../../config.json";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    paper: {
        height: 60,
        width: 50,
        textAlign: "center",
        color: "white",
        padding: 5,
        margin: 10,
        userSelect: "none",
        cursor: "pointer"
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    card: {
        height: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    }
}));

function Cancelation({
    reservationCancel,
    setReservationCancel,
    seatInfo,
    setMessage
}) {
    const [ticketCode, setTicketCode] = useState("");
    const orgCode = `${seatInfo.seatId + 1}${seatInfo.row}${seatInfo.col}${
        seatInfo.matchId
    }${seatInfo.stadiumId}`;
    const handleCancel = () => {
        Axios.get(
            `${apiBaseUrl}fan/cancel/reservation?stadium_id=${seatInfo.stadiumId}&match_id=${seatInfo.matchId}&row=${seatInfo.row}&col=${seatInfo.col}`,
            {
                headers: { Authorization: "Bearer " + getToken() }
            }
        ).then(res => {
            if (res.data.message) {
                setMessage(res.data.message);
            }
            setReservationCancel(false);
        });
    };

    return (
        <div>
            <Dialog
                open={reservationCancel}
                onClose={e => setReservationCancel(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Reserve Seat No. {seatInfo.seatId}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your seat is reserved with ticket number{" "}
                        <b>{orgCode}</b> <br></br> If you want to cancel it
                        write down your ticket number in the text box and click
                        cancel reservation
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="ticketnumber"
                                label="Ticket number"
                                type="ticket"
                                onChange={e => {
                                    setTicketCode(e.target.value);
                                }}
                                required
                                color="secondary"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={e => {
                                    if (orgCode === ticketCode) {
                                        // cancel reservation!
                                        handleCancel();
                                        setReservationCancel(false);
                                    }
                                }}
                            >
                                Cancel reservation
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={e => {
                            setReservationCancel(false);
                        }}
                        color="primary"
                    >
                        I am just checking the ticket number
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function Reservation({
    openReservation,
    setOpenReservation,
    seatInfo,
    setMessage
}) {
    const [loading, setLoading] = useState(false);
    const handlePurchase = () => {
        setLoading(true);
        Axios.get(
            `${apiBaseUrl}fan/reserve?stadium_id=${seatInfo.stadiumId}&match_id=${seatInfo.matchId}&row=${seatInfo.row}&col=${seatInfo.col}`,
            {
                headers: { Authorization: "Bearer " + getToken() }
            }
        ).then(res => {
            if (res.data.message) {
                setMessage(res.data.message);
            }
            setLoading(false);
            setOpenReservation(false);
        });
    };
    return (
        <div>
            <Dialog
                open={openReservation}
                onClose={e => setOpenReservation(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Reserve Seat No. {seatInfo.seatId}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        To reserve this seat, please enter your credit card
                        number and its pin number here.
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="card"
                                label="Credit Card Number"
                                type="credit"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="dense"
                                id="pin"
                                label="PIN"
                                type="pin"
                                required
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                {loading && (
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <CircularProgress></CircularProgress>
                        </Grid>
                    </Grid>
                )}
                <DialogActions>
                    <Button
                        onClick={e => {
                            setOpenReservation(false);
                        }}
                        disabled={loading}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handlePurchase}
                        color="primary"
                        disabled={loading}
                    >
                        Purchase
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

export default function Home() {
    const history = useHistory();
    const classes = useStyles();
    const [matches, setMatches] = useState([]);
    const [matchId, setMatchId] = useState(-1);
    const [auth, setAuth] = React.useState(isAuth());
    const [openReservation, setOpenReservation] = React.useState(false);
    const [reservationCancel, setReservationCancel] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [seatInfo, setSeatInfo] = useState({
        row: -1,
        col: -1,
        seatId: -1,
        matchId: -1,
        stadiumId: -1
    });
    useEffect(() => {
        if (getToken() !== null)
            Axios.get(apiBaseUrl + "matches", {
                headers: { Authorization: "Bearer " + getToken() }
            }).then(res => {
                setMatches(res.data.matches);
            });
        else {
            Axios.get(apiBaseUrl + "matches").then(res => {
                setMatches(res.data.matches);
            });
        }
    }, []);
    const [viewMatch, setViewMatch] = React.useState(false);

    const handleMatchClose = () => {
        setViewMatch(false);
        setMatchId(-1);
    };
    const handleMatchOpen = id => {
        setViewMatch(true);
        setMatchId(id);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (matchId !== -1) {
                // eslint-disable-next-line
                const headersObj =
                    getToken() !== null
                        ? {
                              headers: { Authorization: "Bearer " + getToken() }
                          }
                        : {};

                Axios.get(
                    apiBaseUrl + "match" + "/" + matches[matchId].id,
                    headersObj
                )
                    .then(res => {
                        let matchesEdited = [...matches];
                        matchesEdited[matchId] = res.data.match;
                        setMatches(matchesEdited);
                        if (
                            matches[matchId].seates[seatInfo.row][
                                seatInfo.col
                            ] !== res.data.match[seatInfo.row][seatInfo.col]
                        ) {
                            setOpenReservation(false);
                            // warning it is taken;
                        }
                    })
                    .catch(err => console.log);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [matchId]);

    if (getRole() === "admin") {
        history.push("/home/admin/");
    }
    if (getRole() === "manager") {
        history.push("/home/manager/");
    }

    return (
        <React.Fragment>
            <Header auth={auth} setAuth={setAuth}></Header>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            MATCHERA
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Welcome to the first online reservation service for
                            matches, it is avaiable right now!
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {matches
                            ? matches.map((match, index) => (
                                  <Grid item key={match} xs={12} sm={6} md={4}>
                                      <Card className={classes.card}>
                                          <CardMedia
                                              className={classes.cardMedia}
                                              image="https://e7.pngegg.com/pngimages/497/719/png-clipart-football-1080p-display-resolution-high-definition-television-three-dimensional-football-field-lighted-ballpark-television-other-thumbnail.png"
                                              title="Image title"
                                          />
                                          <CardContent
                                              className={classes.cardContent}
                                          >
                                              <Typography align="center">
                                                  <Typography
                                                      gutterBottom
                                                      variant="h6"
                                                      component="h4"
                                                  >
                                                      {match.home_team.name}
                                                  </Typography>
                                                  <b> V.S. </b>
                                                  <Typography
                                                      gutterBottom
                                                      variant="h6"
                                                      component="h4"
                                                  >
                                                      {match.away_team.name}
                                                  </Typography>
                                              </Typography>
                                          </CardContent>
                                          <CardActions>
                                              <Button
                                                  color="primary"
                                                  fullWidth
                                                  variant="outlined"
                                                  onClick={e =>
                                                      handleMatchOpen(index)
                                                  }
                                              >
                                                  View More
                                              </Button>
                                          </CardActions>
                                      </Card>
                                  </Grid>
                              ))
                            : null}
                    </Grid>
                </Container>
            </main>
            <div>
                {matches.size !== 0 && matchId !== -1 ? (
                    <Dialog
                        fullScreen
                        open={viewMatch}
                        onClose={e => handleMatchClose()}
                        TransitionComponent={Transition}
                    >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={e => handleMatchClose()}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Snackbar
                                    open={message !== ""}
                                    autoHideDuration={3000}
                                    onClose={e => {
                                        setMessage("");
                                    }}
                                >
                                    <Alert
                                        onClose={e => {
                                            setMessage("");
                                        }}
                                        severity="success"
                                    >
                                        {message}
                                    </Alert>
                                </Snackbar>

                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                >
                                    {matches[matchId].home_team.name}
                                    <i> V.S. </i>
                                    {matches[matchId].away_team.name}
                                    <i> On </i>
                                    {matches[matchId].stadium.name} Stadium
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogContent dividers>
                            <DialogTitle
                                id="customized-dialog-title"
                                onClose={handleMatchClose}
                            ></DialogTitle>

                            <Typography align="center">
                                <Typography
                                    gutterBottom
                                    variant="h7"
                                ></Typography>
                                <br></br>
                                <Typography
                                    gutterBottom
                                    variant="h4"
                                    component="h4"
                                >
                                    Match Information
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h7"
                                    component="h6"
                                >
                                    Date:{" "}
                                    {matches[matchId].date_time.substr(0, 10)},
                                    Time:{" "}
                                    {matches[matchId].date_time.substr(10, 20)}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h7"
                                    component="h6"
                                >
                                    Main referee:{" "}
                                    {matches[matchId].main_referee}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h7"
                                    component="h6"
                                >
                                    Lines men: {matches[matchId].linesmen_1} &{" "}
                                    {matches[matchId].linesmen_2}
                                </Typography>
                            </Typography>
                            <Typography align="center">
                                <Typography variant="h4" component="h4">
                                    Seats
                                </Typography>
                            </Typography>
                            <DialogContent dividers>
                                <Grid container xs={12} margin={2}>
                                    {matches[matchId].seats
                                        ? matches[matchId].seats.map(
                                              (row, rindex) => {
                                                  return (
                                                      <Grid
                                                          container
                                                          justify="center"
                                                          spacing={2}
                                                      >
                                                          {row.map(
                                                              (
                                                                  item,
                                                                  cindex
                                                              ) => (
                                                                  <Tooltip
                                                                      title={
                                                                          item ===
                                                                          1
                                                                              ? "Reserve?"
                                                                              : item ===
                                                                                0
                                                                              ? "Not avaiable"
                                                                              : "Leave?"
                                                                      }
                                                                      placement="top"
                                                                  >
                                                                      <Paper
                                                                          onClick={e => {
                                                                              if (
                                                                                  item ===
                                                                                      1 &&
                                                                                  getRole() ===
                                                                                      null
                                                                              )
                                                                                  history.push(
                                                                                      "/login"
                                                                                  );
                                                                              if (
                                                                                  item ===
                                                                                      1 &&
                                                                                  getRole() ===
                                                                                      "fan"
                                                                              ) {
                                                                                  setSeatInfo(
                                                                                      {
                                                                                          row: rindex,
                                                                                          col: cindex,
                                                                                          seatId:
                                                                                              1 +
                                                                                              cindex +
                                                                                              rindex *
                                                                                                  matches[
                                                                                                      matchId
                                                                                                  ]
                                                                                                      .stadium
                                                                                                      .seats_per_row,
                                                                                          matchId:
                                                                                              matches[
                                                                                                  matchId
                                                                                              ]
                                                                                                  .id,
                                                                                          stadiumId:
                                                                                              matches[
                                                                                                  matchId
                                                                                              ]
                                                                                                  .stadium_id
                                                                                      }
                                                                                  );
                                                                                  setOpenReservation(
                                                                                      true
                                                                                  );
                                                                              } else if (
                                                                                  item ===
                                                                                      2 &&
                                                                                  getRole() ===
                                                                                      "fan"
                                                                              ) {
                                                                                  setSeatInfo(
                                                                                      {
                                                                                          row: rindex,
                                                                                          col: cindex,
                                                                                          seatId:
                                                                                              1 +
                                                                                              cindex +
                                                                                              rindex *
                                                                                                  matches[
                                                                                                      matchId
                                                                                                  ]
                                                                                                      .stadium
                                                                                                      .seats_per_row,
                                                                                          matchId:
                                                                                              matches[
                                                                                                  matchId
                                                                                              ]
                                                                                                  .id,
                                                                                          stadiumId:
                                                                                              matches[
                                                                                                  matchId
                                                                                              ]
                                                                                                  .stadium_id
                                                                                      }
                                                                                  );
                                                                                  setReservationCancel(
                                                                                      true
                                                                                  );
                                                                              }
                                                                          }}
                                                                          style={{
                                                                              backgroundColor:
                                                                                  item ===
                                                                                  1
                                                                                      ? "limegreen"
                                                                                      : item ===
                                                                                        0
                                                                                      ? "gray"
                                                                                      : "gold"
                                                                          }}
                                                                          className={
                                                                              classes.paper
                                                                          }
                                                                      >
                                                                          <Typography
                                                                              style={{
                                                                                  textAlign:
                                                                                      "right",
                                                                                  fontSize:
                                                                                      "10px"
                                                                              }}
                                                                          >
                                                                              Row:{" "}
                                                                              {rindex +
                                                                                  1}{" "}
                                                                              <br></br>
                                                                          </Typography>

                                                                          {item ===
                                                                              1 && (
                                                                              <PersonAddIcon />
                                                                          )}
                                                                          {item ===
                                                                              2 && (
                                                                              <PersonAddDisabledIcon />
                                                                          )}

                                                                          <Typography
                                                                              style={{
                                                                                  textAlign:
                                                                                      "left",
                                                                                  fontSize:
                                                                                      "8px"
                                                                              }}
                                                                          >
                                                                              No.:{" "}
                                                                              {cindex +
                                                                                  1 +
                                                                                  rindex *
                                                                                      matches[
                                                                                          matchId
                                                                                      ]
                                                                                          .stadium
                                                                                          .seats_per_row}{" "}
                                                                          </Typography>
                                                                      </Paper>
                                                                  </Tooltip>
                                                              )
                                                          )}
                                                      </Grid>
                                                  );
                                              }
                                          )
                                        : null}
                                </Grid>
                            </DialogContent>
                        </DialogContent>
                        <Reservation
                            setOpenReservation={setOpenReservation}
                            openReservation={openReservation}
                            seatInfo={seatInfo}
                            setMessage={setMessage}
                        ></Reservation>
                        <Cancelation
                            setReservationCancel={setReservationCancel}
                            reservationCancel={reservationCancel}
                            seatInfo={seatInfo}
                            setMessage={setMessage}
                        ></Cancelation>
                    </Dialog>
                ) : null}
            </div>
            <Footer></Footer>
        </React.Fragment>
    );
}
