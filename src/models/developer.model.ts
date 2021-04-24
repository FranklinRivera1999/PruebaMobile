import mongoose, { Schema, model } from 'mongoose';
export interface Developer extends mongoose.Document {
    nombre: string;
    apellido: string;
    skills:any[]
};

const DeveloperSchema = new Schema({
    nombre: String,
    apellido: String,
    skills: [
        {
            type:Schema.Types.ObjectId,
            ref:'Skill'
        }
    ]
});

export default model<Developer>('Developer', DeveloperSchema);