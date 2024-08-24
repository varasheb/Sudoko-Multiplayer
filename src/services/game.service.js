import { isValidSudokuMove, generateBoard } from "../utils/games.util";
import sequelize, { DataTypes } from "../config/database";

const Games = require("../models/games.models")(sequelize, DataTypes);
const User= require('../models/user.model')(sequelize, DataTypes);

export const createnewgame = async ({ boardId, level, email }) => {
  const game = await Games.findOne({ where: { boardId } });
  if (game) {
    throw new Error("Duplicate Board game");
  }
  const board = generateBoard(level);
  const body = { boardId, createdBy: email, board };
  const data = await Games.create(body);
  return data;
};

export const getgames = async () => {
  const records = await Games.findAll({
    attributes: ["boardId"],
  });
  const boardIds = records.map(board => board.boardId);
  return boardIds;
};

export const gethistory = async (boardId) => {
  const games = await Games.findOne({ where: { boardId } });
  if (!games) {
    throw new Error("Board Id Incorrect");
  }
  const moves=games.moveBy
  return moves;
};

export const deleteGame = async (email, boardId) => {
  const games = await Games.destroy({ where: { boardId } });
  if (!games) {
    throw new Error("Board Id Incorrect");
  }
  const moves=games.moveBy[boardId]
  const data = moves.filter(move => move.email === email);
  const user=await User.findOne({ where :{email}})
  return {moves:data,username:user.username};
};

export const updatemove = async ({ boardId, row, coloum, value, email }) => {
  const game = await Games.findOne({ where: { boardId } });
  if (!game) {
    throw new Error("Board not found");
  }
  const board = game.board;
  const [i, j] = [row, coloum];

  if (!isValidSudokuMove(board, i, j, value)) {
    throw new Error("Invalid move according to Sudoku rules");
  }
  board[i][j] = value;

  if (!game.moveBy) {
    game.moveBy= [];
  }
  let move = game.moveBy;
  const user=await User.findOne({ where :{email},attributes: ["username"]})
  move.push({ i, j, value, username:user.username });
  game.moveBy = move;

  await Games.update(
    { board, moveBy: game.moveBy },
    { where: { boardId } }
  );

  return board;
};

export const undoMove = async ({ boardId, email }) => {

  const game = await Games.findOne({ where: { boardId } });
  if (!game) {
    throw new Error("Board not found");
  }
  const moves=game.moveBy;
  if (!moves || moves.length === 0) {
    throw new Error("No moves to undo");
  }

  const lastMove = moves.pop();
  const { i, j, email: usermail } = lastMove;

  if (!usermail === email) {
    throw new Error("No moves to undo");
  }
  const board = game.board;
  board[i][j] = 0;

  const data = await Games.update(
    { board, moveBy: moves },
    { where: { boardId } }
  );

  return board;
};

export const getboard = async (boardId) => {
  const board = await Games.findOne({ where: { boardId } });
  if (!board) {
    throw new Error("Board Id is Incorrect");
  }
  return board;
};

// export const getscores = async ({ email }) => {
//   const point = score[email];
//   if (!point) {
//     return 0;
//   }
//   return point;
// };
