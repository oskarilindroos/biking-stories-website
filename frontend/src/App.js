import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useCallback } from "react";
import "./App.css";

import MainRouter from "./components/shared/MainRouter/MainRouter";
import UserContext from "./contexts/UserContext";

const App = () => {
  const [token, setToken] = useState("");

  const login = useCallback((token) => {
    setToken(token);
    localStorage.setItem("token", token); // Save token to localStorage TODO: Save token to cookie?
    console.log(`Logged in, token: ${token}`);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear(); // Clear localstorage to delete the token
    setToken(null); // Also set token to null so that page reload is not needed
    console.log(`Logged out`);
  }, []);

  return (
    <main className="page-container">
      <UserContext.Provider
        value={{
          token: token,
          login: login,
          logout: logout,
        }}
      >
        <MainRouter />
      </UserContext.Provider>
    </main>
  );
};

export default App;
