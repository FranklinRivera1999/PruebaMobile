import { Router } from "express";
import skillController from './skill.controller'
const router = Router()
router.get('/',skillController.find)
export default router;