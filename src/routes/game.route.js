import express from 'express';
import * as gameController from '../controllers/game.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/getgames', userAuth, gameController.getgames);

router.get('/score', userAuth, gameController.getscores);

router.post('/newgame', userAuth , gameController.createnewgame);

router.get('/getboard', userAuth, gameController.getboard);

router.post('/move', userAuth , gameController.updatemove);

router.post('/undo', userAuth, gameController.undoMove);




export default router;

