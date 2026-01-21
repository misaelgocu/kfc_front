import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  getSucursales,
  createSucursal,
  updateSucursal,
  deleteSucursal,
} from "../api/sucursales.api";
import BranchFormModal from "../components/forms/BranchFormModal";

function Branches() {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // ========== CARGAR SUCURSALES ==========
  const fetchSucursales = async () => {
    try {
      setLoading(true);
      const response = await getSucursales();
      setSucursales(response.data);
    } catch (error) {
      toast.error("Error al cargar sucursales");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSucursales();
  }, []);

  // ========== CREAR/ACTUALIZAR ==========
  const handleSubmit = async (data) => {
    try {
      setFormLoading(true);

      // Convertir valores vacíos a null para campos opcionales
      const formData = {
        ...data,
        fecha_inicio_suc: data.fecha_inicio_suc || null,
        fecha_fin_suc: data.fecha_fin_suc || null,
      };

      if (selectedSucursal) {
        await updateSucursal(selectedSucursal.id_sucursal, formData);
        toast.success("Sucursal actualizada correctamente");
      } else {
        await createSucursal(formData);
        toast.success("Sucursal creada correctamente");
      }

      setShowModal(false);
      setSelectedSucursal(null);
      fetchSucursales();
    } catch (error) {
      const errorMsg =
        error.response?.data?.cc_suc?.[0] ||
        error.response?.data?.id_marca?.[0] ||
        "Error al guardar sucursal";
      toast.error(errorMsg);
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  // ========== ELIMINAR ==========
  const handleDelete = async (sucursal) => {
    if (!window.confirm(`¿Eliminar sucursal "${sucursal.nombre_sucursal}"?`))
      return;

    try {
      await deleteSucursal(sucursal.id_sucursal);
      toast.success("Sucursal eliminada");
      fetchSucursales();
    } catch (error) {
      toast.error("Error al eliminar sucursal");
      console.error(error);
    }
  };

  // ========== ABRIR MODAL ==========
  const openCreateModal = () => {
    setSelectedSucursal(null);
    setShowModal(true);
  };

  const openEditModal = (sucursal) => {
    setSelectedSucursal(sucursal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSucursal(null);
  };

  // ========== FORMATEAR FECHA ==========
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-MX");
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
          <h2 className="fw-bold m-0">Sucursales</h2>
          <small className="text-secondary">
            Gestiona las sucursales del sistema ({sucursales.length})
          </small>
        </div>
        <button className="btn btn-danger fw-bold" onClick={openCreateModal}>
          <Plus size={18} className="me-1" /> Nueva Sucursal
        </button>
      </div>

      {/* TABLA DESKTOP */}
      <div className="table-responsive d-none d-md-block">
        <table className="table align-middle">
          <thead>
            <tr className="text-secondary small">
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CC SUC</th>
              <th>COMPAÑÍA</th>
              <th>ID MARCA</th>
              <th>CREADA</th>
              <th className="text-end">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-secondary py-4">
                  No hay sucursales registradas
                </td>
              </tr>
            ) : (
              sucursales.map((sucursal) => (
                <tr key={sucursal.id_sucursal}>
                  <td className="text-secondary">{sucursal.id_sucursal}</td>
                  <td className="fw-bold">{sucursal.nombre_sucursal}</td>
                  <td className="text-secondary">{sucursal.cc_suc}</td>
                  <td className="text-secondary">{sucursal.compania}</td>
                  <td className="text-secondary">{sucursal.id_marca}</td>
                  <td className="text-secondary">
                    {formatDate(sucursal.created_at)}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-link text-dark p-1"
                      onClick={() => openEditModal(sucursal)}
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn btn-link text-danger p-1"
                      onClick={() => handleDelete(sucursal)}
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
        {sucursales.length === 0 ? (
          <div className="text-center text-secondary py-4">
            No hay sucursales registradas
          </div>
        ) : (
          sucursales.map((sucursal) => (
            <div key={sucursal.id_sucursal} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="mb-2">
                  <small className="text-secondary">Sucursal</small>
                  <div className="fw-bold">{sucursal.nombre_sucursal}</div>
                </div>

                <div className="row mb-2">
                  <div className="col-6">
                    <small className="text-secondary">CC SUC</small>
                    <div>{sucursal.cc_suc}</div>
                  </div>
                  <div className="col-6">
                    <small className="text-secondary">Compañía</small>
                    <div>{sucursal.compania}</div>
                  </div>
                </div>

                <div className="mb-2">
                  <small className="text-secondary">ID Marca</small>
                  <div>{sucursal.id_marca}</div>
                </div>

                <div className="mb-3">
                  <small className="text-secondary">Creada</small>
                  <div>{formatDate(sucursal.created_at)}</div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => openEditModal(sucursal)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(sucursal)}
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
        <BranchFormModal
          sucursal={selectedSucursal}
          onSubmit={handleSubmit}
          onClose={closeModal}
          isLoading={formLoading}
        />
      )}
    </div>
  );
}
export default Branches;
