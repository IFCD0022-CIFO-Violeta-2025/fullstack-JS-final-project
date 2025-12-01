import { Router } from "express";
import {
  loginUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  softDeleteUser,
  hardDeleteUser,
  confirmTokenUser

} from "../controllers/users.controller.js";

const router = Router();


router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", createUser);
router.post("/login", loginUser, () => {
  // El controlador loginUser maneja la respuesta
  console.log("Login route accessed");
});
router.put("/:id", updateUser);
router.delete("/:id", softDeleteUser);
router.delete("/hardDelete/:id", hardDeleteUser);

router.get("/confirmation",confirmTokenUser,() => {
  console.log("Confirmation route accessed");
})

export default router;
