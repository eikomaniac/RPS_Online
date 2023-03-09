import { FC } from 'react';
import BackButton from '../components/BackButton';
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from "react-icons/fa";
import RPSButton from './RPSButton';

interface RPSGameProps {
  difficulty: string;
}

const RPSGame: FC<RPSGameProps> = ({ difficulty }) => {
  const capitalize = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="container mt-5">
      <BackButton />
      <div className="row">
        <div className="col-5">
          <div className="player-box">
            <h2>You</h2>
            <RPSButton icon={<FaRegHandRock />} option="rock" />
            <RPSButton icon={<FaRegHandPaper />} option="paper" />
            <RPSButton icon={<FaRegHandScissors />} option="scissors" />
          </div>
        </div>
        <div className="col-2 d-flex justify-content-center align-items-center">
          <h1>VS</h1>
        </div>
        <div className="col-5">
          <div className="player-box">
            <h2>{capitalize(difficulty)}</h2>
            {/* Render player two's choice here */}
          </div>
        </div>
      </div>
    </div>
  )};

export default RPSGame;