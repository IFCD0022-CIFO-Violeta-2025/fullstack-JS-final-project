import EventHistory from "../models/EventHistory.js";
import Event from "../models/Event.js";

export const logEventAction = async (eventId, action, performedBy) => {
  try {
    const event = await Event.findByPk(eventId);
    if (!event) return;

    await EventHistory.create({
      eventId,
      action,
      performedBy,
      snapshot: event.toJSON(),
    });
  } catch (err) {
    console.error("❌ Event history logging error:", err.message);
  }
};
