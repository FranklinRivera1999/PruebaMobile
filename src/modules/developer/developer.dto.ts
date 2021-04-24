import joi from 'joi'

export const developerDTO = joi.object({
    nombre: joi.string().required(),
    apellido: joi.string().required(),
    skills:joi.array().items(
        joi.string()
    )
})