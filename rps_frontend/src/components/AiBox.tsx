import { IconContext } from "react-icons";
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from "react-icons/fa";
import { AiFillQuestionCircle } from 'react-icons/ai';

const AiBox = (aiSession: any) => {
  const { wins, draws, losses, option } = aiSession;

  const showOption = (option: string | null) => {
    switch (option) {
      case "rock":
        return <FaRegHandRock />
      case "paper":
        return <FaRegHandPaper />
      case "scissors":
        return <FaRegHandScissors />
      default:
        return <AiFillQuestionCircle />
    }
  }

  return (
    <div className="col-5">
      <div className="player-box d-flex flex-column">
        <div className="flex-grow-1">
          <IconContext.Provider value={{className: "mt-5 w-100 align-self-start", style: { height: 150 }}}>
            {showOption(option)}
          </IconContext.Provider>
        </div>
        <h2 className="mb-5">AI 2</h2>
        <h2 className="">{wins}-{draws}-{losses}</h2>
        <h4 className="text-secondary mt-n5">W/D/L</h4>
      </div>
    </div>
  );
};

export default AiBox;