import cors from "cors";
import express, { NextFunction, Request, Response, Router } from "express";
import logger from "morgan";
import CadastroRouter from "./routes/cadastro.router";
import AlunoRouter from "./routes/aluno.router";
import AulaRouter from "./routes/aula.router";
import AuthRouter from "./routes/auth.router";
import CursoRouter from "./routes/curso.router";
import ProfessorRouter from "./routes/professor.router";
import Database from "./utils/database/database";
import Exception from "./utils/exceptions/exception";
import auth from "./utils/middlewares/auth.middleware";

const router = express.Router();
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.database();
    this.initMiddlewares();
    this.publicRoutes();
    this.privateRoutes();
    this.endMiddlewares();
  }

  private database() {
    Database.connect().then((r) =>
      console.log("[Database] - Conexão realizada com sucesso")
    );
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger("dev"));
  }

  // #pegabandeira resolvido
  private publicRoutes() {
    this.app.use("/stefanini", CadastroRouter);
    this.app.use("/stefanini", AuthRouter);
  }

  // #pegabandeira
  private privateRoutes() {
    this.authMiddleware();
    this.app.use("/stefanini", AlunoRouter);
    this.app.use("/stefanini", AulaRouter);
    this.app.use("/stefanini", CursoRouter);
    this.app.use("/stefanini", ProfessorRouter);
  }

  private authMiddleware() {
    this.app.use(auth);
  }

  private endMiddlewares() {
    this.app.use(
      (
        err: Exception | Error,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        if (err) {
          if (err instanceof Exception) {
            res
              .status(err.status)
              .json({ message: err.message, status: err.status });
          } else {
            // evite utilizar o Error diretamente. De preferencia para as Exceptions
            res.status(400).json({ message: err.message, status: 400 });
          }
        }
        next();
      }
    );
  }
}

export default new App().app;
