import api from "./axios";

 export const listOrganizers = () => api.get("/organizers");
 export const createOrganizer = (payload) => api.post("/organizers", payload);
 export const createEvent = (payload) => api.post("/events", payload);

