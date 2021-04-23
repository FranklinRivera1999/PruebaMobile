import SkillModel from './skill.model'
class SkillService {
    
    async find(){
        return await SkillModel.find()
    }
}

export default new SkillService()