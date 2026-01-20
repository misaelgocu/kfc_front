# Configuración de API

## Estructura

La configuración de la API está centralizada en la carpeta `src/api/`:

```
src/api/
├── config.js          # Configuración de URLs y endpoints
├── apiClient.js       # Cliente HTTP configurado (axios)
└── ventas.api.js      # Servicios específicos de ventas
```

## Uso

### 1. Configurar la URL base

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://127.0.0.1:8000
```

### 2. Usar los servicios en tus componentes

```javascript
import { getVentas } from './api/ventas.api';

// En tu componente
const fetchVentas = async () => {
  try {
    const response = await getVentas();
    console.log(response.data);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
  }
};
```

### 3. Agregar nuevos endpoints

En `src/api/config.js`:

```javascript
export const API_ENDPOINTS = {
  VENTAS: '/api/ventas/',
  PRODUCTOS: '/api/productos/',  // Nuevo endpoint
};
```

### 4. Crear nuevos servicios

Crea un archivo como `src/api/productos.api.js`:

```javascript
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./config";

export const getProductos = () => {
  return apiClient.get(API_ENDPOINTS.PRODUCTOS);
};

export const getProductoById = (id) => {
  return apiClient.get(`${API_ENDPOINTS.PRODUCTOS}${id}/`);
};
```

## Ventajas de esta arquitectura

1. **Mantenibilidad**: Solo cambias la URL en un lugar (archivo `.env`)
2. **Separación de responsabilidades**: Cada módulo de la API tiene su propio archivo
3. **Interceptors**: Manejo centralizado de autenticación y errores
4. **Configuración por entorno**: Diferentes URLs para desarrollo, staging y producción
5. **Tipo de contenido y timeouts**: Ya configurados globalmente

## Variables de entorno

- **Desarrollo**: `.env`
- **Producción**: `.env.production`

⚠️ **Importante**: Los archivos `.env` no deben subirse a Git. Usa `.env.example` como referencia.
