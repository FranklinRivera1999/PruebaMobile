import {Request,Response,NextFunction} from 'express'
import {Schema} from 'joi'
const validationBody = (schema:Schema) => (req:Request, res:Response, next:NextFunction) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      res.status(400).json(error)
    }
    req.body = value;
    next();
  };
  
  export default validationBody