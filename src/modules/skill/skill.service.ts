import SkillModel from '../../models/skill.model'
class SkillService {
    
    async find(){
        return await SkillModel.find()
    }
    async create(nombre:string){
        let newDeveloper = new SkillModel({nombre})
        return newDeveloper.save()
    }
}

export default new SkillService()