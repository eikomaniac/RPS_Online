import CardButton from "../components/CardButton";
import BackButton from "../components/BackButton";
import { FaHandScissors } from "react-icons/fa";
import { BsCpuFill } from "react-icons/bs"

const SelectGamemode = () => {
  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <BackButton />
      <h1 className="display-5 fw-bold mb-5 title">Select Gamemode</h1>
      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <CardButton linkTo="/play-cpu"
            icon={<FaHandScissors />}
            title="Play vs. CPU"
            subtitle="Play versus a computer"
          />
        </div>
        <div className="col-md-6">
          <CardButton linkTo="/spectate"
            icon={<BsCpuFill />}
            title="CPU vs. CPU"
            subtitle="Spectate a CPU game"
          />
        </div>
      </div>
    </div>
  );
}

export default SelectGamemode;