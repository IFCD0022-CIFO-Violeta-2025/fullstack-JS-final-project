import api from "./axios";

export const getUser = (idUser) => api.get(`/users/${idUser}`);
export const updateUser = (idUser, payload) =>
  api.put(`/users/${idUser}`, payload);
export const listUsers = () => api.get("/users");


