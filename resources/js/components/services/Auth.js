import jwtDecode from "jwt-decode";
import { apiBaseUrl } from "../config.json";
import Axios from "axios";
const tokenKey = "token";
const roleKey = "role";

export async function login(email, password) {
  const { data } = await Axios.post(apiBaseUrl + "user/login", {
    email: email,
    password: password
  });
  if (data.token) {
    saveToken(data.token);
    return true;
  }
  return false;
}

export function saveToken(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function saveRole(role) {
  localStorage.setItem(roleKey, role);
}

export async function logout() {
  Axios.get(apiBaseUrl + "logout/", {
    headers: { Authorization: "Bearer " + getToken() }
  });
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(roleKey);
  //window.location.reload();
  //const history = useHistory();
  //history.push("/");
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function getRole() {
  return localStorage.getItem(roleKey);
}

export function isAuth() {
  return (
    localStorage.getItem(tokenKey) &&
    jwtDecode(localStorage.getItem(tokenKey)).exp * 1000 >= Date.now()
  );
}
// eslint-disable-next-line
export default {
  login,
  logout,
  isAuth,
  getToken,
  getRole,
  saveRole
};
