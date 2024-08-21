import Games from '../models/games.models';

const games=Games;
const moves={}

export const getGameUpdates = async (boardId) => {
    return games[boardId];
  };

  export const getgames = async () => {
    return games;
  };

  const isValidSudokuMove = (board, position, value) => {
    const [row, col] = position;

    for (let i = 0; i < 9; i++) {
      if (board[row][i] === value) return false;
    }

    for (let i = 0; i < 9; i++) {
      if (board[i][col] === value) return false;
    }
  
    const startRow = Math.floor(row / 9) * 9;
    const startCol = Math.floor(col / 9) * 9;
  
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === value) return false;
      }
    }
  
    return true;
  };
  

  export const movegame = async ({ boardId, row ,coloum, value }) => {
    if (!games[boardId]) {
      throw new Error('Board not found');
    }
  
    const board = games[boardId];
    const [i, j] = [row , coloum]
    const position=[row , coloum]
  
    if (!isValidSudokuMove(board, position, value)) {
      board[i][j] = value;
      throw new Error('Invalid move according to Sudoku rules');
    }

    board[i][j] = value;
  
    if (!moves[boardId]) {
      moves[boardId] = [];
    }
    moves[boardId].push({ position, value });
  
    return board;
  };
  
  export const undoMove = async (boardId) => {
    if (!games[boardId]) {
      throw new Error('Board not found');
    }
  
    if (!moves[boardId] || moves[boardId].length === 0) {
      throw new Error('No moves to undo');
    }
  
    const lastMove = moves[boardId].pop();
    const { position } = lastMove;
  
    const board = games[boardId];
    const [i, j] = position;
  
    board[i][j] = 0;
    return board;
  };

  export const getboard = async (boardId) => {
    return games[boardId];
  };
  

