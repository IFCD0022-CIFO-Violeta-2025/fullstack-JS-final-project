// src/api/auth.js
import api from "./axios";

// логін
export const login = (payload) => api.post("/auth/login", payload);

// реєстрація
export const register = (payload) => api.post("/auth/register", payload);

// вихід
export const logout = () => api.post("/auth/logout");

// отримати поточного користувача
export const me = () => api.get("/auth/me");
