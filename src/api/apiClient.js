import axios from "axios";
import API_BASE_URL from "./config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'cloudflare-cdn-cookie-protection': 'false',
    'bypass-tunnel-reminder': 'true',
  }
});

// Interceptor para requests (útil para agregar tokens de autenticación)
apiClient.interceptors.request.use(
  (config) => {
    // agregar tokens de autenticación si los necesitas
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses (útil para manejar errores globalmente)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // manejar errores globales
    if (error.response?.status === 401) {
      // Redirigir al login, por ejemplo
      console.error('No autorizado');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
