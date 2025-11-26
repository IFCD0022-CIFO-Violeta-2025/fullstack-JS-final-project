import api from "./axios";

export const listEvents = (params) => api.get("/events", { params });
export const nearbyEvents = (lat, lng, radiusKm) =>
  api.get("/events/nearby", { params: { lat, lng, radiusKm } });
export const getEvent = (idEvent) => api.get(`/events/${idEvent}`);
export const registerForEvent = (idEvent) =>
  api.post(`/events/${idEvent}/register`);