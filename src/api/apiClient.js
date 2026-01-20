import axios from "axios";
import API_BASE_URL from "./config";

/**
 * Cliente HTTP configurado con axios
 * 
 * Esta instancia ya tiene la URL base configurada,
 * por lo que solo necesitas especificar el endpoint relativo
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para requests (útil para agregar tokens de autenticación)
apiClient.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar tokens de autenticación si los necesitas
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
    // Aquí puedes manejar errores globales
    if (error.response?.status === 401) {
      // Redirigir al login, por ejemplo
      console.error('No autorizado');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
