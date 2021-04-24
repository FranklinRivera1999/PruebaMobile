import DeveloperModel,{Developer} from "../../models/developer.model";
import SkillModel from "../../models/skill.model";
import { IVoidError } from "../../interfaces";

class DeveloperService {
  async find() {
    return await DeveloperModel.find().populate("skills");
  }
  async create(nombre: string, apellido: string, skills: string[]):Promise<IVoidError| Developer> {
    let validation = await this.validateSkills(skills)
    if(validation && validation.err){
        return {err:validation.err}
    }
    let newDeveloper = new DeveloperModel({ nombre, apellido, skills });
    return newDeveloper.save();
  }

  async delete(id: string): Promise<IVoidError | undefined> {
    let developer = await DeveloperModel.findById(id);
    if (!developer) {
      return {
        err: {
          code: 404,
          message: "Developer Not Found",
        },
      };
    }
    await DeveloperModel.deleteOne({
      _id: id,
    });
  }

  async update(
    id: string,
    nombre: string,
    apellido: string,
    skills: string[]
  ): Promise<IVoidError | undefined> {
    let validation = await this.validateSkills(skills)
    if(validation && validation.err){
        return {err:validation.err}
    }
    let developer = await DeveloperModel.findById(id);
    if (!developer) {
      return {
        err: {
          code: 404,
          message: "Developer Not Found",
        },
      };
    }
    await DeveloperModel.updateOne(
      {
        _id: id,
      },
      {
        nombre,
        apellido,
        skills,
      }
    );
  }

  //functions for validation
  private async validateSkills(skills: string[]):Promise<IVoidError | undefined> {
    let err= null;
    for (let index = 0; index < skills.length; index++) {
        let skillId = skills[index];
        let skill = await SkillModel.findById(skillId)
        if(!skill){
            err = {
                code:400,
                message:`Skill not Found with id ${skillId}`
            }
            break
        }
    }
    if(err) return {err}
  }
}

export default new DeveloperService();
