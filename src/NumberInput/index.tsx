import React from 'react';
import styles from './NumberInput.module.css';

interface props {
  setValue: (arg: number | undefined) => any;
}

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NumberInput = ({ setValue }: props) => {
  return (
    <div className={styles.buttonContainer}>
      {values.map(value => (
        <button
          key={value}
          onClick={() => setValue(value)}
          className={styles.button}
        >
          {value}
        </button>
      ))}
      <button onClick={() => setValue(undefined)} className={styles.button}>
        Clear
      </button>
    </div>
  );
};

export default NumberInput;
