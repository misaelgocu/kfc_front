import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            {/* Ilustración 404 */}
            <div className="mb-4">
              <div className="display-1 fw-bold text-danger" style={{ fontSize: '8rem' }}>
                404
              </div>
              <div className="mb-3">
                <Search size={60} className="text-secondary opacity-50" />
              </div>
            </div>

            {/* Mensaje */}
            <h2 className="fw-bold mb-3">Página no encontrada</h2>
            <p className="text-secondary mb-4 fs-5">
              Lo sentimos, la página que buscas no existe o ha sido movida.
              <br />
              Verifica la URL o regresa al inicio.
            </p>

            {/* Botones */}
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button
                className="btn btn-danger btn-lg px-4"
                onClick={() => navigate('/')}
              >
                <Home size={20} className="me-2" />
                Ir al Inicio
              </button>
              <button
                className="btn btn-outline-secondary btn-lg px-4"
                onClick={() => navigate('/')}
              >
                <ArrowLeft size={20} className="me-2" />
                Regresar
              </button>
            </div>

            {/* Enlaces útiles */}
            <div className="mt-5 pt-4 border-top">
              <p className="text-secondary mb-3">O visita alguna de estas secciones:</p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate('/companies')}
                >
                  Empresas
                </button>
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate('/brands')}
                >
                  Marcas
                </button>
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate('/branches')}
                >
                  Sucursales
                </button>
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate('/sales')}
                >
                  Ventas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;