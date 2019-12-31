import React, { useState } from 'react';
import GridDisplay from '../GridDisplay';
import {
  Grid,
  emptyGrid,
  seedGrid,
  hasInvalidValue,
  setCellValue,
  Index
} from '../grid';
import NumberInput from '../NumberInput';

const GameController = () => {
  const [grid, setGrid] = useState<Grid>(emptyGrid);
  const [activeCell, setActiveCell] = useState<[number, number] | undefined>(
    undefined
  );

  const startNewGame = () => {
    const newGrid = seedGrid(10);
    setGrid(newGrid);
  };

  const invalid = hasInvalidValue(grid);

  const setValue = (value: number | undefined) => {
    if (activeCell) {
      const [col, row] = activeCell as [Index, Index];
      const newGrid = setCellValue(grid, col, row, value);
      setGrid(newGrid);
    }
  };

  return (
    <>
      <p>Status: {invalid ? 'invalid' : 'ok'} </p>
      <button onClick={startNewGame}>New Game</button>
      <GridDisplay
        grid={grid}
        setActiveCell={setActiveCell}
        activeCell={activeCell}
      />
      <NumberInput setValue={setValue} />
    </>
  );
};

export default GameController;
