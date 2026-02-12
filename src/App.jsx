import { useState } from 'react';

function App() {
  const [grid, setGrid] = useState(Array(9).fill(0));

  const applyRipple = (grid, index, visited = new Set()) => {
    // Prevent infinite loops from circular ripples
    const key = `${index}-${grid[index]}`;
    if (visited.has(key)) return;
    visited.add(key);

    const value = grid[index];

    // Rule A: Divisible by 3 -> decrease right neighbour
    // Constraint: Not if last column (indices 2, 5, 8)
    if (value % 3 === 0 && value !== 0) {
      if ((index + 1) % 3 !== 0) {
        const rightIndex = index + 1;
        if (grid[rightIndex] < 15) {
          grid[rightIndex] = grid[rightIndex] - 1;
          // Cascade: check if the neighbor's new value triggers further ripples
          applyRipple(grid, rightIndex, visited);
        }
      }
    }

    // Rule B: Divisible by 5 -> increase bottom neighbour
    // Constraint: Not if bottom row (indices 6, 7, 8)
    if (value % 5 === 0 && value !== 0) {
      if (index < 6) {
        const bottomIndex = index + 3;
        if (grid[bottomIndex] < 15) {
          grid[bottomIndex] = grid[bottomIndex] + 2;
          // Cascade: check if the neighbor's new value triggers further ripples
          applyRipple(grid, bottomIndex, visited);
        }
      }
    }
  };

  const handleBoxClick = (index) => {
    // Locked check: If the clicked box is >= 15, do nothing
    if (grid[index] >= 15) return;

    const newGrid = [...grid];
    newGrid[index] = newGrid[index] + 1;

    // Apply ripple effects starting from the clicked box, cascading to neighbors
    applyRipple(newGrid, index);

    setGrid(newGrid);
  };

  const getBoxStyle = (value) => {
    // Locked State
    if (value >= 15) {
      return 'bg-red-500 text-white cursor-not-allowed';
    }
    // Odd Numbers
    if (value % 2 !== 0) {
      return 'bg-[#1a237e] text-white cursor-pointer';
    }
    // Even Numbers
    return 'bg-[#e0e0e0] text-black cursor-pointer';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 font-sans">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1a237e]">
          Ripple Grid
        </h1>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="grid grid-cols-3 gap-4 mb-2">
          {grid.map((value, index) => (
            <div
              key={index}
              onClick={() => handleBoxClick(index)}
              className={`
                w-24 h-24 flex items-center justify-center 
                text-3xl font-bold rounded-[4px]
                transition-all duration-200 select-none
                shadow-[2px_2px_0px_black]
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                ${getBoxStyle(value)}
              `}
            >
              {value}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 max-w-md text-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
        <h2 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Rules</h2>
        <ul className="text-xs text-gray-600 space-y-1 text-left list-disc list-inside px-4">
          <li>Click to increment numbers.</li>
          <li><span className="font-semibold text-blue-800">Divisible by 3:</span> Decrements right neighbour.</li>
          <li><span className="font-semibold text-blue-800">Divisible by 5:</span> Increments bottom neighbour.</li>
          <li>Reach <span className="font-bold text-red-600">15</span> to lock the box and it can't be changed.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
