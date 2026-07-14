import { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';
import { playMinesweeperClick, playErrorDing } from '@/lib/audioEngine';

interface MinesweeperWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
}

interface Cell {
  r: number;
  c: number;
  isMine: boolean;
  isOpened: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

export function MinesweeperWindow({ onClose, onMinimize, isActive }: MinesweeperWindowProps) {
  const ROWS = 9;
  const COLS = 9;
  const MINE_COUNT = 10;

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [minesLeft, setMinesLeft] = useState(MINE_COUNT);
  const [timer, setTimer] = useState(0);
  const [smiley, setSmiley] = useState<'🙂' | '😮' | '😎' | '😵'>('🙂');

  // Initialize board
  const initBoard = () => {
    // Create empty cells
    const newGrid: Cell[][] = Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c) => ({
        r,
        c,
        isMine: false,
        isOpened: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    // Place mines randomly
    let placedMines = 0;
    while (placedMines < MINE_COUNT) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        placedMines++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (newGrid[r][c].isMine) continue;
        let neighbors = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
              neighbors++;
            }
          }
        }
        newGrid[r][c].neighborMines = neighbors;
      }
    }

    setGrid(newGrid);
    setGameState('idle');
    setMinesLeft(MINE_COUNT);
    setTimer(0);
    setSmiley('🙂');
  };

  useEffect(() => {
    initBoard();
  }, []);

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTimer((prev) => Math.min(prev + 1, 999));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  const revealMines = (currentGrid: Cell[][], failedCell: Cell) => {
    return currentGrid.map((row) =>
      row.map((cell) => {
        if (cell.isMine) {
          return { ...cell, isOpened: true };
        }
        return cell;
      })
    );
  };

  const cascadeOpen = (currentGrid: Cell[][], r: number, c: number) => {
    const queue: [number, number][] = [[r, c]];
    const visited = new Set<string>();
    visited.add(`${r},${c}`);

    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      currentGrid[currR][currC].isOpened = true;

      if (currentGrid[currR][currC].neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr;
            const nc = currC + dc;
            if (
              nr >= 0 &&
              nr < ROWS &&
              nc >= 0 &&
              nc < COLS &&
              !currentGrid[nr][nc].isMine &&
              !currentGrid[nr][nc].isOpened &&
              !currentGrid[nr][nc].isFlagged &&
              !visited.has(`${nr},${nc}`)
            ) {
              visited.add(`${nr},${nc}`);
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameState === 'won' || gameState === 'lost') return;
    
    playMinesweeperClick();
    
    let currentGameState = gameState;
    if (currentGameState === 'idle') {
      currentGameState = 'playing';
      setGameState('playing');
    }

    const cell = grid[r][c];
    if (cell.isOpened || cell.isFlagged) return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

    if (cell.isMine) {
      // Game Over
      playErrorDing();
      setSmiley('😵');
      setGameState('lost');
      setGrid(revealMines(newGrid, cell));
      return;
    }

    // Cascade open empty cells
    cascadeOpen(newGrid, r, c);

    // Check Win condition
    let unopenedNonMines = 0;
    for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
      for (let colIdx = 0; colIdx < COLS; colIdx++) {
        if (!newGrid[rowIdx][colIdx].isMine && !newGrid[rowIdx][colIdx].isOpened) {
          unopenedNonMines++;
        }
      }
    }

    if (unopenedNonMines === 0) {
      setSmiley('😎');
      setGameState('won');
      // Flag all remaining mines
      setGrid(
        newGrid.map((row) =>
          row.map((c) => (c.isMine ? { ...c, isFlagged: true } : c))
        )
      );
      setMinesLeft(0);
    } else {
      setGrid(newGrid);
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState === 'won' || gameState === 'lost') return;

    playMinesweeperClick();

    const cell = grid[r][c];
    if (cell.isOpened) return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const wasFlagged = cell.isFlagged;

    newGrid[r][c].isFlagged = !wasFlagged;
    setGrid(newGrid);
    setMinesLeft((prev) => (wasFlagged ? prev + 1 : prev - 1));
  };

  const getCellColor = (neighbors: number) => {
    switch (neighbors) {
      case 1: return 'text-blue-600';
      case 2: return 'text-green-600';
      case 3: return 'text-red-600';
      case 4: return 'text-purple-900';
      case 5: return 'text-red-900';
      case 6: return 'text-teal-600';
      case 7: return 'text-black';
      case 8: return 'text-gray-500';
      default: return 'text-transparent';
    }
  };

  return (
    <XPWindow
      title="Minesweeper"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Award className="w-4 h-4 text-amber-500" />}
      className="w-[200px]"
      defaultPosition={{ x: 160, y: 80 }}
    >
      <div 
        className="bg-[#c0c0c0] p-1.5 select-none border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] font-mono text-xs text-black"
        style={{ width: '180px' }}
      >
        {/* Game Stats Panel */}
        <div className="flex justify-between items-center bg-[#c0c0c0] border-2 border-inset border-gray-400 p-1 mb-2">
          {/* Mine Counter */}
          <div className="bg-black text-red-500 font-bold text-sm px-1.5 py-0.5 min-w-[32px] text-right font-mono tracking-wider">
            {String(Math.max(minesLeft, -99)).padStart(3, '0')}
          </div>

          {/* Smiley Reset */}
          <button 
            onClick={initBoard}
            onMouseDown={() => setSmiley('😮')}
            onMouseUp={() => setSmiley(gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂')}
            className="w-6 h-6 border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] text-sm flex items-center justify-center active:border-inset"
          >
            {smiley}
          </button>

          {/* Timer */}
          <div className="bg-black text-red-500 font-bold text-sm px-1.5 py-0.5 min-w-[32px] text-right font-mono tracking-wider">
            {String(timer).padStart(3, '0')}
          </div>
        </div>

        {/* Minesweeper Grid */}
        <div className="border-2 border-inset border-gray-400 bg-[#c0c0c0] grid grid-cols-9 gap-[1px]">
          {grid.map((row) =>
            row.map((cell) => {
              const displayVal = cell.isOpened
                ? cell.isMine
                  ? '💣'
                  : cell.neighborMines > 0
                  ? cell.neighborMines
                  : ''
                : cell.isFlagged
                ? '🚩'
                : '';

              return (
                <button
                  key={`${cell.r}-${cell.c}`}
                  onClick={() => handleCellClick(cell.r, cell.c)}
                  onContextMenu={(e) => handleCellRightClick(e, cell.r, cell.c)}
                  className={`w-[18px] h-[18px] flex items-center justify-center font-bold text-[10px] ${
                    cell.isOpened
                      ? 'bg-[#c0c0c0] border border-[#808080]'
                      : 'bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] active:border-1'
                  }`}
                  style={{
                    boxSizing: 'border-box',
                  }}
                >
                  <span className={cell.isOpened ? getCellColor(cell.neighborMines) : 'text-red-600'}>
                    {displayVal}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </XPWindow>
  );
}
