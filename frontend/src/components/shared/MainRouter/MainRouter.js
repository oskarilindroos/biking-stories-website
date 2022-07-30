import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";
import MainNavbar from "../MainNavbar/MainNavbar";
import MainFooter from "../MainFooter/MainFooter";
import Home from "../../home-page/Home";
import Users from "../../users-page/Users";
import Stories from "../../stories-page/Stories";
import UserContext from "../../../contexts/UserContext";

const MainRouter = () => {
  const userContext = useContext(UserContext);

  return (
    <Router>
      <div className="content-wrap">
        <MainNavbar />
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/:uid/stories" element={<Stories />} />
        </Routes>
      </div>
      <MainFooter />
    </Router>
  );
};

export default MainRouter;
