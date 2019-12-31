import React from 'react';

interface props {
  setValue: (arg: number | undefined) => any;
}

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NumberInput = ({ setValue }: props) => {
  return (
    <div>
      {values.map(value => (
        <button key={value} onClick={() => setValue(value)}>
          {value}
        </button>
      ))}
      <button onClick={() => setValue(undefined)}>Clear</button>
    </div>
  );
};

export default NumberInput;
