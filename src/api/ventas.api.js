import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./config";

/**
 * Servicios relacionados con ventas
 */

export const getVentas = () => {
  return apiClient.get(API_ENDPOINTS.VENTAS);
};

export const getVentasCompletas = () => {
  return apiClient.get(API_ENDPOINTS.VENTAS_COMPLETAS);
};

export const getVentaById = (id) => {
  return apiClient.get(`${API_ENDPOINTS.VENTAS}${id}/`);
};

// Aquí puedes agregar más funciones según las necesites
// export const getVentaById = (id) => {
//   return apiClient.get(`${API_ENDPOINTS.VENTAS}${id}/`);
// };

// export const createVenta = (data) => {
//   return apiClient.post(API_ENDPOINTS.VENTAS, data);
// };

// export const updateVenta = (id, data) => {
//   return apiClient.put(`${API_ENDPOINTS.VENTAS}${id}/`, data);
// };

// export const deleteVenta = (id) => {
//   return apiClient.delete(`${API_ENDPOINTS.VENTAS}${id}/`);
// };
