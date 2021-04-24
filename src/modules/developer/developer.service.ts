import DeveloperModel, { Developer } from "../../models/developer.model";
import SkillModel from "../../models/skill.model";
import { IVoidError } from "../../interfaces";
import { Types } from "mongoose";
class DeveloperService {
  async find() {
    return await DeveloperModel.find().populate("skills");
  }
  async create(
    nombre: string,
    apellido: string,
    skills: string[]
  ): Promise<Developer> {
    let newDeveloper = new DeveloperModel({ nombre, apellido, skills });
    return await newDeveloper.save();
  }

  async delete(id: string): Promise<IVoidError | undefined> {
    let isValid = this.isValid(id);
    if (isValid && isValid.err) {
      return {
        err: isValid.err,
      };
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
    await DeveloperModel.deleteOne({
      _id: id,
    });
  }

  async update(
    developerId: string,
    nombre: string,
    apellido: string,
    skills: string[]
  ): Promise<IVoidError | undefined> {
    let validation = await this.validateSkills(skills);
    if (validation && validation.err) {
      return { err: validation.err };
    }
    let isValid = this.isValid(developerId);
    if (isValid && isValid.err) {
      return {
        err: isValid.err,
      };
    }
    let developer = await DeveloperModel.findOne({ _id: developerId });
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
        _id: developerId,
      },
      {
        nombre,
        apellido,
        skills,
      }
    );
  }

  //functions for validation
  async validateSkills(skills: string[]): Promise<IVoidError | undefined> {
    let err = null;
    for (let index = 0; index < skills.length; index++) {
      let skillId = skills[index];
      let isValid = this.isValid(skillId);
      if (isValid && isValid.err) {
        err = isValid.err
        break
      }
      let skill = await SkillModel.findById(skillId);
      if (!skill) {
        err = {
          code: 400,
          message: `Skill not Found with id ${skillId}`,
        };
        break;
      }
    }
    if (err) return { err };
  }

  private isValid(id: string): IVoidError | undefined {
    if (!Types.ObjectId.isValid(id)) {
      return {
        err: {
          code: 400,
          message: `Id invalid ${id}`,
        },
      };
    }
  }
}

export default new DeveloperService();
