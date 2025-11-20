DROP DATABASE IF EXISTS db_eventos;

CREATE DATABASE IF NOT EXISTS db_eventos;

USE db_eventos;

-- ========================================================
-- Tabla: Users
-- ========================================================
CREATE TABLE Users (
    idUser INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador único
    username VARCHAR(20) NOT NULL UNIQUE, -- Alias (único)
    name VARCHAR(50) NOT NULL, -- Nombre de usuario
    lastName VARCHAR(50) NOT NULL, -- Apellido(s)
    email VARCHAR(255) NOT NULL UNIQUE, -- Correo electrónico (único)
    password VARCHAR(255) NOT NULL, -- Contraseña cifrada (hashed)
    avatar_url VARCHAR(255) NULL, -- Foto de perfil
    aboutMe TEXT NULL, -- Biografía breve
    address VARCHAR(255) NULL, -- Dirección (opcional)
    birthday DATETIME NULL, -- Fecha de Nacimiento
    documentType VARCHAR(10) NOT NULL, -- DNI, NIE, NIF...
    documentNumber VARCHAR(15) NOT NULL, -- Número de documento
    news_subscription BOOLEAN NOT NULL DEFAULT FALSE, -- Subscripción noticias
    banned BOOLEAN NOT NULL DEFAULT FALSE, -- Usuario baneado
    bannedDate DATETIME NULL DEFAULT CURRENT_TIMESTAMP, -- Inicio del baneo
    bannedUntilDate DATETIME NULL DEFAULT CURRENT_TIMESTAMP, -- Fin del baneo
    deleted BOOLEAN NOT NULL DEFAULT FALSE, -- Borrado administrativo
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Última modificación
    deleted_at DATETIME NULL -- Borrado administrativo (soft delete)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

ALTER TABLE Users
ADD UNIQUE KEY uniq_document (documentType, documentNumber);

-- Índices útiles
CREATE INDEX idx_users_document ON Users (documentType, documentNumber);

-- ========================================================
-- Tabla: Organizers (única)
-- ========================================================
CREATE TABLE Organizers (
    idOrganizer INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    documentType VARCHAR(20) NOT NULL,
    documentNumber VARCHAR(15) NOT NULL,
    organizerName VARCHAR(255) NOT NULL, -- Nombre del organizador
    organizerInfo VARCHAR(255) NULL -- Información/URL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE UNIQUE INDEX ux_organizers_document ON Organizers (documentType, documentNumber);

-- ========================================================
-- Tabla: Locations
-- ========================================================
CREATE TABLE Locations (
    idLocation INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    description VARCHAR(255) NULL, -- Descripción
    locationMaps VARCHAR(255) NOT NULL, -- String compatible Google Maps
    deleted BOOLEAN NOT NULL DEFAULT FALSE, -- Borrado administrativo
    deleted_at DATETIME NULL, -- Fecha de borrado
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Creación
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Actualización
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: Events
-- ========================================================
CREATE TABLE Events (
    idEvent INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador único
    idOrganizer INT NULL, -- Organizador (opcional)
    idLocation INT NULL, -- Ubicación (opcional)
    title VARCHAR(255) NOT NULL, -- Título
    description TEXT NULL, -- Descripción
    location VARCHAR(255) NOT NULL, -- Lugar del evento (texto libre)
    subscriptorsOnly BOOLEAN NOT NULL DEFAULT FALSE, -- Solo subscriptores
    visible BOOLEAN NOT NULL DEFAULT FALSE, -- Visible
    archived BOOLEAN NOT NULL DEFAULT FALSE, -- Archivado
    deleted BOOLEAN NOT NULL DEFAULT FALSE, -- Borrado administrativo
    startTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Inicio
    endTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fin
    reservationLastDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fin de reserva
    capacity INT NOT NULL, -- Aforo
    image_url VARCHAR(255) NULL, -- Cartel
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Creación
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Actualización
    deleted_at DATETIME NULL -- Borrado administrativo
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- FK opcionales (permiten NULL)
ALTER TABLE Events
ADD CONSTRAINT fkeventsorganizer FOREIGN KEY (idOrganizer) REFERENCES Organizers (idOrganizer) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT fkeventslocation FOREIGN KEY (idLocation) REFERENCES Locations (idLocation) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE Events
ADD COLUMN latitude FLOAT NOT NULL,
ADD COLUMN longitude FLOAT NOT NULL;

-- index for geosearch
CREATE INDEX idx_events_lat_lng ON Events (latitude, longitude);

-- ========================================================
-- Tabla: Tags
-- ========================================================
CREATE TABLE Tags (
    idTag INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    name VARCHAR(50) NOT NULL UNIQUE -- Nombre de la etiqueta
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: EventTags (relación N-M entre Events y Tags)
-- ========================================================
CREATE TABLE EventTags (
    idEvent INT NOT NULL,
    idTag INT NOT NULL,
    PRIMARY KEY (idEvent, idTag),
    CONSTRAINT fk_eventtags_event FOREIGN KEY (idEvent) REFERENCES Events (idEvent) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_eventtags_tag FOREIGN KEY (idTag) REFERENCES Tags (idTag) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: EventSubscriptions (usuarios suscritos a eventos)
-- ========================================================
CREATE TABLE EventSubscriptions (
    idEvent INT NOT NULL,
    idUser INT NOT NULL,
    subscribedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idEvent, idUser),
    CONSTRAINT fk_eventsubs_event FOREIGN KEY (idEvent) REFERENCES Events (idEvent) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_eventsubs_user FOREIGN KEY (idUser) REFERENCES Users (idUser) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: Posts (Publicaciones de usuarios particulares)
-- ========================================================
CREATE TABLE Posts (
    idPost INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    idUser INT NOT NULL, -- Autor del post
    content TEXT NOT NULL, -- Texto
    image_url VARCHAR(255) NULL, -- Imagen
    borrado BOOLEAN NOT NULL DEFAULT FALSE, -- Borrado administrativo
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Publicación
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Actualización
    deleted_at DATETIME NULL -- Borrado
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

ALTER TABLE Posts
ADD CONSTRAINT fk_posts_user FOREIGN KEY (idUser) REFERENCES Users (idUser) ON DELETE CASCADE ON UPDATE CASCADE;

-- ========================================================
-- Tabla: Comments (Comentarios a Eventos y/o Posts)
-- ========================================================
CREATE TABLE Comments (
    idComment INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    idUser INT NOT NULL, -- Autor del comentario
    idEvent INT NULL, -- Comentario a evento (opcional)
    idPost INT NULL, -- Comentario a post (opcional)
    content TEXT NOT NULL, -- Texto
    borrado BOOLEAN NOT NULL DEFAULT FALSE, -- Borrado administrativo
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Publicación
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Actualización
    deleted_at DATETIME NULL -- Borrado
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

ALTER TABLE Comments
ADD CONSTRAINT fk_comments_user FOREIGN KEY (idUser) REFERENCES Users (idUser) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_comments_event FOREIGN KEY (idEvent) REFERENCES Events (idEvent) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_comments_post FOREIGN KEY (idPost) REFERENCES Posts (idPost) ON DELETE CASCADE ON UPDATE CASCADE;

-- Reglas opcionales de validación: al menos uno de idEvent o idPost debe ser NO NULL (controlarlo en aplicación).

-- ========================================================
-- Tabla: Messages (mensajería directa entre usuarios)
-- ========================================================
CREATE TABLE Messages (
    idMessage INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    idSender INT NOT NULL, -- Remitente
    idReceiver INT NOT NULL, -- Destinatario
    content TEXT NOT NULL, -- Texto del mensaje
    sentAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de envío
    is_read BOOLEAN NOT NULL DEFAULT FALSE -- ¿Leído?
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

ALTER TABLE Messages
ADD CONSTRAINT fk_messages_sender FOREIGN KEY (idSender) REFERENCES Users (idUser) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_messages_receiver FOREIGN KEY (idReceiver) REFERENCES Users (idUser) ON DELETE CASCADE ON UPDATE CASCADE;

-- ========================================================
-- Tabla: Notifications
-- ========================================================
CREATE TABLE Notifications (
    idNotification INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    user_id INT NOT NULL, -- Usuario destinatario
    type VARCHAR(20) NOT NULL, -- Tipo (like, comment, follow...)
    reference_id INT NOT NULL, -- ID de la entidad relacionada (post/event/comment...)
    message TEXT NOT NULL, -- Texto
    is_read BOOLEAN NOT NULL DEFAULT FALSE, -- ¿Leído?
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP -- Creación
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

ALTER TABLE Notifications
ADD CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES Users (idUser) ON DELETE CASCADE ON UPDATE CASCADE;

-- ========================================================
-- Tabla: Permissions
-- ========================================================
CREATE TABLE Permissions (
    idPermission INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    permissionName VARCHAR(255) NOT NULL UNIQUE -- Nombre del permiso
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: Profiles (roles/perfiles)
-- ========================================================
CREATE TABLE Profiles (
    idProfile INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Identificador
    profileName VARCHAR(255) NOT NULL UNIQUE -- Nombre del perfil (corregido)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: ProfilePermissions (N-M entre Profiles y Permissions)
-- ========================================================
CREATE TABLE ProfilePermissions (
    idProfile INT NOT NULL,
    idPermission INT NOT NULL,
    PRIMARY KEY (idProfile, idPermission),
    CONSTRAINT fk_profile_permissions_profile FOREIGN KEY (idProfile) REFERENCES Profiles (idProfile) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_profile_permissions_permission FOREIGN KEY (idPermission) REFERENCES Permissions (idPermission) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: UserProfiles (N-M entre Users y Profiles)
-- ========================================================
CREATE TABLE UserProfiles (
    idUser INT NOT NULL,
    idProfile INT NOT NULL,
    PRIMARY KEY (idUser, idProfile),
    CONSTRAINT fk_user_profiles_user FOREIGN KEY (idUser) REFERENCES Users (idUser) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_profiles_profile FOREIGN KEY (idProfile) REFERENCES Profiles (idProfile) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: UserHistory
-- ========================================================

CREATE TABLE UserHistory (
    idHistory INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    action ENUM(
        'created',
        'updated',
        'blocked',
        'deleted'
    ) NOT NULL,
    performedBy INT NULL, -- admin/moderador; debe poder ser NULL por ON DELETE SET NULL
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    snapshot JSON NOT NULL,
    CONSTRAINT fk_userhistory_user FOREIGN KEY (userId) REFERENCES Users (idUser) ON DELETE CASCADE,
    CONSTRAINT fk_userhistory_admin FOREIGN KEY (performedBy) REFERENCES Users (idUser) ON DELETE SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: ArchivedUsers
-- ========================================================

CREATE TABLE ArchivedUsers (
    idArchived INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    originalUserId INT NULL, -- debe ser NULL si usas ON DELETE SET NULL
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL,
    banned BOOLEAN NOT NULL DEFAULT FALSE,
    deletedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    snapshot JSON NOT NULL,
    CONSTRAINT fk_archived_original FOREIGN KEY (originalUserId) REFERENCES Users (idUser) ON DELETE SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: Relations (opcional, genérica)
-- ========================================================
CREATE TABLE Relations (
    idRelation INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Clave de la relación
    idEntidad1 INT NOT NULL, -- Clave primaria 1
    idEntidad2 INT NOT NULL, -- Clave primaria 2
    relationName VARCHAR(50) NOT NULL, -- Nombre de relación
    relationType VARCHAR(10) NOT NULL, -- Tipo (1-1, 1-N, N-1, N-M)
    deleted BOOLEAN NOT NULL DEFAULT FALSE, -- Borrado
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Creación
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Modificación
    deletedAt DATETIME NULL, -- Borrado administrativo
    deleted_at DATETIME NULL -- Soft delete
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ========================================================
-- Tabla: EventParticipants
-- ========================================================
CREATE TABLE IF NOT EXISTS EventParticipants (
    idEventParticipant SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    eventId INT NOT NULL,
    joinedAt TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_event_participants_event ON EventParticipants (eventId);

CREATE INDEX idx_event_participants_user ON EventParticipants (userId);

-- Nota: Relations queda como herramienta genérica; para consultas eficientes usa tablas especializadas (EventTags, EventSubscriptions).