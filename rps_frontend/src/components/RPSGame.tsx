import { FC, useState } from 'react';
import BackButton from '../components/BackButton';
import { FaRegHandRock, FaRegHandPaper, FaRegHandScissors } from "react-icons/fa";
import RPSButton from './RPSButton';
import { IconContext } from 'react-icons';
import { AiFillQuestionCircle } from 'react-icons/ai';

interface RPSGameProps {
  difficulty: string;
}

const RPSGame: FC<RPSGameProps> = ({ difficulty }) => {
  const capitalize = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [session, setSession] = useState({
    wins: 0,
    draws: 0,
    losses: 0,
    userOption: null,
    cpuOption: null
  })

  const [lastResult, setLastResult] = useState("");

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

  const [loadingCPU, setLoadingCPU] = useState(false);

  return (
    <div className="container mt-5">
      <BackButton />
      <div className="d-flex flex-column align-items-center">
        <h1 className="display-5 title">{session.wins}-{session.draws}-{session.losses}</h1>
        <h3 className="text-secondary mt-n5">W/D/L</h3>
      </div>
      <div className="row">
        <div className="col-5">
          <div className="player-box d-flex flex-column justify-content-between align-items-center">
            <div className="flex-grow-1">
              <IconContext.Provider value={{className: "mt-4 w-100 align-self-start flex-grow-1", style: { height: 150 }}}>
                {showOption(session.userOption)}
              </IconContext.Provider>
            </div>
            <h2 className="align-self-end w-100">(You)</h2>
            <div className="align-self-end w-100">
              <RPSButton icon={<FaRegHandRock />} option="rock" difficulty={difficulty} setSession={setSession} setLoadingCPU={setLoadingCPU} setLastResult={setLastResult} />
              <RPSButton icon={<FaRegHandPaper />} option="paper" difficulty={difficulty} setSession={setSession} setLoadingCPU={setLoadingCPU} setLastResult={setLastResult} />
              <RPSButton icon={<FaRegHandScissors />} option="scissors" difficulty={difficulty} setSession={setSession} setLoadingCPU={setLoadingCPU} setLastResult={setLastResult} />
            </div>
          </div>
        </div>
        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
          <h1>{capitalize(lastResult)}</h1>
          <h1>VS</h1>
        </div>
        <div className="col-5">
          <div className="player-box d-flex flex-column">
            <div className="flex-grow-1">
              {loadingCPU === true && (
                <div className="spinner-border mt-5" role="status" />
              )}
              {loadingCPU === false && (
                <IconContext.Provider value={{className: "mt-5 w-100 align-self-start", style: { height: 150 }}}>
                  {showOption(session.cpuOption)}
                </IconContext.Provider>
              )}
            </div>
            <h2 className="mb-5">{capitalize(difficulty)} AI</h2>
          </div>
        </div>
      </div>
    </div>
  )};

export default RPSGame;