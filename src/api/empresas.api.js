import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./config";

// GET - Obtener todas las empresas
export const getEmpresas = () => {
  return apiClient.get(API_ENDPOINTS.EMPRESAS);
};

// GET - Obtener una empresa por ID
export const getEmpresaById = (id) => {
  return apiClient.get(`${API_ENDPOINTS.EMPRESAS}${id}/`);
};

// POST - Crear una nueva empresa
export const createEmpresa = (data) => {
  return apiClient.post(API_ENDPOINTS.EMPRESAS, data);
};

// PUT - Actualizar una empresa completa
export const updateEmpresa = (id, data) => {
  return apiClient.put(`${API_ENDPOINTS.EMPRESAS}${id}/`, data);
};

// PATCH - Actualizar campos específicos de una empresa
export const patchEmpresa = (id, data) => {
  return apiClient.patch(`${API_ENDPOINTS.EMPRESAS}${id}/`, data);
};

// DELETE - Eliminar una empresa
export const deleteEmpresa = (id) => {
  return apiClient.delete(`${API_ENDPOINTS.EMPRESAS}${id}/`);
};