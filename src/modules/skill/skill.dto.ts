import joi from 'joi'

export const createSkillDTO = joi.object({
    nombre: joi.string().required()
})