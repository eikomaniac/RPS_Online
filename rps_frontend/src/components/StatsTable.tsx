import { FC } from "react";

interface StatsTableProps {
  stats: any;
}

const StatsTable: FC<StatsTableProps> = ({ stats }) => {

  const { wins, draws, losses, winrate, totalGames } = stats;
  console.log(stats);
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
          <td>{Math.round((winrate*100 + Number.EPSILON) * 100) / 100}%</td>
          <td>{totalGames}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default StatsTable;
