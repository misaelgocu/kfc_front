import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
} from '../api/empresas.api';
import CompanyForm from '../components/forms/CompanyFormModal';

function Companies() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // ========== CARGAR EMPRESAS ==========
  const fetchEmpresas = async () => {
    try {
      setLoading(true);
      const response = await getEmpresas();
      setEmpresas(response.data);
    } catch (error) {
      toast.error('Error al cargar empresas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  // ========== CREAR/ACTUALIZAR ==========
  const handleSubmit = async (data) => {
    try {
      setFormLoading(true);
      
      // Agregar created_at si es una nueva empresa
      const formData = {
        ...data,
        created_at: selectedEmpresa?.created_at || new Date().toISOString(),
      };

      if (selectedEmpresa) {
        // Actualizar
        await updateEmpresa(selectedEmpresa.id_empresa, formData);
        toast.success('Empresa actualizada correctamente');
      } else {
        // Crear
        await createEmpresa(formData);
        toast.success('Empresa creada correctamente');
      }
      
      setShowModal(false);
      setSelectedEmpresa(null);
      fetchEmpresas();
    } catch (error) {
      const errorMsg = error.response?.data?.nombre_empresa?.[0] 
        || 'Error al guardar empresa';
      toast.error(errorMsg);
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  // ========== ELIMINAR ==========
  const handleDelete = async (empresa) => {
    if (!window.confirm(`¿Eliminar "${empresa.nombre_empresa}"?`)) return;

    try {
      await deleteEmpresa(empresa.id_empresa);
      toast.success('Empresa eliminada');
      fetchEmpresas();
    } catch (error) {
      toast.error('Error al eliminar empresa');
      console.error(error);
    }
  };

  // ========== ABRIR MODAL ==========
  const openCreateModal = () => {
    setSelectedEmpresa(null);
    setShowModal(true);
  };

  const openEditModal = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
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
          <h2 className="fw-bold m-0">Empresas</h2>
          <small className="text-secondary">
            Gestiona las empresas del sistema ({empresas.length})
          </small>
        </div>
        <button className="btn btn-danger fw-bold" onClick={openCreateModal}>
          <Plus size={18} className="me-1" /> Nueva Empresa
        </button>
      </div>

      {/* TABLA DESKTOP */}
      <div className="table-responsive d-none d-md-block">
        <table className="table align-middle">
          <thead>
            <tr className="text-secondary small">
              <th>ID</th>
              <th>NOMBRE EMPRESA</th>
              <th>FECHA CREACIÓN</th>
              <th>ÚLTIMA ACTUALIZACIÓN</th>
              <th className="text-end">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {empresas.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-secondary py-4">
                  No hay empresas registradas
                </td>
              </tr>
            ) : (
              empresas.map((empresa) => (
                <tr key={empresa.id_empresa}>
                  <td className="text-secondary">{empresa.id_empresa}</td>
                  <td className="fw-bold">{empresa.nombre_empresa}</td>
                  <td className="text-secondary">{formatDate(empresa.created_at)}</td>
                  <td className="text-secondary">{formatDate(empresa.updated_at)}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-link text-dark p-1"
                      onClick={() => openEditModal(empresa)}
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn btn-link text-danger p-1"
                      onClick={() => handleDelete(empresa)}
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
        {empresas.length === 0 ? (
          <div className="text-center text-secondary py-4">
            No hay empresas registradas
          </div>
        ) : (
          empresas.map((empresa) => (
            <div key={empresa.id_empresa} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="mb-2">
                  <small className="text-secondary">Empresa</small>
                  <div className="fw-bold">{empresa.nombre_empresa}</div>
                </div>

                <div className="mb-2">
                  <small className="text-secondary">ID</small>
                  <div>{empresa.id_empresa}</div>
                </div>

                <div className="mb-2">
                  <small className="text-secondary">Creada</small>
                  <div>{formatDate(empresa.created_at)}</div>
                </div>

                <div className="mb-3">
                  <small className="text-secondary">Actualizada</small>
                  <div>{formatDate(empresa.updated_at)}</div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => openEditModal(empresa)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(empresa)}
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
        <CompanyForm
          empresa={selectedEmpresa}
          onSubmit={handleSubmit}
          onClose={closeModal}
          isLoading={formLoading}
        />
      )}
    </div>
  );
}

export default Companies;