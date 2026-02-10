import { useState, useEffect, useCallback } from 'react';
import { FiRefreshCw, FiPause, FiPlay } from 'react-icons/fi';

export default function PixelGame() {
  const [gameMode, setGameMode] = useState('snake'); // 'snake' or 'tic-tac-toe'
  const [snakeScore, setSnakeScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameSpeed, setGameSpeed] = useState(150);
  const [boardSize, setBoardSize] = useState(20);
  const [tttBoard, setTttBoard] = useState(Array(9).fill(null));
  const [tttTurn, setTttTurn] = useState('X');
  const [tttWinner, setTttWinner] = useState(null);

  // SNAKE GAME LOGIC
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize)
    };
    
    // Make sure food doesn't spawn on snake
    const onSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (onSnake) {
      generateFood();
    } else {
      setFood(newFood);
    }
  }, [boardSize, snake]);

  const moveSnake = useCallback(() => {
    if (!gameActive) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      
      // Move head based on direction
      switch(direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check wall collision
      if (
        head.x < 0 || head.x >= boardSize || 
        head.y < 0 || head.y >= boardSize
      ) {
        setGameActive(false);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((segment, index) => 
        index > 0 && segment.x === head.x && segment.y === head.y
      )) {
        setGameActive(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];
      
      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setSnakeScore(prev => prev + 10);
        generateFood();
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [direction, food, gameActive, boardSize, generateFood]);

  useEffect(() => {
    if (gameMode === 'snake' && gameActive) {
      const gameInterval = setInterval(moveSnake, gameSpeed);
      return () => clearInterval(gameInterval);
    }
  }, [gameMode, gameActive, moveSnake, gameSpeed]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameMode !== 'snake') return;
      
      switch(e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setGameActive(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameMode]);

  // TIC-TAC-TOE LOGIC
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'DRAW';
    }

    return null;
  };

  const handleTttClick = (index) => {
    if (tttBoard[index] || tttWinner) return;
    
    const newBoard = [...tttBoard];
    newBoard[index] = tttTurn;
    
    setTttBoard(newBoard);
    
    const winner = checkWinner(newBoard);
    if (winner) {
      setTttWinner(winner);
    } else {
      setTttTurn(tttTurn === 'X' ? 'O' : 'X');
    }
  };

  const resetSnakeGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setSnakeScore(0);
    setGameActive(true);
    generateFood();
  };

  const resetTttGame = () => {
    setTttBoard(Array(9).fill(null));
    setTttTurn('X');
    setTttWinner(null);
  };

  const getCellContent = (value) => {
    if (value === 'X') return <span className="text-red-400 text-2xl font-bold">✗</span>;
    if (value === 'O') return <span className="text-blue-400 text-2xl font-bold">○</span>;
    return null;
  };

  // Initialize snake food
  useEffect(() => {
    if (gameMode === 'snake') {
      generateFood();
    }
  }, [gameMode, generateFood]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">{">_ "}</span>
            <span className="gradient-text">PIXEL_ARCADE</span>
          </h1>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            Retro games built with React. Play Snake or Tic-Tac-Toe!
          </p>
        </div>

        {/* Game Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setGameMode('snake');
              resetSnakeGame();
            }}
            className={`px-6 py-3 rounded-lg font-mono font-bold border-2 transition-all ${
              gameMode === 'snake'
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                : 'bg-black/50 border-gray-800 text-gray-400 hover:border-cyan-500/50'
            }`}
          >
            🐍 SNAKE
          </button>
          <button
            onClick={() => {
              setGameMode('tic-tac-toe');
              resetTttGame();
            }}
            className={`px-6 py-3 rounded-lg font-mono font-bold border-2 transition-all ${
              gameMode === 'tic-tac-toe'
                ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                : 'bg-black/50 border-gray-800 text-gray-400 hover:border-purple-500/50'
            }`}
          >
            ⭕ TIC-TAC-TOE
          </button>
        </div>

        {gameMode === 'snake' ? (
          <div className="max-w-4xl mx-auto">
            {/* Snake Game Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 p-4 bg-black/30 border border-cyan-500/30 rounded-xl">
              <div className="space-y-2">
                <div className="text-cyan-400 font-mono">SCORE: <span className="text-2xl font-bold">{snakeScore}</span></div>
                <div className="text-gray-400 text-sm">Length: {snake.length}</div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setGameActive(!gameActive)}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
                >
                  {gameActive ? <FiPause /> : <FiPlay />}
                  {gameActive ? 'PAUSE' : 'PLAY'}
                </button>
                
                <button
                  onClick={resetSnakeGame}
                  className="px-4 py-2 bg-black/50 border border-gray-800 text-gray-300 rounded-lg hover:border-cyan-500 transition-colors flex items-center gap-2"
                >
                  <FiRefreshCw />
                  RESET
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="text-gray-400 font-mono text-sm">SPEED</div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={gameSpeed}
                  onChange={(e) => setGameSpeed(parseInt(e.target.value))}
                  className="w-32 accent-cyan-500"
                />
              </div>
            </div>

            {/* Snake Game Board */}
            <div className="border-2 border-cyan-500/50 rounded-lg overflow-hidden">
              <div 
                className="bg-black"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                  gap: '1px',
                  padding: '1px'
                }}
              >
                {Array.from({ length: boardSize * boardSize }).map((_, index) => {
                  const x = index % boardSize;
                  const y = Math.floor(index / boardSize);
                  const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                  const isHead = snake[0]?.x === x && snake[0]?.y === y;
                  const isFood = food.x === x && food.y === y;

                  return (
                    <div
                      key={index}
                      className={`
                        aspect-square transition-all duration-150
                        ${isHead ? 'bg-cyan-500' : 
                          isSnake ? 'bg-cyan-700' : 
                          isFood ? 'bg-red-500 animate-pulse' : 
                          'bg-gray-900'}
                        ${isHead ? 'rounded-sm' : 'rounded-none'}
                      `}
                    >
                      {isHead && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2/3 h-2/3 bg-black/30 rounded-full"></div>
                        </div>
                      )}
                      {isFood && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-xs">🍎</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls Guide */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/30 border border-gray-800 rounded">
                <h4 className="text-cyan-400 font-mono mb-2">CONTROLS</h4>
                <div className="space-y-1 text-sm text-gray-400">
                  <div>↑ ↓ ← → : Move Snake</div>
                  <div>SPACE : Pause/Resume</div>
                  <div>CLICK PLAY : Start Game</div>
                </div>
              </div>
              
              <div className="p-4 bg-black/30 border border-gray-800 rounded">
                <h4 className="text-cyan-400 font-mono mb-2">OBJECTIVE</h4>
                <p className="text-gray-400 text-sm">
                  Eat the red apples 🍎 to grow longer. Avoid walls and yourself!
                </p>
              </div>
              
              <div className="p-4 bg-black/30 border border-gray-800 rounded">
                <h4 className="text-cyan-400 font-mono mb-2">STATS</h4>
                <div className="space-y-1 text-sm text-gray-400">
                  <div>High Score: {localStorage.getItem('snakeHighScore') || snakeScore}</div>
                  <div>Speed: {Math.round(1000/gameSpeed)} FPS</div>
                  <div>Board: {boardSize}x{boardSize}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TIC-TAC-TOE GAME */
          <div className="max-w-2xl mx-auto">
            {/* TTT Game Info */}
            <div className="flex justify-between items-center mb-8 p-4 bg-black/30 border border-purple-500/30 rounded-xl">
              <div>
                <div className="text-purple-400 font-mono">TURN</div>
                <div className="text-2xl font-bold">
                  {tttWinner ? 'GAME OVER' : tttTurn === 'X' ? '❌ PLAYER X' : '⭕ PLAYER O'}
                </div>
              </div>
              
              <div>
                {tttWinner && (
                  <div className={`text-2xl font-bold animate-pulse ${
                    tttWinner === 'X' ? 'text-red-400' : 
                    tttWinner === 'O' ? 'text-blue-400' : 
                    'text-yellow-400'
                  }`}>
                    {tttWinner === 'DRAW' ? '🤝 DRAW!' : `🏆 ${tttWinner} WINS!`}
                  </div>
                )}
              </div>
              
              <button
                onClick={resetTttGame}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <FiRefreshCw />
                NEW GAME
              </button>
            </div>

            {/* TTT Board */}
            <div className="grid grid-cols-3 gap-2 bg-gray-900/30 p-4 rounded-xl">
              {tttBoard.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleTttClick(index)}
                  disabled={!!cell || !!tttWinner}
                  className="aspect-square bg-black border-2 border-gray-800 rounded-lg flex items-center justify-center text-4xl hover:border-purple-500 disabled:opacity-80 transition-all duration-200"
                >
                  {getCellContent(cell)}
                </button>
              ))}
            </div>

            {/* TTT Game Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-black/30 border border-gray-800 rounded">
                <h4 className="text-purple-400 font-mono mb-3">HOW TO PLAY</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 text-lg">✗</span>
                    <span>Player X goes first</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-lg">○</span>
                    <span>Player O goes second</span>
                  </div>
                  <div>Get 3 in a row to win!</div>
                </div>
              </div>
              
              <div className="p-4 bg-black/30 border border-gray-800 rounded">
                <h4 className="text-purple-400 font-mono mb-3">GAME STATUS</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Games Played:</span>
                    <span className="text-white">{parseInt(localStorage.getItem('tttGames') || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">X Wins:</span>
                    <span className="text-red-400">{parseInt(localStorage.getItem('tttXWins') || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">O Wins:</span>
                    <span className="text-blue-400">{parseInt(localStorage.getItem('tttOWins') || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Easter Egg Hint */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm font-mono">
            💡 Hint: Try pressing Arrow Keys during Snake game!
          </p>
        </div>
      </div>
    </div>
  );
}