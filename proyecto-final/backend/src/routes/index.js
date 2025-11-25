import { Router } from "express";

import usersRoutes from "./users.routes.js";
import eventsRoutes from "./events.routes.js";
import commentsRoutes from "./comments.routes.js";
import postsRoutes from "./posts.routes.js";
import locationsRoutes from "./locations.routes.js";
import tagsRoutes from "./tags.routes.js";
import relationsRoutes from "./relations.routes.js";
import organizersRoutes from "./organizers.routes.js";
import messagesRoutes from "./messages.routes.js";
import notificationsRoutes from "./notifications.routes.js";
import permissionsRoutes from "./permissions.routes.js";
import profilesRoutes from "./profiles.routes.js";
import faqsRoutes from "./faqs.routes.js";

const router = Router();

// ========================================= //
//          RUTAS PRINCIPALES API            //
// ========================================= //

router.use("/users", usersRoutes);
router.use("/events", eventsRoutes);
router.use("/comments", commentsRoutes);
router.use("/posts", postsRoutes);
router.use("/locations", locationsRoutes);
router.use("/tags", tagsRoutes);
router.use("/relations", relationsRoutes);
router.use("/organizers", organizersRoutes);
router.use("/messages", messagesRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/permissions", permissionsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/faqs", faqsRoutes);

export default router;