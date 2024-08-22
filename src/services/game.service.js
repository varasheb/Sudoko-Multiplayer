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
  //score[boardId][email] = 0; 
  return {boardId:boardId,board:games[boardId]}
};

export const getgames = async () => {
  console.log(Object.keys(games));
  return Object.keys(games);
};



export const updatemove = async ({ boardId, row, coloum, value ,email}) => {
  if (!games[boardId]) {
    throw new Error("Board not found");
  }
  const board = games[boardId];
  const [i, j] = [row, coloum];

  if (!isValidSudokuMove(board,row,coloum, value)) {
    throw new Error("Invalid move according to Sudoku rules");
  }

  board[i][j] = value;

  if (!moves[boardId]) {
    moves[boardId] = [];
  }
  moves[boardId].push({ email, row , coloum, value });
  score[email] = (score[email] || 0) + 10;
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
  const { row,coloum,email:usermail } = lastMove;

  if(!usermail===email){
    throw new Error("No moves to undo");

  }

  const board = games[boardId];
  const [i, j] = [row,coloum];

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