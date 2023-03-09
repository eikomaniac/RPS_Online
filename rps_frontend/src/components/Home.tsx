import CardButton from "../components/CardButton";
import { FaUsers } from "react-icons/fa";
import { IoIosStats } from "react-icons/io"

const Home = () => {
  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1 className="display-5 fw-bold mb-5">Welcome to RPS Online!</h1>
      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <CardButton linkTo="/play"
            icon={<FaUsers />}
            title="Play"
            subtitle="Play versus a computer"
          />
        </div>
        <div className="col-md-6">
          <CardButton linkTo="/stats"
            icon={<IoIosStats />}
            title="Stats"
            subtitle="View your statistics"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;