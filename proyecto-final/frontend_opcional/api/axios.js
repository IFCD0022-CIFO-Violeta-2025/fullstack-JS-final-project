import axios from "axios";
console.log("AXIOS FILE LOADED");
const API = import.meta.env.VITE_API_URL;

const api = axios.create({ baseURL: API });

console.log("API URL:", import.meta.env.VITE_API_URL);

// додаємо токен
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  console.log("INTERCEPTOR — TOKEN:", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// оновлення токена при 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.reject(err);
      try {
        const { data } = await axios.post(`${API}/auth/refresh`, {
          refreshToken,
        });
        localStorage.setItem("authToken", data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
