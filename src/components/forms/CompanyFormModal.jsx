import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

function CompanyForm({ empresa, onSubmit, onClose, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre_empresa: empresa?.nombre_empresa || '',
    },
  });

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {empresa ? 'Editar Empresa' : 'Nueva Empresa'}
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
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Nombre de la Empresa <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre_empresa ? 'is-invalid' : ''}`}
                  placeholder="Ej: KFC México"
                  {...register('nombre_empresa', {
                    required: 'El nombre es obligatorio',
                    minLength: {
                      value: 3,
                      message: 'Mínimo 3 caracteres',
                    },
                    maxLength: {
                      value: 150,
                      message: 'Máximo 150 caracteres',
                    },
                  })}
                />
                {errors.nombre_empresa && (
                  <div className="invalid-feedback">
                    {errors.nombre_empresa.message}
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
                disabled={isLoading}
              >
                {isLoading ? 'Guardando...' : empresa ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyForm;