import axios from "axios";

const API_URL = "/api/users/";

/**
 * Registering User
 *
 * @result saves 'user' in localStorage
 */
const register = (name, email, password, passwordConfirm) => {
  return axios
    .post(API_URL + "signup", {
      name,
      email,
      password,
      passwordConfirm,
    })
    .then((response) => {
      if (response.data.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      return response.data;
    });
};

/**
 * Logging user In and saving user info
 * in localStorage
 */
const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  //   return axios.post(API_URL + "signout").then((response) => {
  //     return response.data;
  //   });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
