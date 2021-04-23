import DeveloperModel from './developer.model'
class DeveloperService {
    
    async find(){
        return await DeveloperModel.find()
    }
}

export default new DeveloperService()