import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { logout, getRole } from "../../services/Auth";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header({ auth, setAuth }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ cursor: "pointer" }}
            onClick={(e) => history.push("/")}
          >
            Matchera
          </Typography>
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                {getRole() === "fan" && (
                  <MenuItem
                    onClick={(e) => {
                      history.push("/profile");
                    }}
                  >
                    Edit Profile
                  </MenuItem>
                )}
                <MenuItem
                  onClick={(e) => {
                    logout();
                    setAuth(false);
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                onClick={(e) => {
                  history.push("/login");
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={(e) => {
                  history.push("/register");
                }}
              >
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
