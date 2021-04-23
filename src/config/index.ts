
import {resolve} from 'path';
require('dotenv').config({
    path: resolve(__dirname,'../../.env')
})

export const MONGODB_URI : string = process.env.MONGODB_URI || '';
export const PORT : Number = Number(process.env.PORT) || 3000;