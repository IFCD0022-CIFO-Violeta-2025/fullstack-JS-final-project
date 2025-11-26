import { Op, fn, col, literal } from "sequelize";
import User from "../models/User.js";
import Event from "../models/Event.js";
import EventParticipant from "../models/EventParticipant.js";

// /stats/users — Key Performance Indicators by user
export const getUserStats = async (req, res) => {
  try {
    const total = await User.count();
    const active = await User.count({
      where: { banned: false, deletedAt: null },
    });
    const banned = await User.count({ where: { banned: true } });
    const deleted = await User.count({
      where: { deletedAt: { [Op.ne]: null } },
    });

    return res.json({ total, active, banned, deleted });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// /stats/events — popularity of events by number of participants
export const getEventStats = async (req, res) => {
  try {
    const rows = await Event.findAll({
      attributes: [
        "idEvent",
        "title",
        "starttime",
        "endtime",
        [
          fn("COUNT", col("EventParticipants.idEventParticipant")),
          "participants",
        ],
      ],
      include: [
        {
          model: EventParticipant,
          attributes: [],
          required: false,
        },
      ],
      group: ["Event.idEvent"],
      order: [[literal("participants"), "DESC"]],
      limit: 100,
    });

    return res.json(
      rows.map((r) => ({
        idEvent: r.idEvent,
        title: r.title,
        starttime: r.starttime,
        endtime: r.endtime,
        participants: Number(r.get("participants")),
      }))
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// /stats/participation — user activity (top N)
export const getParticipationStats = async (req, res) => {
  try {
    const limit = Number(req.query.limit || 20);

    const rows = await EventParticipant.findAll({
      attributes: [
        "userId",
        [
          fn("COUNT", col("EventParticipant.idEventParticipant")),
          "eventsJoined",
        ],
      ],
      group: ["userId"],
      order: [[literal("eventsJoined"), "DESC"]],
      limit,
    });

    return res.json(
      rows.map((r) => ({
        userId: r.userId,
        eventsJoined: Number(r.get("eventsJoined")),
      }))
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
