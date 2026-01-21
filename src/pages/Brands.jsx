import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
} from '../api/marcas.api';
import BradFormModal from '../components/forms/BradFormModal';

function Brands() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // ========== CARGAR MARCAS ==========
  const fetchMarcas = async () => {
    try {
      setLoading(true);
      const response = await getMarcas();
      setMarcas(response.data);
    } catch (error) {
      toast.error('Error al cargar marcas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  // ========== CREAR/ACTUALIZAR ==========
  const handleSubmit = async (data) => {
    try {
      setFormLoading(true);

      if (selectedMarca) {
        await updateMarca(selectedMarca.id_marca, data);
        toast.success('Marca actualizada correctamente');
      } else {
        await createMarca(data);
        toast.success('Marca creada correctamente');
      }

      setShowModal(false);
      setSelectedMarca(null);
      fetchMarcas();
    } catch (error) {
      const errorMsg = error.response?.data?.nombre_marca?.[0]
        || error.response?.data?.id_empresa?.[0]
        || 'Error al guardar marca';
      toast.error(errorMsg);
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  // ========== ELIMINAR ==========
  const handleDelete = async (marca) => {
    if (!window.confirm(`¿Eliminar marca "${marca.nombre_marca}"?`)) return;

    try {
      await deleteMarca(marca.id_marca);
      toast.success('Marca eliminada');
      fetchMarcas();
    } catch (error) {
      toast.error('Error al eliminar marca');
      console.error(error);
    }
  };

  // ========== ABRIR MODAL ==========
  const openCreateModal = () => {
    setSelectedMarca(null);
    setShowModal(true);
  };

  const openEditModal = (marca) => {
    setSelectedMarca(marca);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMarca(null);
  };

  // ========== FORMATEAR FECHA ==========
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-MX');
  };

  if (loading) {
    return (
      <div className="container-fluid p-2 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold m-0">Marcas</h2>
          <small className="text-secondary">
            Gestiona las marcas del sistema ({marcas.length})
          </small>
        </div>
        <button className="btn btn-danger fw-bold" onClick={openCreateModal}>
          <Plus size={18} className="me-1" /> Nueva Marca
        </button>
      </div>

      {/* TABLA DESKTOP */}
      <div className="table-responsive d-none d-md-block">
        <table className="table align-middle">
          <thead>
            <tr className="text-secondary small">
              <th>ID</th>
              <th>NOMBRE MARCA</th>
              <th>ID EMPRESA</th>
              <th>FECHA CREACIÓN</th>
              <th>ÚLTIMA ACTUALIZACIÓN</th>
              <th className="text-end">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {marcas.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-secondary py-4">
                  No hay marcas registradas
                </td>
              </tr>
            ) : (
              marcas.map((marca) => (
                <tr key={marca.id_marca}>
                  <td className="text-secondary">{marca.id_marca}</td>
                  <td className="fw-bold">{marca.nombre_marca}</td>
                  <td className="text-secondary">{marca.id_empresa}</td>
                  <td className="text-secondary">{formatDate(marca.created_at)}</td>
                  <td className="text-secondary">{formatDate(marca.updated_at)}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-link text-dark p-1"
                      onClick={() => openEditModal(marca)}
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn btn-link text-danger p-1"
                      onClick={() => handleDelete(marca)}
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CARDS MOBILE */}
      <div className="d-md-none">
        {marcas.length === 0 ? (
          <div className="text-center text-secondary py-4">
            No hay marcas registradas
          </div>
        ) : (
          marcas.map((marca) => (
            <div key={marca.id_marca} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="mb-2">
                  <small className="text-secondary">Marca</small>
                  <div className="fw-bold">{marca.nombre_marca}</div>
                </div>

                <div className="mb-2">
                  <small className="text-secondary">ID Marca</small>
                  <div>{marca.id_marca}</div>
                </div>

                <div className="mb-2">
                  <small className="text-secondary">ID Empresa</small>
                  <div>{marca.id_empresa}</div>
                </div>

                <div className="mb-2">
                  <small className="text-secondary">Creada</small>
                  <div>{formatDate(marca.created_at)}</div>
                </div>

                <div className="mb-3">
                  <small className="text-secondary">Actualizada</small>
                  <div>{formatDate(marca.updated_at)}</div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => openEditModal(marca)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(marca)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <BradFormModal
          marca={selectedMarca}
          onSubmit={handleSubmit}
          onClose={closeModal}
          isLoading={formLoading}
        />
      )}
    </div>
  );
}

export default Brands;