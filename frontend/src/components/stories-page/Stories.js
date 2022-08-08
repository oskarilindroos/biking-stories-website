import { Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";
import StoriesTable from "./StoriesTable";
import { UserContext } from "../../contexts/UserContext";

const Stories = () => {
  const { user } = useContext(UserContext);
  return (
    <Container>
      <div className="row">
        <h3 className="col text-left">All stories</h3>
        {user.isLoggedIn && (
          <div className="col">
            <Link to="/stories/new">
              <Button variant="success" className="float-end">
                New Story
              </Button>
            </Link>
          </div>
        )}
      </div>
      <hr />
      <StoriesTable endpoint="/stories/" />
    </Container>
  );
};

export default Stories;
