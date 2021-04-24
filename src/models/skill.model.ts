import mongoose, { Schema, model } from 'mongoose';

export interface Skill extends mongoose.Document {
    nombre: string;
};

const SkillSchema = new Schema({
    nombre: String
});

export default model<Skill>('Skill', SkillSchema);