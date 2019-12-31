import React from 'react';
import { Grid } from '../grid';
import CellDisplay from './CellDisplay';
import styles from './GridDisplay.module.css';

interface props {
  grid: Grid;
  setActiveCell: (indexes: [number, number]) => any;
  activeCell: [number, number] | undefined;
}

const GridDisplay = ({ grid, setActiveCell, activeCell }: props) => (
  <>
    <table className={styles.table}>
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td
                key={colIndex}
                className={`${styles.cell} ${[2, 5].includes(rowIndex) &&
                  styles.bottomBorder} ${[2, 5].includes(colIndex) &&
                  styles.rightBorder}`}
              >
                <CellDisplay
                  value={cell}
                  setActiveCell={() => setActiveCell([colIndex, rowIndex])}
                  active={
                    (activeCell &&
                      activeCell[0] === colIndex &&
                      activeCell[1] === rowIndex) ||
                    false
                  }
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default GridDisplay;
