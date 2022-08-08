import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import MainNavbar from "../MainNavbar/MainNavbar";
import MainFooter from "../MainFooter/MainFooter";
import Home from "../../home-page/Home";
import Users from "../../users-page/Users";
import UserStories from "../../stories-page/User'sStories";
import Stories from "../../stories-page/Stories";
import NewStory from "../../newstory-page/NewStory";
import EditStory from "../../editstory-page/EditStory";

const MainRouter = () => {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <div className="content-wrap">
        <MainNavbar />
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/:uid/stories" element={<UserStories />} />
          <Route path="/stories" element={<Stories />} />
          {user.isLoggedIn && (
            <>
              <Route path="/stories/new" element={<NewStory />} />
              <Route path="/stories/:storyid" element={<EditStory />} />
            </>
          )}
        </Routes>
      </div>
      <MainFooter />
    </Router>
  );
};

export default MainRouter;
