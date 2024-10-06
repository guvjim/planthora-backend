import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';


dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, you!' });
});

export default app;