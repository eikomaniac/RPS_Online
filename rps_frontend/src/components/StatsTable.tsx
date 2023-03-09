import { FC } from "react";

interface StatsTableProps {
  wins: number;
  draws: number;
  losses: number;
}

const StatsTable: FC<StatsTableProps> = ({ wins, draws, losses }) => {
  const totalGames = wins+draws+losses;
  const winrate = totalGames === 0 ? 0 : (wins + 0.5*draws)/totalGames;
  return (
    <table className="table table-hover table-condensed table-bordered table-dark table-striped w-50 mb-5">
      <thead>
        <tr>
          <th scope="col">Wins</th>
          <th scope="col">Draws</th>
          <th scope="col">Losses</th>
          <th scope="col">Winrate</th>
          <th scope="col">Total Games</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{wins}</td>
          <td>{draws}</td>
          <td>{losses}</td>
          <td>{winrate}%</td>
          <td>{totalGames}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default StatsTable;
