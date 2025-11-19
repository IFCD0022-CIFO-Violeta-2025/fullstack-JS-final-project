// initModels.js
import User from "./User.js";
import Location from "./Location.js";
import Event from "./Event.js";
import Tag from "./Tag.js";
import EventTag from "./EventTag.js";
import EventSubscription from "./EventSubscription.js";
import Post from "./Post.js";
import Comment from "./Comment.js";
import Message from "./Message.js";
import Notification from "./Notification.js";
import Profile from "./Profile.js";
import Permission from "./Permission.js";
import ProfilePermission from "./ProfilePermission.js";
import UserProfile from "./UserProfile.js";
import Relation from "./Relation.js";

// ---------------- Relación Event <-> Tag ----------------
Event.belongsToMany(Tag, { through: EventTag, foreignKey: "idEvent", otherKey: "idTag" });
Tag.belongsToMany(Event, { through: EventTag, foreignKey: "idTag", otherKey: "idEvent" });

// ---------------- Relación Event <-> User (Suscripciones) ----------------
Event.belongsToMany(User, { through: EventSubscription, foreignKey: "idEvent", otherKey: "idUser" });
User.belongsToMany(Event, { through: EventSubscription, foreignKey: "idUser", otherKey: "idEvent" });

// ---------------- Relación Event -> Location ----------------
Event.belongsTo(Location, { foreignKey: "idLocation", onDelete: "SET NULL", onUpdate: "CASCADE" });
Location.hasMany(Event, { foreignKey: "idLocation" });

// ---------------- Relación Event -> Organizer (User/Organizer) ----------------
Event.belongsTo(User, { foreignKey: "idOrganizer", as: "Organizer", onDelete: "SET NULL", onUpdate: "CASCADE" });
User.hasMany(Event, { foreignKey: "idOrganizer", as: "OrganizedEvents" });

// ---------------- Relación Post -> User ----------------
Post.belongsTo(User, { foreignKey: "idUser", onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Post, { foreignKey: "idUser" });

// ---------------- Relación Comment -> User, Post, Event ----------------
Comment.belongsTo(User, { foreignKey: "idUser", onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Comment, { foreignKey: "idUser" });

Comment.belongsTo(Post, { foreignKey: "idPost", onDelete: "CASCADE", onUpdate: "CASCADE" });
Post.hasMany(Comment, { foreignKey: "idPost" });

Comment.belongsTo(Event, { foreignKey: "idEvent", onDelete: "CASCADE", onUpdate: "CASCADE" });
Event.hasMany(Comment, { foreignKey: "idEvent" });

// ---------------- Relación Message -> User (sender & receiver) ----------------
Message.belongsTo(User, { foreignKey: "idSender", as: "Sender", onDelete: "CASCADE", onUpdate: "CASCADE" });
Message.belongsTo(User, { foreignKey: "idReceiver", as: "Receiver", onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Message, { foreignKey: "idSender", as: "SentMessages" });
User.hasMany(Message, { foreignKey: "idReceiver", as: "ReceivedMessages" });

// ---------------- Relación Notification -> User ----------------
Notification.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Notification, { foreignKey: "user_id" });

// ---------------- Relación Profile <-> Permission ----------------
Profile.belongsToMany(Permission, { through: ProfilePermission, foreignKey: "idProfile", otherKey: "idPermission" });
Permission.belongsToMany(Profile, { through: ProfilePermission, foreignKey: "idPermission", otherKey: "idProfile" });

// ---------------- Relación User <-> Profile ----------------
User.belongsToMany(Profile, { through: UserProfile, foreignKey: "idUser", otherKey: "idProfile" });
Profile.belongsToMany(User, { through: UserProfile, foreignKey: "idProfile", otherKey: "idUser" });

export {
  User,
  Location,
  Event,
  Tag,
  EventTag,
  EventSubscription,
  Post,
  Comment,
  Message,
  Notification,
  Profile,
  Permission,
  ProfilePermission,
  UserProfile,
  Relation
};
