drop database if exists db_eventos;
create database if not exists db_eventos;
use db_eventos;

-- ========================================================
-- Tabla: Users
-- ========================================================
CREATE TABLE `Users` (
  `idUser` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador único en tabla
  `UUID` VARCHAR(50) NOT NULL, -- Identificador único para seguridad
  `username` VARCHAR(20) NOT NULL,  -- Alias
  `name` VARCHAR(50) NOT NULL,  -- Nombre de usuario
  `lastName` VARCHAR(50) NOT NULL,  -- Apellido(s) usuario
  `email` VARCHAR(255) NOT NULL UNIQUE,  -- Correo electrónico
  `telefono` VARCHAR(20), -- Telefono usuario
  `clave` VARCHAR(100) NOT NULL,  -- Contraseña cifrada (hashed)
  `avatar_url` VARCHAR(255) NULL,  -- Foto de perfil
  `aboutMe` TEXT NULL,  -- Biografía breve
  `address` VARCHAR(255) NULL,  -- Dirección (opcional)
  `birthday` DATETIME,  -- Fecha de Nacimiento
  `documentType` VARCHAR(10),  -- Tipo de documento de identidad (DNI, NIE, NIF)
  `documentNumber` VARCHAR(15),  -- Numero de documento de identidad (ej.: 12345678Z)
  `reminders` BOOLEAN NOT NULL DEFAULT FALSE,  -- Recordatorios de eventos dos días antes?
  `news_subscription` BOOLEAN NOT NULL DEFAULT FALSE,  -- Subscripción a noticias relacionadas ((never, daily, weekly, monthly...))
  `banned` BOOLEAN NOT NULL DEFAULT FALSE,  -- El usuario ha sido baneado, prohibido
  `banned_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha de inicio del baneo
  `bannedUntilDate` DATETIME,  -- Fecha final del baneo
  'confirmation_token' VARCHAR(50), -- Token de confirmación de alta del usuario
  `confirmation_ok` BOOLEAN NOT NULL DEFAULT FALSE, -- Indica si el usuario ha confirmado el Token que se le envía para sign up
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE,  -- Registro borrado administrativamente?
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha de registro
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Fecha de última modificación
  `deleted_at` DATETIME NULL  -- Fecha de borrado administrativo
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Events
-- ========================================================
CREATE TABLE `Events` (
  `idEvent` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador único de evento
  `title` VARCHAR(255) NOT NULL,  -- Título del evento
  `description` TEXT NULL,  -- Descripción
  `location` VARCHAR(255) NOT NULL,  -- Lugar del evento
  `subscriptorsOnly` BOOLEAN NOT NULL DEFAULT FALSE,  -- ¿Es sólo para subscriptores?
  `visible` BOOLEAN NOT NULL DEFAULT FALSE,  -- ¿Es un evento visible actualmente?
  `archived` BOOLEAN NOT NULL DEFAULT FALSE,  -- ¿Es un evento ya archivado?
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE,  -- Registro borrado administrativamente
  `start_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora de inicio
  `end_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora de finalización
  `reservationLastDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora de fin de reserva
  `capacity` INT NOT NULL,  -- Número máximo de asistentes
  `image_url` VARCHAR(255) NULL,  -- Cartel o imagen
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación del registro
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Fecha de última actualización del registro
  `deleted_at` DATETIME NULL  -- Fecha de borrado administrativo
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Comments (Comentarios a Eventos)
-- ========================================================
CREATE TABLE `Comments` (
  `idComment` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador del comentario
  `content` TEXT NOT NULL,  -- Texto
  `borrado` BOOLEAN NOT NULL DEFAULT FALSE,  -- Registro borrado administrativamente
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha de publicación
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Fecha de última actualización
  `deleted_at` DATETIME NULL  -- Fecha de borrado administrativo
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Locations
-- ========================================================
CREATE TABLE `Locations` (
  `idLocation` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador de la localización
  `description` VARCHAR(255) NULL,  -- Descripción de la localización
  `locationMaps` VARCHAR(255) NOT NULL,  -- String de localización compatible Google Maps
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE,  -- Registro borrado administrativamente
  `deleted_at` DATETIME NULL,  -- Fecha de borrado administrativo
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha de publicación
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Fecha de última actualización
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Tags
-- ========================================================
CREATE TABLE `Tags` (
  `idTag` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador de la etiqueta
  `name` VARCHAR(50) NOT NULL  -- Nombre de la etiqueta
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Relations
-- ========================================================
CREATE TABLE `Relations` (
  `idRelation` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Clave de la relación
  `idEntidad1` INT NOT NULL,  -- Clave primaria de la primera tabla
  `idEntidad2` INT NOT NULL,  -- Clave primaria de la segunda tabla
  `relationName` VARCHAR(20) NOT NULL,  -- Nombre de relación (Asistente a evento, etc)
  `relationType` VARCHAR(10) NOT NULL,  -- Tipo de relación (1-1, 1-N, N-1, N-M)
  `deleted` BOOLEAN NOT NULL DEFAULT FALSE,  -- Registro borrado administrativamente
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación del registro
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Fecha de última modificación del registro
  `deletedAt` DATETIME NULL  -- Fecha de borrado administrativo
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Organizers (redundante con usuarios?)
-- ========================================================
CREATE TABLE `Organizers` (
  `idOrganizer` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador
  `documentType` VARCHAR(10) NOT NULL,  -- Tipo de documento de identidad (DNI, NIE, NIF)
  `documentNumber` VARCHAR(15) NOT NULL,  -- Numero de documento de identidad (ej.: 12345678Z)
  `organizerName` VARCHAR(255) NOT NULL,  -- Nombre del organizador
  `organizerInfo` TEXT NULL  -- Información del organizador (URL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Messages
-- ========================================================
CREATE TABLE `Messages` (
  `idMessage` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador del mensaje
  `content` TEXT NOT NULL,  -- Texto del mensaje
  `sent_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha de envío
  `is_read` BOOLEAN NOT NULL DEFAULT FALSE  -- Leído o no
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Notifications
-- ========================================================
CREATE TABLE `Notifications` (
  `idNotification` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador
  `user_id` INT NOT NULL,  -- Usuario destinatario
  `type` VARCHAR(20) NOT NULL,  -- Tipo (like, comment, follow)
  `reference_id` INT NOT NULL,  -- ID de la entidad relacionada
  `message` TEXT NOT NULL,  -- Texto de la notificación
  `is_read` BOOLEAN NOT NULL DEFAULT FALSE,  -- Leído o no
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP  -- Fecha de creación
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Permissions
-- ========================================================
CREATE TABLE `Permissions` (
  `idPermission` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador
  `permissionName` VARCHAR(255) NOT NULL  -- Nombre del permiso
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Profiles
-- ========================================================
CREATE TABLE `Profiles` (
  `idProfile` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador
  `profileName` VARCHAR(255) NOT NULL  -- Nombre del perfil
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: FAQs
-- ========================================================
CREATE TABLE `FAQs` (
  `idFAQ` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador
  `textPregunta` VARCHAR(255) NOT NULL,  -- Texto de la pregunta
  `textRespuesta` VARCHAR(255) NOT NULL  -- Texto de la respuesta
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- Tabla: Posts (Publicaciones de usuarios particulares)
-- ========================================================
CREATE TABLE `Posts` (
  `idPost` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Identificador de la publicación
  `content` TEXT NOT NULL,  -- Texto
  `image_url` VARCHAR(255) NULL,  -- Imagen
  `borrado` BOOLEAN NOT NULL DEFAULT FALSE,  -- Registro borrado administrativamente
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Fecha de publicación
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Fecha de última actualización
  `deleted_at` DATETIME NULL  -- Fecha de borrado administrativo
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



