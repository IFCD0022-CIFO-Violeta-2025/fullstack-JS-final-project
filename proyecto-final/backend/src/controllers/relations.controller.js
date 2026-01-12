import db from "../models/index.js";
const Relations = db.Relations;

export const getAllRelations = async (req, res) => {
  try {
    res.json(await Relations.findAll());
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getRelationById = async (req, res) => {
  try {
    const r = await Relations.findByPk(req.params.id);
    if (!r) return res.status(404).json({ error: "Relation not found" });
    res.json(r);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createRelation = async (req, res) => {
  try {
    const r = await Relations.create(req.body);
    res.status(201).json(r);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateRelation = async (req, res) => {
  try {
    const r = await Relations.findByPk(req.params.id);
    if (!r) return res.status(404).json({ error: "Relation not found" });
    await r.update(req.body);
    res.json(r);
  } catch (e) { res.status(500).json({ error: e.message }); }
};


// Hard delete de la relación
export const hardDeleteRelation = async (req, res) => {
  try {
    const row = await Relations.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Relation not found" });
    await row.destroy();
    res.json({ message: "Relation removed (hard delete)" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};


//Soft Delete
export const softDeleteRelation = async (req, res) => {
  try {
    const r = await Relations.findByPk(req.params.id);
    if (!r) return res.status(404).json({ error: "Relation not found" });
    await r.update({ deleted: true, deletedAt: new Date() });
    res.json({ message: "Relation deleted logically" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};


//===========================================================

//CODIGO ANTIGUO (NO BORRAR)


// import relationModel from "../models/relations.model";
// import createRelationSchema  from "../validators/relation.validator";

// /**
//  * Obtiene todas las relations
//  * GET /api/v1/relations
// */
// async function getAll(req, res) {
//     try {
//         const filters = {}; //TODO: DEFINIR
//         // if (req.query.completed)
//         //     filters.completed = req.query.completed;
//         // if (req.query.priority)
//         //     filters.priority = req.query.priority;

//         const relationsFiltered = await relationModel.getAll(filters);

//         if (relationsFiltered.length === 0) {
//             return res.status(200).json({
//                 success: true,
//                 message: "No hay relaciones creadas!",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Todas las relaciones de la DB",
//             data: relationsFiltered
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error al obtener las Relaciones",
//             error: error.message
//         });
//     }
// }

// /**
//  * Obtener una tarea por ID
//  * GET /api/v1/relation/:id
//  */
// async function getById(req, res) {
//     const id = req.params.id;
//     try {
//         const relation = await relationModel.getById(id);

//         if (relation && Object.keys(relation).length > 0) {
//             res.status(200).json({
//                 success: true,
//                 message: "Encontrada Relation de Id: " + id,
//                 data: relation
//             });
//         }
//         else {
//             res.status(404).json({
//                 success: false,
//                 message: "NO se ha encontrado la Relation de Id: " + id,
//                 data: {}
//             });
//         }

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error al obtener la Relation de Id: " + id,
//             error: error.message
//         });
//     }
// }

// /**
//  * Crear nueva relacion
//  * GET /api/v1/relation
// */
// async function create(req, res) {
//     try {
//         // validacion con Joi
//         const { error } = createRelationSchema.validate(req.body);
//         if (error) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Validacion datos Relation fallida!",
//                 errors: error.details.map(error => error.message)
//             });
//         }

//         const newRelation = await relationModel.create(req.body)

//         res.status(201).json({
//             success: true,
//             message: "Relation Creada correctamente",
//             data: newRelation
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error al crear la Relation",
//             error: error.message
//         });
//     }

// }


// /**
//  * Actualizar una Relation por ID
//  * PUT /api/v1/relation/:id
//  */
// async function update(req, res) {
//     const { error } = createRelationSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({
//             success: false,
//             message: "Validacion datos Relation fallida!",
//             errors: error.details.map(error => error.message)
//         });
//     }


//     const id = req.params.id

//     if (!(await relationModel.existsID(id))) {
//         res.status(204).json({
//             success: false,
//             message: "No se ha encontrado la Relation de Id: " + id,
//             data: {}
//         })
//     }

//     try {
//         const relationUpdated = await relationModel.update(id, req.body)
//         res.status(200).json({
//             success: true,
//             message: "Actualizado Relation de Id: " + id,
//             data: relationUpdated
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error al obtener la Relation de Id: " + id,
//             error: error.message
//         });
//     }
// }

// /**
//  * Eliminar físicamente una Relación por ID (Hard Delete)
//  * DELETE /api/v1/relation/harddelete/:id
//  */
// async function hardDelete(req, res) {
//     const id = req.params.id

//     if (!relationModel.existsID(id)) {
//         res.status(204).json({
//             success: false,
//             message: "No existe la Relation de Id: " + id,
//         })
//     }

//     try {
//         const relationUpdated = await relationModel.hardDelete((id))
//         res.status(200).json({
//             success: true,
//             message: "Eliminada físicamente la Relation de Id: " + id,
//             body: relationUpdated
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error al eliminar físicamente la Relation de Id: " + id,
//             error: error.message
//         });
//     }
// }

// /**
//  * Eliminar una Relación por ID (Soft Delete)
//  * DELETE /api/v1/relation/:id
//  */
// async function softDelete(req, res) {
//     const id = req.params.id

//     if (!relationModel.existsID(id)) {
//         res.status(204).json({
//             success: false,
//             message: "No existe la Relation de Id: " + id,
//         })
//     }

//     try {
//         const relationUpdated = await relationModel.softDelete((id))
//         res.status(200).json({
//             success: true,
//             message: "Eliminadala Relation de Id: " + id,
//             body: relationUpdated
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error al eliminar la Relation de Id: " + id,
//             error: error.message
//         });
//     }
// }

// module.exports = {
//     getAll,
//     getById,
//     create,
//     update,
//     softDelete,
//     hardDelete
// }