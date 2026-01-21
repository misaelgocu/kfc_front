import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./config";

// GET - Obtener todas las marcas
export const getMarcas = () => {
  return apiClient.get(API_ENDPOINTS.MARCAS);
};

// GET - Obtener una marca por ID
export const getMarcaById = (id) => {
  return apiClient.get(`${API_ENDPOINTS.MARCAS}${id}/`);
};

// POST - Crear una nueva marca
export const createMarca = (data) => {
  return apiClient.post(API_ENDPOINTS.MARCAS, data);
};

// PUT - Actualizar una marca completa
export const updateMarca = (id, data) => {
  return apiClient.put(`${API_ENDPOINTS.MARCAS}${id}/`, data);
};

// PATCH - Actualizar campos específicos de una marca
export const patchMarca = (id, data) => {
  return apiClient.patch(`${API_ENDPOINTS.MARCAS}${id}/`, data);
};

// DELETE - Eliminar una marca
export const deleteMarca = (id) => {
  return apiClient.delete(`${API_ENDPOINTS.MARCAS}${id}/`);
};