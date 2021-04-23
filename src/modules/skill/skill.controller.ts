import { Response, Request } from "express";
import skillService from "./skill.service";
export default class SkillController {
  static async find(req: Request, res: Response) {
    try {
      let developers = await skillService.find();
      return res.status(200).json({
        data: developers,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
