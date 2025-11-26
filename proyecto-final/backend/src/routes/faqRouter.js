import express from "express";
import {
  listFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faqController.js";
import { requireAuth } from "../middlewares/authMiddleware.js"; // <-- заміна

const router = express.Router();

// Публічний доступ
router.get("/", listFAQ);

// Адмін/модератор доступ (захищені маршрути)
router.post("/", requireAuth, createFAQ);
router.put("/:idFaq", requireAuth, updateFAQ);
router.delete("/:idFaq", requireAuth, deleteFAQ);

export default router;
