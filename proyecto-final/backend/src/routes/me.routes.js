import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { me, meUpdate, meDelete } from "../controllers/meController.js";

const router = Router();

// get current user (secure route) 
router.get("/", requireAuth, me);

// Update (user)  
router.put("/", requireAuth, meUpdate);

// Delete (user) 
router.delete("/", requireAuth, meDelete);


export default router;