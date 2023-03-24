import { useState } from 'react';
import BackButton from '../components/BackButton';
import AiBox from '../components/AiBox';
import axios from "axios";

const Spectate = () => {
  const initStats = {
    wins: 0,
    draws: 0,
    losses: 0,
    option: null,
  };

  const [ai1, setAi1] = useState(initStats);
  const [ai2, setAi2] = useState(initStats);

  const [lastResult, setLastResult] = useState("");

  const spectateCPU = () => {
    setLoadingCPU(true);
    axios.get(`${process.env.REACT_APP_API_URL}/spectate`)
      .then(response => {
        const res = response.data;
        setAi1((s: any) => ({
          ...s,
          option: res.aI1Option
        }));
        setAi2((s: any) => ({
          ...s,
          option: res.aI2Option
        }));
        setLastResult(res.result);

        if (res.result === "draw") {
          setAi1((s: any) => ({
            ...s,
            draws: s.draws + 1
          }));
          setAi2((s: any) => ({
            ...s,
            draws: s.draws + 1
          }));
        } else if (res.result === "win") {
          setAi1((s: any) => ({
            ...s,
            wins: s.wins + 1
          }));
          setAi2((s: any) => ({
            ...s,
            losses: s.losses + 1
          }));
        } else {
          setAi1((s: any) => ({
            ...s,
            losses: s.losses + 1
          }));
          setAi2((s: any) => ({
            ...s,
            wins: s.wins + 1
          }));
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoadingCPU(false);
      });
  }

  const [loadingCPU, setLoadingCPU] = useState(false);

  return (
    <div className="container mt-5">
      <BackButton />
      <div className="d-flex flex-column align-items-center">
        <h1 className="display-5 fw-bold mb-5 title">Spectate</h1>
      </div>
      <div className="row">
        <AiBox session={ai1} aiNum={1} />
        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
          <h2>{lastResult === "win" ? "AI 1 Wins" : lastResult === "loss" ? "AI 2 Wins" : "Draw" }</h2>
          <h1>VS</h1>
          <button onClick={spectateCPU} type="button" className="btn btn-secondary">
            {loadingCPU === false && (<span>Play</span>)}
            {loadingCPU === true && (
              <div className="mr-5 spinner-border-sm spinner-border" role="status" />
            )}
          </button>
        </div>
        <AiBox session={ai2} aiNum={2} />
      </div>
    </div>
  )};

export default Spectate;