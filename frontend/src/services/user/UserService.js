import axios from "axios";
import { useContext } from "react";

const baseUrl = "https://localhost:5000/api/users";

const getAllUsers = async () => {};

export const signup = async (user, setError) => {
  console.log(user);
};

export const login = async (user, login, setError) => {
  //Login api request catch error, setError(error)
  login("placeholdertoken");
};
