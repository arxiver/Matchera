import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import { isAuth, getToken } from "../../services/Auth";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Axios from "axios";
import { apiBaseUrl } from "../../config.json";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white"
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const emptyUser = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
  birthday: "",
  gender: "male",
  role: "fan",
  city: "",
  address: ""
};
export default function EditProfile() {
  const classes = useStyles();
  const [user, setUser] = useState(emptyUser);
  const [errorMessages, setErrorMessages] = useState({});
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = React.useState(isAuth());
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    // fetch user data
    const token = getToken();
    if (token === null) return;
    Axios.get(apiBaseUrl + "fan/informations", {
      headers: { Authorization: "Bearer " + token }
    }).then((res) => {
      if (res.data.user) {
        setUser(res.data.user);
        setLoading(false);
      }
    });
  }, []);

  const feildChange = (e) => {
    setErrorMessages({ ...errorMessages, [e.target.name]: "" });
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await Axios.post(apiBaseUrl + "fan/update", user, {
      headers: { Authorization: "Bearer " + getToken() }
    });
    if (res.data.message) {
      setOpen(true);
    } else {
      setErrorMessages(res.data);
    }
  };
  if (!auth) return <Redirect to="/" />;

  return (
    <div>
      <Header auth={auth} setAuth={setAuth}></Header>
      <Container className={classes.container}>
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Information
            </Typography>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Snackbar
                    open={open}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={6000}
                    onClose={() => {
                      setOpen(false);
                    }}
                  >
                    <Alert
                      onClose={() => {
                        setOpen(false);
                      }}
                      severity="success"
                    >
                      Updated Successfully congrats!
                    </Alert>
                  </Snackbar>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="first_name"
                      variant="outlined"
                      required
                      value={user.first_name || ""}
                      error={errorMessages.first_name}
                      helperText={
                        errorMessages.first_name
                          ? errorMessages.first_name[0]
                          : ""
                      }
                      onChange={feildChange}
                      fullWidth
                      id="first_name"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      value={user.last_name || ""}
                      onChange={feildChange}
                      fullWidth
                      error={errorMessages.last_name}
                      helperText={
                        errorMessages.last_name
                          ? errorMessages.last_name[0]
                          : ""
                      }
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      disabled
                      value={user.email || ""}
                      error={errorMessages.email}
                      helperText={
                        errorMessages.email ? errorMessages.email[0] : ""
                      }
                      onChange={feildChange}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      disabled
                      value={user.username || ""}
                      error={errorMessages.username}
                      helperText={
                        errorMessages.username ? errorMessages.username[0] : ""
                      }
                      onChange={feildChange}
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      error={errorMessages.password}
                      helperText={
                        errorMessages.password ? errorMessages.password[0] : ""
                      }
                      fullWidth
                      onChange={feildChange}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      onChange={feildChange}
                      fullWidth
                      error={errorMessages.password}
                      helperText={
                        errorMessages.password ? errorMessages.password[0] : ""
                      }
                      name="password_confirmation"
                      label="Password Confirm"
                      type="password"
                      id="password_confirmation"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="city"
                      required
                      value={user.city || ""}
                      error={errorMessages.city}
                      helperText={
                        errorMessages.city ? errorMessages.city[0] : ""
                      }
                      onChange={feildChange}
                      label="City"
                      type="city"
                      id="city"
                      autoComplete="city"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      onChange={feildChange}
                      fullWidth
                      value={user.address || ""}
                      error={errorMessages.address}
                      helperText={
                        errorMessages.address ? errorMessages.address[0] : ""
                      }
                      name="address"
                      label="Address"
                      type="string"
                      id="address"
                      autoComplete="address"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <form className={classes.container} noValidate>
                      <TextField
                        id="date"
                        fullWidth
                        onChange={feildChange}
                        label="Birthday"
                        value={user.birthday}
                        error={errorMessages.birthday}
                        helperText={
                          errorMessages.birthday
                            ? errorMessages.birthday[0]
                            : ""
                        }
                        type="date"
                        name="birthday"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </form>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="genderselect"
                        id="gender"
                        name="gender"
                        value={user.gender || ""}
                        onChange={(e) => {
                          setUser({ ...user, gender: e.target.value });
                        }}
                        input={<Input />}
                      >
                        <MenuItem key="male" value="male">
                          Male
                        </MenuItem>
                        <MenuItem key="female" value="female">
                          Female
                        </MenuItem>
                        <MenuItem key="other" value="other">
                          Other
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  onClick={handleUpdate}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update Information
                </Button>
                <Grid container justify="center"></Grid>
              </form>
            )}
          </div>
        </Container>
      </Container>
      {!loading && <Footer></Footer>}
    </div>
  );
}
