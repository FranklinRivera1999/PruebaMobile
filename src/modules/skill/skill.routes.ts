import { Router } from "express";
import skillController from './skill.controller'
const router:Router = Router()
router.get('/',skillController.find)
router.post('/',skillController.create)
export default router;