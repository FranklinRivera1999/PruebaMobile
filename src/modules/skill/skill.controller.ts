import { Response, Request } from "express";
import skillService from "./skill.service";
import { validationBody } from "../../middlewares/validator";
import { createSkillDTO } from "./skill.dto";

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

  static async create(req: Request, res: Response) {
    let { error, value } = validationBody(createSkillDTO, req);
    if (error) return res.status(400).json({ error });
    req.body = value;
    try {
      let developer = await skillService.create(req.body.nombre);
      return res.status(200).json({
        instance: developer,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
