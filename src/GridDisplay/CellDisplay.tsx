import React from 'react';
import { Cell } from '../grid';
import styles from './CellDisplay.module.css';

interface props {
  value: Cell;
  setActiveCell: () => any;
  active: boolean;
}

const CellDisplay = ({ value, setActiveCell, active }: props) => {
  const styleList = [
    styles.cell,
    value.invalid && styles.invalid,
    active && styles.active
  ];
  const appliedStyles = styleList.join(' ');
  return (
    <div className={appliedStyles} onClick={setActiveCell}>
      {value.value}
    </div>
  );
};

export default CellDisplay;
