import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Redirect, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { apiBaseUrl } from "../../config.json";
import Axios from "axios";
import { saveToken, isAuth, saveRole } from "../../services/Auth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        heigh: "100%",
        backgroundColor: "white"
    },
    paper: {
        width: "100%",
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function Login({ type }) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = React.useState(isAuth());
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async e => {
        if (auth) {
            history.push("/");
            return;
        }
        try {
            e.preventDefault();
            const endpointUrl = type
                ? apiBaseUrl + "admin/login/"
                : apiBaseUrl + "user/login/";
            const { data } = await Axios.post(endpointUrl, {
                email: email,
                username: email,
                password: password
            });
            if (data.token) {
                if (type) {
                    saveToken(data.token);
                    saveRole("admin");
                    setAuth(true);
                } else if (!type && data.verified) {
                    saveToken(data.token);
                    saveRole(data.role);
                    setAuth(true);
                } else {
                    setErrorMessage(
                        "Sorry " +
                            data.first_name +
                            " your account is not verified yet!"
                    );
                    setErrorOpen(true);
                }
            } else {
                setErrorMessage(data.auth);
                setErrorOpen(true);
            }
        } catch (err) {
            console.log(err.response);
            setErrorMessage(err.response.data.message);
            setErrorOpen(true);
        }
    };
    if (auth) return <Redirect to="/" />;

    return (
        <div>
            <Header auth={auth} setAuth={setAuth}></Header>
            <Container className={classes.container}>
                <Container maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} onSubmit={handleLogin}>
                            <Collapse in={errorOpen}>
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setErrorOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {errorMessage}
                                </Alert>
                            </Collapse>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                                id="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid container justify="center">
                                    <Link to="/register" variant="body2">
                                        Don't have an account? Sign Up
                                    </Link>
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
