import EventHistory from "../models/EventHistory.js";

export const listEventHistory = async (req, res) => {
  try {
    const history = await EventHistory.findAll({
      order: [["timestamp", "DESC"]],
    });
    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getEventHistory = async (req, res) => {
  try {
    const { eventId } = req.params;
    const history = await EventHistory.findAll({
      where: { eventId },
      order: [["timestamp", "DESC"]],
    });

    if (!history || history.length === 0) {
      return res.status(404).json({ error: "Історія для цієї події відсутня" });
    }

    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
