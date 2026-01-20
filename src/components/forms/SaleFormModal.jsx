import React, { useState } from 'react';
import { X } from 'lucide-react';

function SaleFormModal({ isOpen, onClose, onRefresh }) {
  // Estado local para los campos del formulario coincidiendo con tu API
  const [formData, setFormData] = useState({
    fecha: '',
    id_sucursal: '',
    vtas_netas: '',
    descuentos: '0',
    total_iva_por_pagar: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí llamarías a createVenta(formData) de tu ventas.api.js
    console.log("Enviando a API:", formData);
    onClose(); // Cerramos el modal
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title fw-bold">Add New Sale</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold">Date</label>
                  <input 
                    type="date" className="form-control" required
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold">Branch ID</label>
                  <input 
                    type="number" className="form-control" placeholder="Ex: 2" required
                    onChange={(e) => setFormData({...formData, id_sucursal: e.target.value})}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold">Net Sales</label>
                  <input 
                    type="number" step="0.01" className="form-control" placeholder="0.00" required
                    onChange={(e) => setFormData({...formData, vtas_netas: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-danger px-4">Save Sale</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaleFormModal;