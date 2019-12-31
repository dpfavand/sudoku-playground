import React from 'react';
import './App.css';
import GameController from './GameController';

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1>Sudoku</h1>
      <GameController />
    </div>
  );
};

export default App;
