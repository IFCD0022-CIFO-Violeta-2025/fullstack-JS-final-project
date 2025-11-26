import EventParticipant from "../models/EventParticipant.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

// Obtener todos los participantes
export const getAllParticipants = async (req, res) => {
  try {
    const participants = await EventParticipant.findAll({
      include: [
        { model: Event, attributes: ["idEvent", "title"] },
        { model: User, attributes: ["idUser", "username"] }
      ]
    });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener participantes de un evento específico
export const getParticipantsByEvent = async (req, res) => {
  try {
    const participants = await EventParticipant.findAll({
      where: { eventId: req.params.eventId },
      include: [{ model: User, attributes: ["idUser", "username"] }]
    });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Añadir un participante a un evento
export const addParticipant = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const participant = await EventParticipant.create({ userId, eventId });
    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un participante de un evento
export const removeParticipant = async (req, res) => {
  try {
    const participant = await EventParticipant.findByPk(req.params.id);
    if (!participant) return res.status(404).json({ message: "Participante no encontrado" });
    await participant.destroy();
    res.json({ message: "Participante eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
