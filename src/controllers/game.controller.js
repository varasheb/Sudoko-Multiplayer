import HttpStatus from 'http-status-codes';
import * as GameService from '../services/game.service';

export const createnewgame = async (req, res, next) => {
  try {
    const data = await GameService.createnewgame(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Board Generated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message
  })
};
};


export const getgames = async (req, res, next) => {
    try {
        const data = await GameService.getgames();
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'fetched games successfully'
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          error: error.message
      })
    };
};

export const getboard = async (req, res, next) => {
  try {
    console.log(req.params.id);
      const data = await GameService.getboard(req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'fetched board successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message
    })
  };
};

export const updatemove = async (req, res, next) => {
    try {
        const data = await GameService.updatemove(req.body);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'played move successfully'
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          error: error.message
      })
    };
};

export const undoMove = async (req, res, next) => {
    try {
        const data = await GameService.undoMove(req.body);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Undo move successfully'
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          error: error.message
      })
    };
};

export const getscores = async (req, res, next) => {
  try {
      const data = await GameService.getscores(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'fetched scores Successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message
    })
  };
};

export const gethistory = async (req, res, next) => {
  try {
      const data = await GameService.gethistory(req.body.email,req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'fetched history Successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        error: error.message
    })
  };
};