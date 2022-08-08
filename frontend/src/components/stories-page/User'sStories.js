import { useParams } from "react-router-dom";
import StoriesTable from "./StoriesTable";

const UserStories = () => {
  const params = useParams();
  const uid = params.uid; // Get the uid from the url params
  return <StoriesTable endpoint={`stories/user/${uid}`} />;
};

export default UserStories;
