import api from "./axios";

export const listMessages = () => api.get("/chat/messages");
export const sendMessage = (payload) => api.post("/chat/messages", payload);
