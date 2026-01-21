import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./config";

// GET - Obtener todas las sucursales
export const getSucursales = () => {
  return apiClient.get(API_ENDPOINTS.SUCURSALES);
};

// GET - Obtener una sucursal por ID
export const getSucursalById = (id) => {
  return apiClient.get(`${API_ENDPOINTS.SUCURSALES}${id}/`);
};

// POST - Crear una nueva sucursal
export const createSucursal = (data) => {
  return apiClient.post(API_ENDPOINTS.SUCURSALES, data);
};

// PUT - Actualizar una sucursal completa
export const updateSucursal = (id, data) => {
  return apiClient.put(`${API_ENDPOINTS.SUCURSALES}${id}/`, data);
};

// PATCH - Actualizar campos específicos de una sucursal
export const patchSucursal = (id, data) => {
  return apiClient.patch(`${API_ENDPOINTS.SUCURSALES}${id}/`, data);
};

// DELETE - Eliminar una sucursal
export const deleteSucursal = (id) => {
  return apiClient.delete(`${API_ENDPOINTS.SUCURSALES}${id}/`);
};

