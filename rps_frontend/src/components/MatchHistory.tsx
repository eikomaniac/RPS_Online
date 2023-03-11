import { FC, useState } from "react";
import { capitalize } from "../Utilities";
import { format } from 'date-fns'

const matchesPerPage = 15;

interface MatchHistoryProps {
  matches: Array<any>;
}

const MatchHistory: FC<MatchHistoryProps> = ({ matches }) => {
  const [page, setPage] = useState(1);
  const maxPages = Math.floor(matches.length/matchesPerPage)+1

  return (<>
    {matches.length > 0 && (<>
    <table className="table table-hover table-condensed table-bordered table-dark table-striped mb-5">
      <thead>
        <tr>
          <th scope="col">You</th>
          <th scope="col">CPU</th>
          <th scope="col">CPU Difficulty</th>
          <th scope="col">Result</th>
          <th scope="col">Match Date</th>
        </tr>
      </thead>
      <tbody>
        {matches.slice((page-1)*matchesPerPage, page*matchesPerPage).map((match, index) => (
            <tr>
            <td>{capitalize(match.userOption)}</td>
            <td>{capitalize(match.cpuOption)}</td>
            <td>{capitalize(match.cpuDifficulty)}</td>
            <td>{capitalize(match.result)}</td>
            <td>{format(new Date(match.matchDate), "yyyy-MM-dd HH:mm:ss")}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <nav>
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <span className="page-link" onClick={() => setPage(p => p-1)}>Previous</span>
        </li>
        {Array.from({length: maxPages}, (x, i) => i+1).map((item) => (<>
          {(item === page) && (
            <li className="page-item active" aria-current="page">
              <span className="page-link">{item}</span>
            </li>
          )}
          {(item !== page) && (
            <li className="page-item"><button className="page-link" onClick={() => setPage(p => item)}>{item}</ button></li>
          )}
        </>))}
        <li className={`page-item ${page === maxPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setPage(p => p+1)}>Next</button>
        </li>
      </ul>
    </nav>
    </>)}
    {matches.length === 0 && (
      <p className="secondary">No recorded matches</p>
    )}
  </>
  );
}

export default MatchHistory;
