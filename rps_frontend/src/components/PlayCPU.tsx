import CardButton from "./CardButton";
import BackButton from "./BackButton";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"
import { BsFillPersonFill, BsSunglasses } from "react-icons/bs";

const PlayCPU = () => {
  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <BackButton />
      <h1 className="display-5 fw-bold mb-5 title">Select Gamemode</h1>
      <div className="row align-items-md-stretch">
        <div className="col-md-4">
          <CardButton linkTo="/play-cpu/beginner"
            icon={<GiPerspectiveDiceSixFacesRandom />}
            title="Beginner"
            subtitle="Random strategy"
          />
        </div>
        <div className="col-md-4">
          <CardButton linkTo="/play-cpu/intermediate"
            icon={<BsFillPersonFill />}
            title="Intermediate"
            subtitle="Human-like strategy"
          />
        </div>
        <div className="col-md-4">
          <CardButton linkTo="/play-cpu/advanced"
            icon={<BsSunglasses />}
            title="Advanced"
            subtitle="Agent-based strategy"
          />
        </div>
      </div>
    </div>
  );
}

export default PlayCPU;