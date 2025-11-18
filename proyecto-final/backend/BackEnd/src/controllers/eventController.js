import { Event, Tag, EventTag, EventSubscription } from "../models/index.js";
import { eventSchema } from "../validations/eventSchemas.js";


const toRad = (val) => (val * Math.PI) / 180;

export const createEvent = async (req, res) => {
  const { error, value } = eventSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const event = await Event.create(value);
    return res.status(201).json(event);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const listEvents = async (_req, res) => {
  try {
    const events = await Event.findAll();
    return res.json(events);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addTagToEvent = async (req, res) => {
  const { idEvent, idTag } = req.body;
  try {
    await EventTag.findOrCreate({ where: { idEvent, idTag } });
    return res.json({ message: "Tag linked to event" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const subscribeEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await EventSubscription.findOrCreate({
      where: { idEvent: id, idUser: req.user.idUser },
    });
    return res.json({ message: "Subscribed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export const getNearbyEvents = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const R = 6371; // Earth's radius in km

    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude) ||
      Number.isNaN(parseFloat(radius))
    ) {
      return res
        .status(400)
        .json({ error: "Incorrect parameters lat/lng/radius" });
    }

    // Haversine over raw SQL for performance
    const query = `
      SELECT
        e.*,
        (${R} * 2 * ASIN(
          SQRT(
            POWER(SIN((RADIANS(:lat) - RADIANS(e.latitude)) / 2), 2) +
            COS(RADIANS(e.latitude)) * COS(RADIANS(:lat)) *
            POWER(SIN((RADIANS(:lng) - RADIANS(e.longitude)) / 2), 2)
          )
        )) AS distance
      FROM "Events" e
      WHERE e.latitude BETWEEN :latMin AND :latMax
        AND e.longitude BETWEEN :lngMin AND :lngMax
      HAVING distance <= :radius
      ORDER BY distance ASC
      LIMIT 200;
    `;

    // Coarse bounding box for fast filtering
    const latDelta = (radius / R) * (180 / Math.PI);
    const lngDelta =
      (radius / (R * Math.cos(toRad(latitude)))) * (180 / Math.PI);

    const rows = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: {
        lat: latitude,
        lng: longitude,
        radius: parseFloat(radius),
        latMin: latitude - latDelta,
        latMax: latitude + latDelta,
        lngMin: longitude - lngDelta,
        lngMax: longitude + lngDelta,
      },
    });

    return res.json(
      rows.map((r) => ({
        idEvent: r.idEvent,
        title: r.title,
        description: r.description,
        starttime: r.starttime,
        endtime: r.endtime,
        capacity: r.capacity,
        latitude: r.latitude,
        longitude: r.longitude,
        distance: parseFloat(Number(r.distance).toFixed(2)),
      }))
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
