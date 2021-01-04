import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Redirect, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useState } from "react";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import { isAuth } from "../../services/Auth";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Axios from "axios";
import { apiBaseUrl } from "../../config.json";

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
export default function SignUp() {
  const classes = useStyles();
  const [user, setUser] = useState(emptyUser);
  const [errorMessages, setErrorMessages] = useState({});
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = React.useState(isAuth());

  if (isAuth()) return <Redirect to="/" />;
  const feildChange = (e) => {
    setErrorMessages({ ...errorMessages, [e.target.name]: "" });
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await Axios.post(apiBaseUrl + "user/register", user);
    if (res.data.message) {
      setOpen(true);
      // success show out the message of
      // You must wait till the adminstator verify you
    } else {
      setErrorMessages(res.data);
    }
  };
  if (auth) return <Redirect to="/" />;

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
              Sign up
            </Typography>
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
                    Success congrats! You must wait till the adminstator verify
                    you!
                  </Alert>
                </Snackbar>

                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
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
                    onChange={feildChange}
                    fullWidth
                    error={errorMessages.last_name}
                    helperText={
                      errorMessages.last_name ? errorMessages.last_name[0] : ""
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
                    error={errorMessages.city}
                    helperText={errorMessages.city ? errorMessages.city[0] : ""}
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

                <Grid item xs={12} sm={4}>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="date"
                      fullWidth
                      onChange={feildChange}
                      label="Birthday"
                      error={errorMessages.birthday}
                      helperText={
                        errorMessages.birthday ? errorMessages.birthday[0] : ""
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
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="genderselect"
                      id="gender"
                      error={errorMessages.gender}
                      helperText={
                        errorMessages.gender ? errorMessages.gender[0] : ""
                      }
                      name="gender"
                      value={user.gender}
                      onChange={(e) => {
                        setErrorMessages({ ...errorMessages, gender: "" });
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
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-select"
                      name="role"
                      error={errorMessages.role}
                      helperText={
                        errorMessages.role ? errorMessages.role[0] : ""
                      }
                      value={user.role}
                      onChange={(e) => {
                        setErrorMessages({ ...errorMessages, role: "" });
                        setUser({ ...user, role: e.target.value });
                      }}
                      input={<Input />}
                    >
                      <MenuItem key="fan" value="fan">
                        Fan
                      </MenuItem>
                      <MenuItem key="manager" value="manager">
                        Manager
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                onClick={handleSignup}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Container>
      <Footer></Footer>
    </div>
  );
}
