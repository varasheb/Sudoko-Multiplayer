import {isValidSudokuMove,generateBoard} from "../models/games.models";

const games = {};
const moves = {};
const score={};

export const createnewgame = async ({ boardId, level ,email }) => {
  if(games[boardId]) {
    throw new Error("Duplicate Board game")
  }
  const board= generateBoard(level);
  games[boardId]= {email,board};
  return {boardId:boardId,board:games[boardId]}
};

export const getgames = async () => {
  return Object.keys(games);
};



export const updatemove = async ({ boardId, row ,coloum, value,email }) => {
  console.log(email);
  if (!games[boardId]) {
    throw new Error('Board not found');
  }
  const board = games[boardId].board;
  const [i, j] = [row , coloum]

  if (!isValidSudokuMove(board,i,j, value)) {
    board[i][j] = value;
    throw new Error('Invalid move according to Sudoku rules');
  }

  board[i][j] = value;

  if (!moves[boardId]) {
    moves[boardId] = [];
  }
  moves[boardId].push({ i,j, value ,email});

  return board;
};

export const undoMove = async ({boardId,email}) => {
  if (!games[boardId]) {
    throw new Error("Board not found");
  }

  if (!moves[boardId] || moves[boardId].length === 0) {
    throw new Error("No moves to undo");
  }

  const lastMove = moves[boardId].pop();
  const { i,j,email:usermail } = lastMove;

  if(!usermail===email){
    throw new Error("No moves to undo");

  }
  const board = games[boardId].board;
  console.log(games[boardId].board);

  board[i][j] = 0;
  
  return board;
};

export const getboard = async (boardId) => {
  const board= games[boardId];
  if(!board){
    throw new Error("Board Id is Incorrect")
  }
  return board
};

export const getscores = async ({email}) => {
  const point=score[email]
  if(!point){
    return 0
  }
  return point
};