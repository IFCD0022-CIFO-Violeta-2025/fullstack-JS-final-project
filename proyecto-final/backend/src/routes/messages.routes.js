import { Router } from "express";
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  hardDeleteMessage
  //softDeleteMessage
} from "../controllers/messages.controller.js";

const router = Router();

router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.post("/", createMessage);
router.put("/:id", updateMessage);
//router.delete("/:id", softDeleteMessage); //EN ESTA ENTIDAD NO EXISTE SOFT DELETE
router.delete("/hardDelete/:id", hardDeleteMessage);

export default router;
