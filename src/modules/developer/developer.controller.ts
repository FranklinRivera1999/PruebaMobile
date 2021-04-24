import { Response, Request } from "express";
import developerService from "./developer.service";
import { developerDTO } from "./developer.dto";

import { validationBody } from "../../middlewares/validator";

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

  static async create(req: Request, res: Response) {
    let { error, value } = validationBody(developerDTO, req);
    if (error) return res.status(400).json({ error });
    req.body = value;
    try {
      let result = await developerService.validateSkills(req.body['skills'])
      if(result && result.err){
        return res.status(result.err.code).json(result.err.message)
      }
      let developer = await developerService.create(
        req.body.nombre,
        req.body.apellido,
        req.body.skills
      );
      
      return res.status(201).json({
        instance: developer,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      let deleted = await developerService.delete(req.params["id"]);
      if(deleted && deleted.err){
        return res.status(deleted.err.code).json({error:deleted.err.message})
      }
      return res.status(200).json({
        message: `successfully removed developer with id ${req.params["id"]}`,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }

  static async update(req: Request, res: Response) {
    let { error, value } = validationBody(developerDTO, req);
    if (error) return res.status(400).json({ error });
    req.body = value;
    try {
      let updated = await developerService.update(
        req.params["developerId"],
        req.body.nombre,
        req.body.apellido,
        req.body.skills
      );
      if(updated && updated.err){
        return res.status(updated.err.code).json({error:updated.err.message})
      }
      return res.status(201).json({
        message: `successfully removed developer with id ${req.params["developerId"]}`,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }
}
