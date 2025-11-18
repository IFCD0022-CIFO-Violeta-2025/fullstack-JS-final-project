import { sequelize } from "../dataBase/db.js";
import User from "./User.js";
import Organizer from "./Organizer.js";
import Location from "./Location.js";
import Event from "./Event.js";
import Tag from "./Tag.js";
import EventTag from "./EventTag.js";
import EventSubscription from "./EventSubscription.js";
import Post from "./Post.js";
import Comment from "./Comment.js";
import Message from "./Message.js";
import Notification from "./Notification.js";
import Permission from "./Permission.js";
import Profile from "./Profile.js";
import ProfilePermission from "./ProfilePermission.js";
import UserProfile from "./UserProfile.js";

// Events → Organizer, Location
Event.belongsTo(Organizer, { foreignKey: "idOrganizer" });
Event.belongsTo(Location, { foreignKey: "idLocation" });

// Users ↔ Posts
User.hasMany(Post, { foreignKey: "idUser" });
Post.belongsTo(User, { foreignKey: "idUser" });

// Users ↔ Comments
User.hasMany(Comment, { foreignKey: "idUser" });
Comment.belongsTo(User, { foreignKey: "idUser" });

// Events ↔ Comments
Event.hasMany(Comment, { foreignKey: "idEvent" });
Comment.belongsTo(Event, { foreignKey: "idEvent" });

// Posts ↔ Comments
Post.hasMany(Comment, { foreignKey: "idPost" });
Comment.belongsTo(Post, { foreignKey: "idPost" });

// Users ↔ Messages
User.hasMany(Message, { foreignKey: "idSender", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "idReceiver", as: "receivedMessages" });
Message.belongsTo(User, { foreignKey: "idSender", as: "sender" });
Message.belongsTo(User, { foreignKey: "idReceiver", as: "receiver" });

// Users ↔ Notifications
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

// Events ↔ Tags (N-M)
Event.belongsToMany(Tag, { through: EventTag, foreignKey: "idEvent" });
Tag.belongsToMany(Event, { through: EventTag, foreignKey: "idTag" });

// Events ↔ Users (subscriptions)
Event.belongsToMany(User, {
  through: EventSubscription,
  foreignKey: "idEvent",
});
User.belongsToMany(Event, { through: EventSubscription, foreignKey: "idUser" });

// Profiles ↔ Permissions (N-M)
Profile.belongsToMany(Permission, {
  through: ProfilePermission,
  foreignKey: "idProfile",
});
Permission.belongsToMany(Profile, {
  through: ProfilePermission,
  foreignKey: "idPermission",
});

// Users ↔ Profiles (N-M)
User.belongsToMany(Profile, { through: UserProfile, foreignKey: "idUser" });
Profile.belongsToMany(User, { through: UserProfile, foreignKey: "idProfile" });

export {
  sequelize,
  User,
  Organizer,
  Location,
  Event,
  Tag,
  EventTag,
  EventSubscription,
  Post,
  Comment,
  Message,
  Notification,
  Permission,
  Profile,
  ProfilePermission,
  UserProfile,
};
