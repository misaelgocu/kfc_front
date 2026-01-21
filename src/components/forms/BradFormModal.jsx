import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getEmpresas } from '../../api/empresas.api';

function BradFormModal({ marca, onSubmit, onClose, isLoading }) {
  const [empresas, setEmpresas] = useState([]);
  const [loadingEmpresas, setLoadingEmpresas] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre_marca: marca?.nombre_marca || '',
      id_empresa: marca?.id_empresa || '',
    },
  });

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await getEmpresas();
        setEmpresas(response.data);
      } catch (error) {
        console.error('Error al cargar empresas:', error);
      } finally {
        setLoadingEmpresas(false);
      }
    };
    fetchEmpresas();
  }, []);

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {marca ? 'Editar Marca' : 'Nueva Marca'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={isLoading}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              {/* Empresa */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Empresa <span className="text-danger">*</span>
                </label>
                {loadingEmpresas ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                ) : (
                  <select
                    className={`form-select ${errors.id_empresa ? 'is-invalid' : ''}`}
                    {...register('id_empresa', {
                      required: 'Selecciona una empresa',
                    })}
                  >
                    <option value="">Selecciona una empresa</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.id_empresa} value={empresa.id_empresa}>
                        {empresa.nombre_empresa}
                      </option>
                    ))}
                  </select>
                )}
                {errors.id_empresa && (
                  <div className="invalid-feedback">
                    {errors.id_empresa.message}
                  </div>
                )}
              </div>

              {/* Nombre Marca */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Nombre de la Marca <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre_marca ? 'is-invalid' : ''}`}
                  placeholder="Ej: KFC"
                  {...register('nombre_marca', {
                    required: 'El nombre es obligatorio',
                    minLength: {
                      value: 2,
                      message: 'Mínimo 2 caracteres',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Máximo 50 caracteres',
                    },
                  })}
                />
                {errors.nombre_marca && (
                  <div className="invalid-feedback">
                    {errors.nombre_marca.message}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={isLoading || loadingEmpresas}
              >
                {isLoading ? 'Guardando...' : marca ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BradFormModal;