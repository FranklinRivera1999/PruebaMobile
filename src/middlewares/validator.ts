import { Request, Response } from "express";
import { Schema } from "joi";
const options = {
  abortEarly: false, // include all errors
  allowUnknown: false, // ignore unknown props
  stripUnknown: false, // remove unknown props
};

export const validationBody = (schema: Schema, req: Request) => {
  return schema.validate(req.body, options);
};
