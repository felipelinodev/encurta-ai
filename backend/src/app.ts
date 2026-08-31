import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import LinkRouter from './routes/LinkRouters';

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(morgan('dev'));
app.use(helmet());

// Rotas da aplicação
app.use(LinkRouter);

// Middleware para rotas não encontradas (404)
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Esta rota não existe" });
});

// Middleware de tratamento de erros (500)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Ocorreu um erro inesperado" });
});

export default app;

