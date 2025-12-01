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

//Configuración externa
import config from '../config/config.js'

console.log(config)

// ================================
// Conexión Sequelize parametrizado
// ================================
export const sequelize = new Sequelize(
    config.db_name,
    config.db_user,
    config.db_password,
    {
        host: config.db_host,
        dialect: "mysql",
        logging: false,
        port: config.db_port
    }
);

// ================================
// Inicialización de modelos
// ================================
//const models = {
export const db = {
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
    Posts: Posts(sequelize),
    //Settings: Settings(sequelize)
};

export default db