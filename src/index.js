import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';


const app = express();
const host = "http://localhost";
const port = 3000;
const api_version = "v1";

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(`/api/${api_version}`, routes());


app.listen(port, () => {
  console.log(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;
