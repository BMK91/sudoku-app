import { useCallback, useRef, useState } from "react";
import "./SudokuApp.css";

const n = 4;

const generateGrid = (n = 4) => {
  let t = Array.from({ length: n }).map((_, i) => i + 1);

  return Array.from({ length: n }, () => {
    const innerArray = Array.from({ length: n }).fill(""); //.map((_, idx) => t[idx]);

    // t.push(t.shift());
    return innerArray;
  });
};

const safeNumRegEx = new RegExp(`^[1-${n}]$`);

const SudokuApp = () => {
  const [grid, setGrid] = useState(generateGrid(n));
  const countRef = useRef(0);

  const isCheckSafe = (v, rowIdx, colIdx) => {
    if (grid[rowIdx].includes(v)) return false;
    const pCol = grid.some((row) => {
      return row[colIdx] === v;
    });
    if (pCol) return !pCol;

    const subN = Math.sqrt(n);
    let flag = false;

    for (let i = 0; i < subN; i++) {
      for (let j = 0; j < subN; j++) {
        let r = rowIdx < subN ? 0 : subN;
        let c = colIdx < subN ? 0 : subN;
        if (grid[r + i][c + j] == v) {
          flag = true;
          break;
        }
      }
      if (flag) break;
    }

    return !flag;
  };

  const handleChange = useCallback((v, rowIdx, colIdx) => {
    v = v.trim();
    if (v !== "") {
      if (!safeNumRegEx.test(v)) return;
      const safeToPlace = v <= n && isCheckSafe(v, rowIdx, colIdx);
      if (!safeToPlace) return;
    }

    const newGrid = [...grid];
    newGrid[rowIdx][colIdx] = v;
    setGrid(newGrid);

    if (v === "") {
      --countRef.current;
    } else {
      ++countRef.current;
    }

    if (countRef.current == n ** 2) {
      setTimeout(() => {
        alert("Win!");
      }, 1000);
    }
  });

  return (
    <>
      {grid.map((gridRow, rowIdx) => {
        return (
          <div key={rowIdx} className="gridRow">
            {gridRow.map((gridCol, colIdx) => {
              return (
                <input
                  key={colIdx}
                  className="gridCell"
                  maxLength={1}
                  value={grid[rowIdx][colIdx]}
                  onChange={(e) => handleChange(e.target.value, rowIdx, colIdx)}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default SudokuApp;
