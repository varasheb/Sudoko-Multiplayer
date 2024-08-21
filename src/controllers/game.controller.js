import HttpStatus from 'http-status-codes';
import * as GameService from '../services/game.service';

export const pollgames = async (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = (data) => {
      console.log("string-->",JSON.stringify(data));
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const intervalId =await setInterval(() => {
      const data =GameService.getGameUpdates(req.body.boardId);
      console.log(data);
      sendEvent(data);
    }, 2000);

    req.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  } catch (error) {
    next(error); 
  }
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
      const data = await GameService.getboard(req.body.boardId);
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

export const movegames = async (req, res, next) => {
    try {
        const data = await GameService.movegame(req.body);
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
        const data = await GameService.undoMove(req.body.bordId);
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
