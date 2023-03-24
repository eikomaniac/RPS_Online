import { FC } from "react";
import { IconContext } from "react-icons";
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from "react-icons/fa";
import { AiFillQuestionCircle } from 'react-icons/ai';

interface AiBoxProps {
  session: any;
  aiNum: number;
}

const AiBox: FC<AiBoxProps> = ({ session, aiNum }) => {
  let { wins, draws, losses, option } = session;

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
        <h2 className="mb-5">AI {aiNum}</h2>
        <h2 className="">{wins}-{draws}-{losses}</h2>
        <h4 className="text-secondary mt-n5">W/D/L</h4>
      </div>
    </div>
  );
};

export default AiBox;