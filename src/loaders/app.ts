import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "../config";
require("../database");
import {developerRoutes, skillRoutes} from "../modules";

class Server {
  private app: Application;
  public readonly port: Number = PORT;

  constructor() {
    this.app = express();
    this.config();
    this.setRoutes();
  }

  private config() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private setRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      return res.json({
        message: "REST API CRUD with mongoDB and Typescript",
        code: `To see the complete code --> https://github.com/FranklinRivera1999/PruebaMobile.git`
      });
    });
    this.app.use("/api/developer", developerRoutes.default);
    this.app.use("/api/skill",skillRoutes.default)

    /**
     * Global error catcher.
     */
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const err: any = new Error("Not Found");
      err["status"] = 404;
      next(err);
    });

    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        res
          .status(err.status || 500)
          .json({
          errors: {
            message: err.message,
          },
        });
      }
    );
  }
  start(callback: VoidFunction) {
    this.app.listen(this.port, callback);
  }
}

export default new Server();
