import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

import MainRouter from "./components/shared/MainRouter/MainRouter";
import { UserProvider } from "./contexts/UserContext";

// base url for all api calls
axios.defaults.baseURL = "http://localhost:5000/api/";

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
