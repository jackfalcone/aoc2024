import React from 'react';
import Day from './components/Day';
import Day01 from './components/Day01';
import Day02 from './components/Day02';

function App() {
  return (
    <div className="App w-screen h-screen bg-black mx-auto">
      <div className="pt-4 mx-auto max-w-lg flex flex-col">
        <h1 className="mb-4 text-4xl text-green-500 text-center font-Audiowide drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]">Advent of Code 2024</h1>
        <Day dayNum="01" />
        <Day01 />
        <Day dayNum="02" />
        <Day02 />
      </div>
    </div>
  );
}

export default App;
