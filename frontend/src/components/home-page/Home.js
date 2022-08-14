import { Container } from "react-bootstrap";
import StoryCard from "./StoryCard/StoryCard";
import cyclist from "./images/cyclist.jpg";

const Home = () => {
  return (
    <Container>
      <div className="text-center">
        <h3>Our Bicycle Touring Stories</h3>
        <h5>
          Welcome to a website all about sharing our users' bicycling stories!
        </h5>
        <br />
        <img
          className="rounded-circle"
          width="300px"
          height="260px"
          src={cyclist}
          alt="man holding a bike"
        />
      </div>
      <br />
      <hr />
      <h3 className="text-center">Stories</h3>
      <br />
      <div className="row">
        <div className="col-sm-6">
          <StoryCard />
        </div>
        <div className="col-sm-6">
          <StoryCard />
        </div>
      </div>
      <br />
    </Container>
  );
};

export default Home;
