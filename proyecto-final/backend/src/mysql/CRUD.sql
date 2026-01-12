DROP DATABASE IF EXISTS db_eventos;
CREATE DATABASE IF NOT EXISTS db_eventos;
USE db_eventos;

-- CRUD completo (6 operaciones) por tabla

-- ========================================================
-- CRUD para Users
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Users` (`UUID`, `username`, `name`, `lastName`, `email`, `telefono`,`password`, `avatar_url`, `aboutMe`, `address`, `birthday`, `documentType`, `documentNumber`, `news_subscription`, `reminders`, `banned`, `banned_date`, `bannedUntilDate`, `confirmation_token`, `confirmation_ok`, `deleted`, `created_at`, `updated_at`, `deleted_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Users` WHERE `deleted` = FALSE OR `deleted` IS NULL;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Users` WHERE `idUser` = ? AND (`deleted` = FALSE OR `deleted` IS NULL);

-- 4) UPDATE
UPDATE `Users` SET `UUID` = ?, `username` = ?, `name` = ?, `lastName` = ?, `email` = ?, `telefono` = ?, `password` = ?, `avatar_url` = ?, `aboutMe` = ?, `address` = ?, `birthday` = ?, `documentType` = ?, `documentNumber` = ?, `news_subscription` = ?, reminders` = ?, `banned` = ?, `banned_date` = ?, `bannedUntilDate` = ?, `deleted`= ?, `confirmation_token` = ?, `confirmation_ok`= ?, `created_at` = ?, `deleted_at` = ?, `udpated_at` = NOW() WHERE `idUser` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
UPDATE `Users` SET `deleted` = TRUE, `deleted_at` = NOW() WHERE `idUser` = ?;

-- 6) DELETE (físico)
DELETE FROM `Users` WHERE `idUser` = ?;


-- ========================================================
-- CRUD para Events
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Events` (`title`, `description`, `location`, `subscriptorsOnly`, `visible`, `archived`, `deleted`, `start_time`, `end_time`, `reservationLastDate`, `capacity`, `min_capacity`, `image_url`, `created_at`, `updated_at`, `deleted_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Events` WHERE `deleted` = FALSE OR `deleted` IS NULL;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Events` WHERE `idEvent` = ? AND (`deleted` = FALSE OR `deleted` IS NULL);

-- 4) UPDATE
UPDATE `Events` SET `title` = ?, `description` = ?, `location` = ?, `subscriptorsOnly` = ?, `visible` = ?, `archived` = ?, `start_time` = ?, `end_time` = ?, `reservationLastDate` = ?, `capacity` = ?, `min_capacity` = ?, `image_url` = ?, `created_at` = ?, `updated_at` = ?, `updated_at` = NOW() WHERE `idEvent` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
UPDATE `Events` SET `deleted` = TRUE, `deleted_at` = NOW() WHERE `idEvent` = ?;

-- 6) DELETE (físico)
DELETE FROM `Events` WHERE `idEvent` = ?;


-- ========================================================
-- CRUD para Comments
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Comments` (`content`, `borrado`, `created_at`, `updated_at`, `deleted_at`) VALUES (?, ?, ?, ?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Comments` WHERE `borrado` = FALSE OR `borrado` IS NULL;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Comments` WHERE `idComment` = ? AND (`borrado` = FALSE OR `borrado` IS NULL);

-- 4) UPDATE
UPDATE `Comments` SET `content` = ?, `created_at` = ?, `updated_at` = ?, `updated_at` = NOW() WHERE `idComment` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
UPDATE `Comments` SET `borrado` = TRUE, `deleted_at` = NOW() WHERE `idComment` = ?;

-- 6) DELETE (físico)
DELETE FROM `Comments` WHERE `idComment` = ?;


-- ========================================================
-- CRUD para Locations
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Locations` (`description`, `locationMaps`, `deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Locations` WHERE `deleted` = FALSE OR `deleted` IS NULL;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Locations` WHERE `idLocation` = ? AND (`deleted` = FALSE OR `deleted` IS NULL);

-- 4) UPDATE
UPDATE `Locations` SET `description` = ?, `locationMaps` = ?, `created_at` = ?, `updated_at` = ?, `updated_at` = NOW() WHERE `idLocation` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
UPDATE `Locations` SET `deleted` = TRUE, `deleted_at` = NOW() WHERE `idLocation` = ?;

-- 6) DELETE (físico)
DELETE FROM `Locations` WHERE `idLocation` = ?;


-- ========================================================
-- CRUD para Tags
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Tags` (`name`) VALUES (?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Tags`;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Tags` WHERE `idTag` = ?;

-- 4) UPDATE
UPDATE `Tags` SET `name` = ? WHERE `idTag` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
-- Nota: esta tabla no tiene campo de borrado; se realiza DELETE físico en su lugar
DELETE FROM `Tags` WHERE `idTag` = ?;

-- 6) DELETE (físico)
DELETE FROM `Tags` WHERE `idTag` = ?;


-- ========================================================
-- CRUD para Relations
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Relations` (`idEntidad1`, `idEntidad2`, `relationName`, `relationType`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`, `deleted_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Relations` WHERE `deleted` = FALSE OR `deleted` IS NULL;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Relations` WHERE `idRelation` = ? AND (`deleted` = FALSE OR `deleted` IS NULL);

-- 4) UPDATE
UPDATE `Relations` SET `idEntidad1` = ?, `idEntidad2` = ?, `relationName` = ?, `relationType` = ?, `createdAt` = ?, `updatedAt` = ?, `deletedAt` = ?, `updatedAt` = NOW() WHERE `idRelation` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
UPDATE `Relations` SET `deleted` = TRUE, `deleted_at` = NOW() WHERE `idRelation` = ?;

