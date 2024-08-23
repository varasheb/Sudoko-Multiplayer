import { isValidSudokuMove, generateBoard } from "../utils/games.util";
import sequelize, { DataTypes } from "../config/database";
import { Where } from "sequelize/lib/utils";

const Games = require("../models/games.models")(sequelize, DataTypes);

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
  return records;
};

export const gethistory = async (email, boardId) => {
  const board = await Games.findOne({ where: { boardId } });
  if (!board) {
    throw new Error("Board Id Incorrect");
  }

  return board.moveBy;
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

  if (!game.moveBy[boardId]) {
    game.moveBy[boardId] = [];
  }
  let move = game.moveBy[boardId];

  move.push({ i, j, value, email });
  game.moveBy[boardId] = move;

  const data = await Games.update(
    { board, moveBy: game.moveBy },
    { where: { boardId } }
  );

  return data;
};

export const undoMove = async ({ boardId, email }) => {

  const game = await Games.findOne({ where: { boardId } });
  if (!game) {
    throw new Error("Board not found");
  }
  const moves=game.moveBy;
  if (!moves[boardId] || moves[boardId].length === 0) {
    throw new Error("No moves to undo");
  }

  const lastMove = moves[boardId].pop();
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
