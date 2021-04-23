import { Router } from "express";
import developerController from './developer.controller'
const router = Router()
router.get('/',developerController.find)
export default router;