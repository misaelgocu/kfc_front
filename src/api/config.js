/**
 * Configuración centralizada de la API
 * 
 * Este archivo maneja la URL base de la API según el entorno
 */

// URL base de la API según el entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Endpoints de la API
export const API_ENDPOINTS = {
  VENTAS: '/api/ventas/',
  // Aquí puedes agregar más endpoints según los vayas necesitando
  // PRODUCTOS: '/api/productos/',
  // CLIENTES: '/api/clientes/',
};

export default API_BASE_URL;
