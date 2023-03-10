import { FC, useState } from "react";
import { usePopper } from 'react-popper';

interface StatsTableProps {
  stats: any;
}

const StatsTable: FC<StatsTableProps> = ({ stats }) => {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  const { wins, draws, losses, winrate, totalGames } = stats;
  console.log(stats);
  return (<>
    <table className="table table-hover table-condensed table-bordered table-dark table-striped w-50 mb-5">
      <thead>
        <tr>
          <th scope="col">Wins</th>
          <th scope="col">Draws</th>
          <th scope="col">Losses</th>
          <th scope="col" ref={setReferenceElement}>Winrate</th>
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
    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      Popper element
      <div ref={setArrowElement} style={styles.arrow} />
    </div>
  </>
  );
}

export default StatsTable;
