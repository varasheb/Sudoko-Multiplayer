import express from 'express';
import * as gameController from '../controllers/game.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/pollgames', gameController.pollgames);

router.get('/getgames', userAuth, gameController.getgames);

router.post('/move', userAuth , gameController.movegames);

router.post('/undo', userAuth, gameController.undoMove);

export default router;
