import { Router } from "express";
import {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  //softDeleteFAQ,
  hardDeleteFAQ
} from "../controllers/faqs.controller.js";

const router = Router();

router.get("/", getAllFAQs);
router.get("/:id", getFAQById);
router.post("/", createFAQ);
router.put("/:id", updateFAQ);
//router.delete("/:id", softDeleteFAQ); //ESTA ENTIDAD NO TIENE SOFT DELETE
router.delete("/hardDelete/:id", hardDeleteFAQ);

export default router;
