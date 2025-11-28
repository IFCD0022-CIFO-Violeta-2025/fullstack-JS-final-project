// -- 1) INSERT (valores en el orden de las columnas listadas)
// INSERT INTO `Relations` (`idEntidad1`, `idEntidad2`, `relationName`, `relationType`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`, `deleted_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);

// -- 2) SELECT ALL (filtrando por no eliminados si aplica)
// SELECT * FROM `Relations` WHERE `deleted` = FALSE OR `deleted` IS NULL;

// -- 3) SELECT ONE (por PK)
// SELECT * FROM `Relations` WHERE `idRelation` = ? AND (`deleted` = FALSE OR `deleted` IS NULL);

// -- 4) UPDATE
// UPDATE `Relations` SET `idEntidad1` = ?, `idEntidad2` = ?, `relationName` = ?, `relationType` = ?, `createdAt` = ?, `updatedAt` = ?, `deletedAt` = ?, `updatedAt` = NOW() WHERE `idRelation` = ?;

// -- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
// UPDATE `Relations` SET `deleted` = TRUE, `deleted_at` = NOW() WHERE `idRelation` = ?;

// -- 6) DELETE (físico)
// DELETE FROM `Relations` WHERE `idRelation` = ?;


import { DataTypes } from "sequelize";

export default (sequelize) => {
const Relations = sequelize.define(
"Relations",
{
idRelation: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
idEntidad1: { type: DataTypes.INTEGER, allowNull: false },
idEntidad2: { type: DataTypes.INTEGER, allowNull: false },
relationName: { type: DataTypes.STRING(20), allowNull: false },
relationType: { type: DataTypes.STRING(10), allowNull: false },
deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
deletedAt: { type: DataTypes.DATE },
},
{
tableName: "Relations",
timestamps: false,
}
);


return Relations;
};

//===========================================================


//CODIGO ANTIGUO (NO BORRAR)
// import config from '../config/config.js'

// import { Sequelize, DataTypes } from 'sequelize'
// const sequelize = new Sequelize(/*database*/config.db_name, /*username*/config.db_user, /*password*/config.db_password, {
//     host: config.db_host,
//     dialect: 'mysql'
// })

// const Relations = sequelize.define('Relation', {
//     idRelation: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     idEntidad1: { type: DataTypes.INTEGER, allowNull: false },
//     idEntidad2: { type: DataTypes.INTEGER, allowNull: false },
//     relationName: { type: DataTypes.STRING(20), allowNull: false },
//     relationType: { type: DataTypes.STRING(10), allowNull: false },
//     deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
//     createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
//     updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
//     deletedAt: { type: DataTypes.DATE },
// })

// /**
//  * Obtiene todos los eventos
//  * @params {Object} filters: Filtros Opcionales (completed, priority)
//  * @returns {Array} Lista de tareas
// */
// // SELECT ALL (filtrando por no eliminados si aplica)
// // SELECT * FROM `Relations` WHERE `deleted` = FALSE OR `deleted` IS NULL;

// export async function getAll(filters = {}) {
//     try {
//         //TODO: CONFIGURAR FILTROS NECESARIOS
//         //const relations = await Relation.findAll(filters);

//         let relations;

//         if (!filters)
//         {
//             relations = await Relations.findAll({where: {deleted: false}});
//         }
//         else {
//             if (filters.NoFilters == true)
//             {
//                 relations = await Relations.findAll();
//             }
//         }

//         return relations;
//     } catch (error) {
//         throw error;
//     }
// }