-- 6) DELETE (físico)
DELETE FROM `Relations` WHERE `idRelation` = ?;


-- ========================================================
-- CRUD para Organizers
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Organizers` (`documentType`, `documentNumber`, `organizerName`, `organizerInfo`) VALUES (?, ?, ?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Organizers`;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Organizers` WHERE `idOrganizer` = ?;

-- 4) UPDATE
UPDATE `Organizers` SET `documentType` = ?, `documentNumber` = ?, `organizerName` = ?, `organizerInfo` = ? WHERE `idOrganizer` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
-- Nota: esta tabla no tiene campo de borrado; se realiza DELETE físico en su lugar
DELETE FROM `Organizers` WHERE `idOrganizer` = ?;

-- 6) DELETE (físico)
DELETE FROM `Organizers` WHERE `idOrganizer` = ?;


-- ========================================================
-- CRUD para Messages
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Messages` (`content`, `sent_at`, `is_read`) VALUES (?, ?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Messages`;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Messages` WHERE `idMessage` = ?;

-- 4) UPDATE
UPDATE `Messages` SET `content` = ?, `sent_at` = ?, `is_read` = ? WHERE `idMessage` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
-- Nota: esta tabla no tiene campo de borrado; se realiza DELETE físico en su lugar
DELETE FROM `Messages` WHERE `idMessage` = ?;

-- 6) DELETE (físico)
DELETE FROM `Messages` WHERE `idMessage` = ?;


-- ========================================================
-- CRUD para Notifications
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Notifications` (`user_id`, `type`, `reference_id`, `message`, `is_read`, `created_at`) VALUES (?, ?, ?, ?, ?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Notifications`;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Notifications` WHERE `idNotification` = ?;

-- 4) UPDATE
UPDATE `Notifications` SET `user_id` = ?, `type` = ?, `reference_id` = ?, `message` = ?, `is_read` = ?, `created_at` = ? WHERE `idNotification` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
-- Nota: esta tabla no tiene campo de borrado; se realiza DELETE físico en su lugar
DELETE FROM `Notifications` WHERE `idNotification` = ?;

-- 6) DELETE (físico)
DELETE FROM `Notifications` WHERE `idNotification` = ?;


-- ========================================================
-- CRUD para Permissions
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Permissions` (`permissionName`) VALUES (?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Permissions`;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Permissions` WHERE `idPermission` = ?;

-- 4) UPDATE
UPDATE `Permissions` SET `permissionName` = ? WHERE `idPermission` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
-- Nota: esta tabla no tiene campo de borrado; se realiza DELETE físico en su lugar
DELETE FROM `Permissions` WHERE `idPermission` = ?;

-- 6) DELETE (físico)
DELETE FROM `Permissions` WHERE `idPermission` = ?;


-- ========================================================
-- CRUD para Profiles
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Profiles` (`permissionName`) VALUES (?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Profiles`;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Profiles` WHERE `idProfile` = ?;

-- 4) UPDATE
UPDATE `Profiles` SET `permissionName` = ? WHERE `idProfile` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
-- Nota: esta tabla no tiene campo de borrado; se realiza DELETE físico en su lugar
DELETE FROM `Profiles` WHERE `idProfile` = ?;

-- 6) DELETE (físico)
DELETE FROM `Profiles` WHERE `idProfile` = ?;


-- ========================================================
-- CRUD para FAQs
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `FAQs` (`textPregunta`, `textRespuesta`) VALUES (?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `FAQs`;

-- 3) SELECT ONE (por PK)
SELECT * FROM `FAQs` WHERE `idFAQ` = ?;

-- 4) UPDATE
UPDATE `FAQs` SET `textPregunta` = ?, `textRespuesta` = ? WHERE `idFAQ` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
-- Nota: esta tabla no tiene campo de borrado; se realiza DELETE físico en su lugar
DELETE FROM `FAQs` WHERE `idFAQ` = ?;

-- 6) DELETE (físico)
DELETE FROM `FAQs` WHERE `idFAQ` = ?;


-- ========================================================
-- CRUD para Posts
-- ========================================================

-- 1) INSERT (valores en el orden de las columnas listadas)
INSERT INTO `Posts` (`content`, `image_url`, `borrado`, `created_at`, `updated_at`, `deleted_at`) VALUES (?, ?, ?, ?, ?, ?);

-- 2) SELECT ALL (filtrando por no eliminados si aplica)
SELECT * FROM `Posts` WHERE `borrado` = FALSE OR `borrado` IS NULL;

-- 3) SELECT ONE (por PK)
SELECT * FROM `Posts` WHERE `idPost` = ? AND (`borrado` = FALSE OR `borrado` IS NULL);

-- 4) UPDATE
UPDATE `Posts` SET `content` = ?, `image_url` = ?, `created_at` = ?, `updated_at` = ?, `updated_at` = NOW() WHERE `idPost` = ?;

-- 5) SOFT DELETE (marca como eliminado y pone deleted_at si existe)
UPDATE `Posts` SET `borrado` = TRUE, `deleted_at` = NOW() WHERE `idPost` = ?;

-- 6) DELETE (físico)
DELETE FROM `Posts` WHERE `idPost` = ?;

