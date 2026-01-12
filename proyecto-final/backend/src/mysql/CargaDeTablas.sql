-- ========================================================
-- DATOS DE EJEMPLO (INSERTS)
-- ========================================================

-- Ejemplos para Users
INSERT INTO `Users` (`UUID`, `Campo`, `username`, `name`, `lastName`, `email`, `telefono`, `password`, `avatar_url`, `aboutMe`, `address`, `birthday`, `documentType`, `documentNumber`, `news_subscription`, `reminders`, `banned`, `banned_date`, `bannedUntilDate`, 'confirmation_token', `confirmation_ok`, ' deleted`, `created_at`, `updated_at`, `deleted_at`) VALUES (`Example UUID 1`, 'Example Campo 1', 'Sample username 1', 'Sample name 1', 'Sample lastName 1', 'user1@example.com', `666666666', 'Example password 1', 'https://example.com/avatar_url1', 'Example aboutMe 1', 'Example address 1', 'Example birthday 1', 'Example documentType 1', 'Example documentNumber 1', 'Example news_subscription 1', 'Example reminders 1', '', FALSE, FALSE, NOW(), NOW(), FALSE, 'Example created_at 1', NOW(), FALSE);
INSERT INTO `Users` (`UUID`, `Campo`, `username`, `name`, `lastName`, `email`, `telefono`, `password`, `avatar_url`, `aboutMe`, `address`, `birthday`, `documentType`, `documentNumber`, `news_subscription`, `reminders`, `banned`, `banned_date`, `bannedUntilDate`, 'confirmation_token', `confirmation_ok`, `deleted`, `created_at`, `updated_at`, `deleted_at`) VALUES (`Example UUID 2`, 'Example Campo 2', 'Sample username 2', 'Sample name 2', 'Sample lastName 2', 'user2@example.com', `123456789', 'Example password 2', 'https://example.com/avatar_url2', 'Example aboutMe 2', 'Example address 2', 'Example birthday 2', 'Example documentType 2', 'Example documentNumber 2', 'Example news_subscription 2', 'Example reminders 1', '', FALSE, FALSE, NOW(), NOW(), FALSE, 'Example created_at 2', NOW(), FALSE);
INSERT INTO `Users` (`UUID`, `Campo`, `username`, `name`, `lastName`, `email`, `telefono`, `password`, `avatar_url`, `aboutMe`, `address`, `birthday`, `documentType`, `documentNumber`, `news_subscription`, `reminders`, `banned`, `banned_date`, `bannedUntilDate`, 'confirmation_token', `confirmation_ok`, `deleted`, `created_at`, `updated_at`, `deleted_at`) VALUES (`Example UUID 3`, 'Example Campo 3', 'Sample username 3', 'Sample name 3', 'Sample lastName 3', 'user3@example.com', `987654321', 'Example password 3', 'https://example.com/avatar_url3', 'Example aboutMe 3', 'Example address 3', 'Example birthday 3', 'Example documentType 3', 'Example documentNumber 3', 'Example news_subscription 3', 'Example reminders 1', '', FALSE, FALSE, NOW(), NOW(), FALSE, 'Example created_at 3', NOW(), FALSE);

-- Ejemplos para Events
INSERT INTO `Events` (`Campo`, `title`, `description`, `location`, `subscriptorsOnly`, `visible`, `archived`, `deleted`, `start_time`, `end_time`, `reservationLastDate`, `capacity`, `min_capacity`, `image_url`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 1', 'Example Title 1', 'Example text 1', 'Example Location 1', 'Example subscriptorsOnly 1', 'Example visible 1', 'Example archived 1', FALSE, NOW(), NOW(), NOW(), 'Example capacity 1', 'Example capacity 1', 'https://example.com/image_url1', 'Example created_at 1', NOW(), FALSE);
INSERT INTO `Events` (`Campo`, `title`, `description`, `location`, `subscriptorsOnly`, `visible`, `archived`, `deleted`, `start_time`, `end_time`, `reservationLastDate`, `capacity`, `min_capacity`, `image_url`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 2', 'Example Title 2', 'Example text 2', 'Example Location 2', 'Example subscriptorsOnly 2', 'Example visible 2', 'Example archived 2', FALSE, NOW(), NOW(), NOW(), 'Example capacity 2', 'Example capacity 2', 'https://example.com/image_url2', 'Example created_at 2', NOW(), FALSE);
INSERT INTO `Events` (`Campo`, `title`, `description`, `location`, `subscriptorsOnly`, `visible`, `archived`, `deleted`, `start_time`, `end_time`, `reservationLastDate`, `capacity`, `min_capacity`, `image_url`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 3', 'Example Title 3', 'Example text 3', 'Example Location 3', 'Example subscriptorsOnly 3', 'Example visible 3', 'Example archived 3', FALSE, NOW(), NOW(), NOW(), 'Example capacity 3', 'Example capacity 3', 'https://example.com/image_url3', 'Example created_at 3', NOW(), FALSE);

-- Ejemplos para Comments (Comentarios a Eventos)
INSERT INTO `Comments (Comentarios a Eventos)` (`Campo`, `content`, `borrado`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 1', 'Example text 1', 'Example borrado 1', 'Example created_at 1', NOW(), FALSE);
INSERT INTO `Comments (Comentarios a Eventos)` (`Campo`, `content`, `borrado`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 2', 'Example text 2', 'Example borrado 2', 'Example created_at 2', NOW(), FALSE);
INSERT INTO `Comments (Comentarios a Eventos)` (`Campo`, `content`, `borrado`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 3', 'Example text 3', 'Example borrado 3', 'Example created_at 3', NOW(), FALSE);

-- Ejemplos para Locations
INSERT INTO `Locations` (`Campo`, `description`, `locationMaps`, `deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES ('Example Campo 1', 'Example text 1', 'Example Location 1', FALSE, FALSE, 'Example created_at 1', NOW());
INSERT INTO `Locations` (`Campo`, `description`, `locationMaps`, `deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES ('Example Campo 2', 'Example text 2', 'Example Location 2', FALSE, FALSE, 'Example created_at 2', NOW());
INSERT INTO `Locations` (`Campo`, `description`, `locationMaps`, `deleted`, `deleted_at`, `created_at`, `updated_at`) VALUES ('Example Campo 3', 'Example text 3', 'Example Location 3', FALSE, FALSE, 'Example created_at 3', NOW());

-- Ejemplos para Tags
INSERT INTO `Tags` (`Campo`, `name`) VALUES ('Example Campo 1', 'Sample name 1');
INSERT INTO `Tags` (`Campo`, `name`) VALUES ('Example Campo 2', 'Sample name 2');
INSERT INTO `Tags` (`Campo`, `name`) VALUES ('Example Campo 3', 'Sample name 3');

-- Ejemplos para Relations
INSERT INTO `Relations` (`Campo`, `idEntidad1`, `idEntidad2`, `relationName`, `relationType`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`) VALUES ('Example Campo 1', 1, 1, 'Sample relationName 1', 'Example relationType 1', FALSE, 'Example createdAt 1', NOW(), FALSE);
INSERT INTO `Relations` (`Campo`, `idEntidad1`, `idEntidad2`, `relationName`, `relationType`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`) VALUES ('Example Campo 2', 2, 2, 'Sample relationName 2', 'Example relationType 2', FALSE, 'Example createdAt 2', NOW(), FALSE);
INSERT INTO `Relations` (`Campo`, `idEntidad1`, `idEntidad2`, `relationName`, `relationType`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`) VALUES ('Example Campo 3', 3, 3, 'Sample relationName 3', 'Example relationType 3', FALSE, 'Example createdAt 3', NOW(), FALSE);

-- Ejemplos para Organizers (redundante con usuarios?)
INSERT INTO `Organizers (redundante con usuarios?)` (`Campo`, `documentType`, `documentNumber`, `organizerName`, `organizerInfo`) VALUES ('Example Campo 1', 'Example documentType 1', 'Example documentNumber 1', 'Sample organizerName 1', 'Example organizerInfo 1');
INSERT INTO `Organizers (redundante con usuarios?)` (`Campo`, `documentType`, `documentNumber`, `organizerName`, `organizerInfo`) VALUES ('Example Campo 2', 'Example documentType 2', 'Example documentNumber 2', 'Sample organizerName 2', 'Example organizerInfo 2');
INSERT INTO `Organizers (redundante con usuarios?)` (`Campo`, `documentType`, `documentNumber`, `organizerName`, `organizerInfo`) VALUES ('Example Campo 3', 'Example documentType 3', 'Example documentNumber 3', 'Sample organizerName 3', 'Example organizerInfo 3');

-- Ejemplos para Messages
INSERT INTO `Messages` (`Campo`, `content`, `sent_at`, `is_read`) VALUES ('Example Campo 1', 'Example text 1', 'Example sent_at 1', FALSE);
INSERT INTO `Messages` (`Campo`, `content`, `sent_at`, `is_read`) VALUES ('Example Campo 2', 'Example text 2', 'Example sent_at 2', FALSE);
INSERT INTO `Messages` (`Campo`, `content`, `sent_at`, `is_read`) VALUES ('Example Campo 3', 'Example text 3', 'Example sent_at 3', FALSE);

-- Ejemplos para Notifications
INSERT INTO `Notifications` (`Campo`, `user_id`, `type`, `reference_id`, `message`, `is_read`, `created_at`) VALUES ('Example Campo 1', 1, 'Example type 1', 1, 'Example message 1', FALSE, 'Example created_at 1');
INSERT INTO `Notifications` (`Campo`, `user_id`, `type`, `reference_id`, `message`, `is_read`, `created_at`) VALUES ('Example Campo 2', 2, 'Example type 2', 2, 'Example message 2', FALSE, 'Example created_at 2');
INSERT INTO `Notifications` (`Campo`, `user_id`, `type`, `reference_id`, `message`, `is_read`, `created_at`) VALUES ('Example Campo 3', 3, 'Example type 3', 3, 'Example message 3', FALSE, 'Example created_at 3');

-- Ejemplos para Permissions
INSERT INTO `Permissions` (`Campo`, `permissionName`) VALUES ('Example Campo 1', 'Sample permissionName 1');
INSERT INTO `Permissions` (`Campo`, `permissionName`) VALUES ('Example Campo 2', 'Sample permissionName 2');
INSERT INTO `Permissions` (`Campo`, `permissionName`) VALUES ('Example Campo 3', 'Sample permissionName 3');

-- Ejemplos para Profiles
INSERT INTO `Profiles` (`Campo`, `permissionName`) VALUES ('Example Campo 1', 'Sample permissionName 1');
INSERT INTO `Profiles` (`Campo`, `permissionName`) VALUES ('Example Campo 2', 'Sample permissionName 2');
INSERT INTO `Profiles` (`Campo`, `permissionName`) VALUES ('Example Campo 3', 'Sample permissionName 3');

-- Ejemplos para Organizers
INSERT INTO `Organizers` (`Campo`, `documentType`, `documentNumber`, `organizerName`, `organizerInfo`) VALUES ('Example Campo 1', 'Example documentType 1', 'Example documentNumber 1', 'Sample organizerName 1', 'Example organizerInfo 1');
INSERT INTO `Organizers` (`Campo`, `documentType`, `documentNumber`, `organizerName`, `organizerInfo`) VALUES ('Example Campo 2', 'Example documentType 2', 'Example documentNumber 2', 'Sample organizerName 2', 'Example organizerInfo 2');
INSERT INTO `Organizers` (`Campo`, `documentType`, `documentNumber`, `organizerName`, `organizerInfo`) VALUES ('Example Campo 3', 'Example documentType 3', 'Example documentNumber 3', 'Sample organizerName 3', 'Example organizerInfo 3');

-- Ejemplos para FAQs
INSERT INTO `FAQs` (`Campo`, `textPregunta`, `textRespuesta`) VALUES ('Example Campo 1', 'Example text 1', 'Example text 1');
INSERT INTO `FAQs` (`Campo`, `textPregunta`, `textRespuesta`) VALUES ('Example Campo 2', 'Example text 2', 'Example text 2');
INSERT INTO `FAQs` (`Campo`, `textPregunta`, `textRespuesta`) VALUES ('Example Campo 3', 'Example text 3', 'Example text 3');

-- Ejemplos para Posts (Publicaciones de usuarios particulares)
INSERT INTO `Posts (Publicaciones de usuarios particulares)` (`Campo`, `content`, `image_url`, `borrado`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 1', 'Example text 1', 'https://example.com/image_url1', 'Example borrado 1', 'Example created_at 1', NOW(), FALSE);
INSERT INTO `Posts (Publicaciones de usuarios particulares)` (`Campo`, `content`, `image_url`, `borrado`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 2', 'Example text 2', 'https://example.com/image_url2', 'Example borrado 2', 'Example created_at 2', NOW(), FALSE);
INSERT INTO `Posts (Publicaciones de usuarios particulares)` (`Campo`, `content`, `image_url`, `borrado`, `created_at`, `updated_at`, `deleted_at`) VALUES ('Example Campo 3', 'Example text 3', 'https://example.com/image_url3', 'Example borrado 3', 'Example created_at 3', NOW(), FALSE);
