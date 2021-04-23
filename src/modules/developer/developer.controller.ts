import { Response, Request } from "express";
import developerService from "./developer.service";
export default class DeveloperController {
  static async find(req: Request, res: Response) {
    try {
      let developers = await developerService.find();
      return res.status(200).json({
        data: developers,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
