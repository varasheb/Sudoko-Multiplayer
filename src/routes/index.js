import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import gameRoute from './game.route';


const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/games', gameRoute);

  return router;
};

export default routes;
