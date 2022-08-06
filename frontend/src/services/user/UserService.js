import axios from "axios";
import { useContext } from "react";

const baseUrl = "http://localhost:5000/api/users";

//const getAllUsers = async () => {};

export const signup = async (user, setError) => {
  try {
    const response = await axios.post(baseUrl + "/signup", user);
    return response;
  } catch (error) {
    setError(error.response.data);
    //console.log(error.response.data);
    return error;
  }
};

export const login = async (user, login, setError) => {
  //Login api request catch error, setError(error)
  login("placeholdertoken");
};
