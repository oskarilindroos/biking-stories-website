import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

import MainRouter from "./components/shared/MainRouter/MainRouter";
import { UserProvider } from "./contexts/UserContext";

// base url for all api calls
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App = () => {
  return (
    <main className="page-container">
      <UserProvider>
        <MainRouter />
      </UserProvider>
    </main>
  );
};

export default App;
