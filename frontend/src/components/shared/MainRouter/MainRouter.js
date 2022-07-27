import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainNavbar from '../MainNavbar/MainNavbar';
import MainFooter from '../MainFooter/MainFooter';
import Home from "../../home-page/Home";
import Users from "../../users-page/Users";
import Stories from "../../stories-page/Stories";

const MainRouter = () => {

    return (
        <Router>
            <div className="content-wrap">
                <MainNavbar />
                <Routes>
                    <Route path="/*" element={<Navigate to="/" />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/:uid/stories" element={<Stories />} /> {/*TODO: Change :fullname to :_uid */}
                </Routes>
            </div>
            <MainFooter />
        </Router>
    );
}

export default MainRouter;