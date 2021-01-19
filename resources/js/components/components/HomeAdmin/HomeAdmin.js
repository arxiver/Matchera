import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { apiBaseUrl } from "../../config.json";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { getToken, isAuth, logout, getRole } from "../../services/Auth";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function HomeAdmin() {
  const history = useHistory();
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);
  // delete user (table) response OK!
  const [users, setUsers] = useState([]);
  const approveUser = (id, index) => {
    Axios.get(
      apiBaseUrl + "admin/verify/user/" + id.toString(),

      {
        headers: { Authorization: "Bearer " + getToken() }
      }
    )
      .then((res) => {
        if (!isAuth()) {
          logout();
          return history.push("/admin/login/");
        }
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeUser = (id, index) => {
    Axios.get(
      apiBaseUrl + "admin/remove/user/" + id.toString(),

      {
        headers: { Authorization: "Bearer " + getToken() }
      }
    )
      .then((res) => {
        if (!isAuth()) {
          logout();
          return history.push("/admin/login/");
        }
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
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

    Axios.get(apiBaseUrl + "admin/users/", {
      headers: { Authorization: "Bearer " + getToken() }
    }).then((res) => {
      if (res.data.users) {
        setUsers(res.data.users);
      } else {
      }
    });
    console.log("loading...");
    return () => clearInterval(interval);
  }, [refresh, history]);

  if (getRole() === "fan") {
    history.push("/");
  }
  if (getRole() === "manager") {
    history.push("/home/manager/");
  }
  if (getRole() !== "admin") {
    history.push("/admin/login/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Admin
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              logout();
              history.push("/admin/login/");
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
            <TableCell align="center">FirstName</TableCell>
            <TableCell align="center">LastName</TableCell>
            <TableCell align="center">UserName</TableCell>
            <TableCell align="center">role</TableCell>
            <TableCell align="center">approve</TableCell>
            <TableCell align="center">remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.first_name}</TableCell>
              <TableCell align="center">{row.last_name}</TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.role}</TableCell>

              {row.email_verified_at == null ? (
                <TableCell
                  align="center"
                  onClick={() => approveUser(row.id, index)}
                >
                  {" "}
                  <CheckIcon />
                </TableCell>
              ) : (
                <TableCell align="center"> </TableCell>
              )}

              <TableCell
                align="center"
                onClick={() => removeUser(row.id, index)}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
