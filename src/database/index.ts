import mongoose from 'mongoose'
import {MONGODB_URI} from '../config'
class Connection {
    constructor(){
        mongoose.connect(MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(db => console.log('Database is Conected'))
        .catch(err => console.error(err))
    }
    
}

export default new Connection()