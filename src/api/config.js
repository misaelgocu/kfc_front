/**
 * Configuración centralizada de la API
 * 
 * Este archivo maneja la URL base de la API según el entorno
 */

// URL base de la API según el entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Endpoints de la API
export const API_ENDPOINTS = {
  // Aquí agregar endpoints
  VENTAS: '/api/ventas/',
  EMPRESAS: '/api/empresas/',
  MARCAS: '/api/marcas/',
  SUCURSALES: '/api/sucursales/',
};

export default API_BASE_URL;
