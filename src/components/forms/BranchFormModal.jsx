import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getMarcas } from '../../api/marcas.api';

function BranchFormModal({ sucursal, onSubmit, onClose, isLoading }) {
  const [marcas, setMarcas] = useState([]);
  const [loadingMarcas, setLoadingMarcas] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_marca: sucursal?.id_marca || '',
      cc_suc: sucursal?.cc_suc || '',
      compania: sucursal?.compania || '',
      nombre_sucursal: sucursal?.nombre_sucursal || '',
      fecha_inicio_suc: sucursal?.fecha_inicio_suc || '',
      fecha_fin_suc: sucursal?.fecha_fin_suc || '',
    },
  });

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await getMarcas();
        setMarcas(response.data);
      } catch (error) {
        console.error('Error al cargar marcas:', error);
      } finally {
        setLoadingMarcas(false);
      }
    };
    fetchMarcas();
  }, []);

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {sucursal ? 'Editar Sucursal' : 'Nueva Sucursal'}
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
              <div className="row">
                {/* Marca */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Marca <span className="text-danger">*</span>
                  </label>
                  {loadingMarcas ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  ) : (
                    <select
                      className={`form-select ${errors.id_marca ? 'is-invalid' : ''}`}
                      {...register('id_marca', {
                        required: 'Selecciona una marca',
                      })}
                    >
                      <option value="">Selecciona una marca</option>
                      {marcas.map((marca) => (
                        <option key={marca.id_marca} value={marca.id_marca}>
                          {marca.nombre_marca}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.id_marca && (
                    <div className="invalid-feedback">
                      {errors.id_marca.message}
                    </div>
                  )}
                </div>

                {/* CC SUC */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    CC Sucursal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className={`form-control ${errors.cc_suc ? 'is-invalid' : ''}`}
                    placeholder="Ej: 1001"
                    {...register('cc_suc', {
                      required: 'El CC es obligatorio',
                      min: {
                        value: 0,
                        message: 'Debe ser un número positivo',
                      },
                    })}
                  />
                  {errors.cc_suc && (
                    <div className="invalid-feedback">
                      {errors.cc_suc.message}
                    </div>
                  )}
                </div>

                {/* Compañía */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Compañía <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className={`form-control ${errors.compania ? 'is-invalid' : ''}`}
                    placeholder="Ej: 100"
                    {...register('compania', {
                      required: 'La compañía es obligatoria',
                      min: {
                        value: 0,
                        message: 'Debe ser un número positivo',
                      },
                    })}
                  />
                  {errors.compania && (
                    <div className="invalid-feedback">
                      {errors.compania.message}
                    </div>
                  )}
                </div>

                {/* Nombre Sucursal */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Nombre Sucursal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre_sucursal ? 'is-invalid' : ''}`}
                    placeholder="Ej: KFC Centro"
                    {...register('nombre_sucursal', {
                      required: 'El nombre es obligatorio',
                      maxLength: {
                        value: 100,
                        message: 'Máximo 100 caracteres',
                      },
                    })}
                  />
                  {errors.nombre_sucursal && (
                    <div className="invalid-feedback">
                      {errors.nombre_sucursal.message}
                    </div>
                  )}
                </div>

                {/* Fecha Inicio */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Fecha Inicio (opcional)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ej: 20240101"
                    {...register('fecha_inicio_suc')}
                  />
                  <small className="text-muted">Formato: YYYYMMDD</small>
                </div>

                {/* Fecha Fin */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Fecha Fin (opcional)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ej: 20241231"
                    {...register('fecha_fin_suc')}
                  />
                  <small className="text-muted">Formato: YYYYMMDD</small>
                </div>
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
                disabled={isLoading || loadingMarcas}
              >
                {isLoading ? 'Guardando...' : sucursal ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BranchFormModal;