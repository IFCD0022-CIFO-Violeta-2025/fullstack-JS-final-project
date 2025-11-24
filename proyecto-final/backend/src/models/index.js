// index.js
import { Sequelize } from "sequelize";
import Users from "./users.model.js";
import Events from "./events.model.js";
import Comments from "./comments.model.js";
import Locations from "./locations.model.js";
import Tags from "./tags.model.js";
import Relations from "./relations.model.js";
import Organizers from "./organizers.model.js";
import Messages from "./messages.model.js";
import Notifications from "./notifications.model.js";
import Permissions from "./permissions.model.js";
import Profiles from "./profiles.model.js";
import FAQs from "./faqs.model.js";
import Posts from "./posts.model.js";

// ================================
// Conexión Sequelize
// ================================
export const sequelize = new Sequelize(
    "db_eventos",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        logging: false,
    }
);

// ================================
// Inicialización de modelos
// ================================
//const models = {
export const models = {
    Users: Users(sequelize),
    Events: Events(sequelize),
    Comments: Comments(sequelize),
    Locations: Locations(sequelize),
    Tags: Tags(sequelize),
    Relations: Relations(sequelize),
    Organizers: Organizers(sequelize),
    Messages: Messages(sequelize),
    Notifications: Notifications(sequelize),
    Permissions: Permissions(sequelize),
    Profiles: Profiles(sequelize),
    FAQs: FAQs(sequelize),
    Posts: Posts(sequelize)
};

// ================================
// Exportar
// ================================
