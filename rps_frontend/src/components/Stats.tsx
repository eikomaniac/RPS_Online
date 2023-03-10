import { useEffect, useState } from "react";
import StatsTable from "../components/StatsTable";
import axios from 'axios';

interface StatsType {
  wins: number;
  draws: number;
  losses: number;
  winrate: number;
  totalGames: number;
}
interface DifficultyStats {
  beginnerStats: StatsType;
  intermediateStats: StatsType;
  advancedStats: StatsType;
  matchHistory: Array<object>;
}

const Stats = () => {
  const initStats = {
    wins: 0,
    draws: 0,
    losses: 0,
    winrate: 0,
    totalGames: 0,
  }
  const [response, setResponse] = useState<DifficultyStats>({
    beginnerStats: initStats,
    intermediateStats: initStats,
    advancedStats: initStats,
    matchHistory: []
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/stats/${1}`) // ! hard-coded user id for now
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1 className="display-5 fw-bold mb-5">Player Statistics</h1>

      <h2>Stats vs. <b>Beginner</b></h2>
      <StatsTable stats={response.beginnerStats} />
      <h2>Stats vs. <b>Intermediate</b></h2>
      <StatsTable stats={response.intermediateStats} />
      <h2>Stats vs. <b>Advanced</b></h2>
      <StatsTable stats={response.advancedStats} />
      <h2>Match History</h2>
      <nav>
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Previous</span>
          </li>
          <li className="page-item"><button className="page-link" onClick={() => console.log()}>1</ button></li>
          <li className="page-item active" aria-current="page">
            <span className="page-link">2</span>
          </li>
          <li className="page-item"><button className="page-link" onClick={() => console.log()}>3</button></li>
          <li className="page-item">
            <button className="page-link" onClick={() => console.log('hi')}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Stats;
