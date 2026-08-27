import React from 'react';

interface QRGeneratorProps {
  data: string;
  size?: number;
  subText?: string;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ data, size = 160, subText }) => {
  // Generate a deterministic visual QR pattern based on data hash
  const getPattern = () => {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = (hash << 5) - hash + data.charCodeAt(i);
      hash |= 0;
    }

    const gridSize = 21; // Standard QR matrix size
    const matrix: boolean[][] = Array(gridSize)
      .fill(false)
      .map(() => Array(gridSize).fill(false));

    // Corner Finder Patterns (7x7 squares)
    const drawFinderPattern = (r: number, c: number) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (
            i === 0 ||
            i === 6 ||
            j === 0 ||
            j === 6 ||
            (i >= 2 && i <= 4 && j >= 2 && j <= 4)
          ) {
            matrix[r + i][c + j] = true;
          }
        }
      }
    };

    // Draw standard 3 finder corners
    drawFinderPattern(0, 0);
    drawFinderPattern(0, gridSize - 7);
    drawFinderPattern(gridSize - 7, 0);

    // Timing patterns
    for (let i = 8; i < gridSize - 8; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    // Pseudo-random data blocks based on hash
    let seed = Math.abs(hash);
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Skip corner finders
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c >= gridSize - 8) ||
          (r >= gridSize - 8 && c < 8) ||
          r === 6 ||
          c === 6
        ) {
          continue;
        }
        seed = (seed * 9301 + 49297) % 233280;
        matrix[r][c] = seed / 233280 > 0.48;
      }
    }

    return matrix;
  };

  const matrix = getPattern();
  const gridSize = matrix.length;
  const cellSize = size / gridSize;

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-inner border border-stone-200/80">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shape-rendering-crisp"
      >
        <rect width={size} height={size} fill="#ffffff" />
        {matrix.map((row, r) =>
          row.map((filled, c) => {
            if (!filled) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize + 0.2}
                height={cellSize + 0.2}
                fill="#1c1917"
                rx={cellSize > 6 ? 1 : 0}
              />
            );
          })
        )}
      </svg>
      {subText && (
        <span className="mt-2 text-[10px] tracking-widest uppercase font-mono font-bold text-stone-500">
          {subText}
        </span>
      )}
    </div>
  );
};
