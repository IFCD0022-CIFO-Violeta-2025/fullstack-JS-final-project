import { Router } from "express";
import {
  getAllRelations,
  getRelationById,
  createRelation,
  updateRelation,
  softDeleteRelation,
  hardDeleteRelation
} from "../controllers/relations.controller.js";

const router = Router();

router.get("/", getAllRelations);
router.get("/:id", getRelationById);
router.post("/", createRelation);
router.put("/:id", updateRelation);
router.delete("/:id", softDeleteRelation);
router.delete("/hardDelete/:id", hardDeleteRelation);

export default router;



//=================================================================

//CODIGO ANTIGUO (NO BORRAR)


// // const express = redquire("express");
// // const router = express.Router();
// // const relationController = redquire("../controllers/relations.controller");
// import express from "express";
// const router = express.Router();
// import relationController from "../controllers/relations.controller";

// router.get("/", (req, res) => {
//     res.json({"saludo": "hola"})
// });


// /**
//  * @route GET /api/v1/relations
//  * @desc: Obtener todas las Relations (con filtros opcionales)
//  * @query 
//  * @access Public
// */

// router.get("/relations", relationController.getAll)

// /**
//  * @route POST /api/v1/relation
//  * @desc: Crear una nueva Relation
//  * @access Public
// */

// router.post("/relation", relationController.create)

// /**
//  * @route GET /api/v1/relation/:id
//  * @desc: Obtener una Relation por ID
//  * @access Public
//  */
// router.get("/relation/:id", relationController.getById)

// /**
//  * @route PUT /api/v1/relation/:id
//  * @desc: Actualizar una Relation por ID
//  * @access Public
//  */
// router.put("/relation/:id", relationController.update)

// /**
//  * @route DELETE /api/v1/relation/:id
//  * @desc: Eliminar una Relation por ID
//  * @access Public
//  */
// router.delete("/relation/:id", relationController.softDelete)

// /**
//  * @route DELETE /api/v1/relation/harddelete/:id
//  * @desc: Eliminar una Relation por ID
//  * @access Public
//  */
// router.delete("/relation/harddelete/:id", relationController.hardDelete)

// module.exports = router;