// /**
//  * Crear una nueva relacion
//  * @params {Object} relationDATA
//  * @returns {Array} Lista de relaciones
// */
// // INSERT (valores en el orden de las columnas listadas)
// // INSERT INTO `Relations` (`idEntidad1`, `idEntidad2`, `relationName`, `relationType`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`, `deleted_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
// export async function create(relationsDATA) {
//     try {
//         //const [result] = await connex.query("INSERT INTO relations (`idEntidad1`, `idEntidad2`, `relationName`, `relationType`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`, `deleted_at`) VALUES (?)", relationsDATA);
//         const result = await Relations.create({
//             idEntidad1: relationsDATA.idEntidad1, 
//             idEntidad2: relationsDATA.idEntidad2, 
//             relationName: relationsDATA.relationName, 
//             relationType: relationsDATA.relationType, 
//             deleted: relationsDATA.deleted, 
//             createdAt: relationsDATA.deletedAt, 
//             updatedAt: relationsDATA.updatedAt, 
//             deletedAt:relationsDATA.deletedAt 
//         });

//         return result;
//     } catch (error) {
//         throw error;
//     }
// }

// /**
//  * Obtener una tarea por ID
//  * @params {number} id - ID de la tarea
//  * @returns {Object|null} Tarea encontrada o null
//  */
// // -- 3) SELECT ONE (por PK)
// // SELECT * FROM `Relations` WHERE `idRelation` = ? AND (`deleted` = FALSE OR `deleted` IS NULL);
// export async function getByID(id = 0) {
//     try 
//     {

//         const relation = await Relations.findByPk(id)
//         return relation;
//     } catch (error) {
//         throw error;
//     }
// }


// /**
//  * Actualizar una tarea existente
//  * @params {number} id - ID de la tarea
//  * @params {Object} updateData - Datos a actualizar
//  * @returns {Object|null} Tarea actualizada o null
//  */
// // -- 4) UPDATE
// // UPDATE `Relations` SET `idEntidad1` = ?, `idEntidad2` = ?, `relationName` = ?, `relationType` = ?, `createdAt` = ?, `updatedAt` = ?, `deletedAt` = ?, `updatedAt` = NOW() WHERE `idRelation` = ?;
// export async function update(id, relationDATA) {
//     try {
//         Relations.update(
//         { 
//             idEntidad1: relationDATA.idEntidad1, 
//             idEntidad2: relationDATA.idEntidad2, 
//             relationNam: relationDATA.relationName, 
//             relationType: relationDATA.relationType
//         },
//         { 
//             where: { id: id } }
//         )
//         .then(result => 
//             { return result }
//         )
//         .catch(err =>
//             { return err }
//         )
//     } catch (error) {
//         throw error;
//     }
// }

// /**
//  * Eliminar físicamente una relación por ID
//  * @params {number} id - ID de la relación
//  * @returns {boolean} true si se eliminó, false si no se encontró
//  */
// // -- 6) DELETE (físico)
// // DELETE FROM `Relations` WHERE `idRelation` = ?;
// export async function hardDelete(id) {
//     try {
//         return Relations.hardDelete(id)
//     } catch (error) {
//         throw error;
//     }
// }

// /**
//  * Marcar como 'deleted' una relación por ID
//  * @params {number} id - ID de la relación
//  * @returns {boolean} true si se eliminó, false si no se encontró
//  */
// // SOFT DELETE (marca como eliminado y pone deleted_at si existe)
// // UPDATE `Relations` SET `deleted` = TRUE, `deleted_at` = NOW() WHERE `idRelation` = ?;
// export async function softDelete(id) {
//     try {
//         Relations.update(
//         { 
//             deleted: true, 
//             deletedAt: sequelize.fn('NOW')
//         },
//         { 
//             where: { id: id } }
//         )
//         //.then(result => 
//         .then(() => 
//             { return true }
//         )
//         //.catch(err =>
//         .catch(() =>
//             { return false }
//         )
//     } catch (error) {
//         throw error;
//     }
// }

// /**
//  * Devuelve booleano indicando si existe un ID
//  * @params {id: num} - id a encontrar
//  * @returns {bool} Indica si se ha encontrado la tarea de Id
//  */
// export async function existsID(id) {
//     try {

//         const result = await Relations.findByPk(id)
//         if (result) {
//             return true;
//         }
//         return false;

//     } catch (error) {
//         throw error;
//     }
// }

// export default {
//     getAll,
//     create,
//     getByID,
//     update,
//     hardDelete,
//     softDelete,
//     existsID
// }
