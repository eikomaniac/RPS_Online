import { FC, ReactElement } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IconContext } from "react-icons";

interface RPSButtonProps {
  icon: ReactElement;
  option: string;
  difficulty: string;
  setSession: Function;
  loadingCPU: boolean;
  setLoadingCPU: Function,
  setLastResult: Function
}

interface Session {
  wins: number;
  draws: number;
  losses: number;
  userOption: string | null;
  cpuOption: string | null;
}

const RPSButton: FC<RPSButtonProps> = ({ icon, option, difficulty, setSession, loadingCPU, setLoadingCPU, setLastResult }) => {
  const determineWinner = (userOption: string | null, cpuOption: string | null) => {
    if (userOption == null || cpuOption == null ) return;
    const options = ["rock", "paper", "scissors"];

    const userOptionIdx = options.indexOf(userOption);
    const cpuOptionIdx = options.indexOf(cpuOption);

    const diff = (userOptionIdx - cpuOptionIdx + 3) % 3;

    switch (diff) {
      case 0:
        setLastResult("draw");
        break;
      case 1:
        setLastResult("win");
        break;
      case 2:
        setLastResult("loss");
        break;
    }
  }
  const requestCPUresponse = () => {
    setLoadingCPU(true);
    setSession((s: Session) => ({
      ...s,
      userOption: option
    }));

    const data = {
      userId: 1, // ! hard coded for now
      cpuDifficulty: difficulty,
      userOption: option,
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    axios.post(`${process.env.REACT_APP_API_URL}/play`, data, { headers })
      .then((response: AxiosResponse) => {
        const res = response.data;
        setSession((s: Session) => ({
          ...s,
          cpuOption: res.cpuOption
        }))
        determineWinner(option, res.cpuOption);
        switch (res.result) {
          case "win":
            setSession((s: Session) => ({
              ...s,
              wins: s.wins + 1
            }));
            break;
          case "draw":
            setSession((s: Session) => ({
              ...s,
              draws: s.draws + 1
            }));
            break;
          case "loss":
            setSession((s: Session) => ({
              ...s,
              losses: s.losses + 1
            }));
            break;
        }
      })
      .catch((error: Error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingCPU(false);
      });
  }

  return (
    <button
      className={`rps-btn btn btn-dark ${loadingCPU ? "disabled" : ""}`}
      onClick={requestCPUresponse}>
        <IconContext.Provider value={{style: { width:100, height:100}}}>
          {icon}
        </IconContext.Provider>
    </button>
  )};

export default RPSButton;