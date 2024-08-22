import express from 'express';
import * as gameController from '../controllers/game.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


router.get('/score', userAuth, gameController.getscores);

router.get('/getgames', userAuth, gameController.getgames);

router.post('/newgame', userAuth , gameController.createnewgame);

router.post('/move', userAuth , gameController.updatemove);

router.post('/undo', userAuth, gameController.undoMove);

router.get('/getboard/:id', userAuth, gameController.getboard);

router.get('/history/:id', userAuth, gameController.gethistory);


export default router;

