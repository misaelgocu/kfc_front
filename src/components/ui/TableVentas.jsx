import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { getVentas } from '../../api/ventas.api.js';

// Helper para formatear moneda (Buenas prácticas de UX)
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

function TableVentas() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVentas() {
      try {
        const res = await getVentas();
        // Axios guarda la respuesta en res.data
        setVentas(res.data);
      } catch (error) {
        console.error("Error al cargar ventas:", error);
      } finally {
        setLoading(false);
      }
    }
    loadVentas();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className='d-flex flex-column w-100'>
      {/* FILTERS (Se mantienen igual) */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-4">
              <label className="form-label small text-secondary">Company</label>
              <select className="form-select"><option>All Companies</option></select>
            </div>
            <div className="col-6 col-md-4">
              <label className="form-label small text-secondary">From</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-6 col-md-4">
              <label className="form-label small text-secondary">To</label>
              <input type="date" className="form-control" />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="table-responsive d-none d-md-block rounded-3 border shadow-sm overflow-hidden">
        <table className="table mb-0 align-middle">
          <thead>
            <tr className="small text-uppercase text-secondary">
              <th className="px-4 py-3">Date</th>
              <th className="py-3">Branch ID</th>
              <th className="py-3 text-end">Net Sales</th>
              <th className="py-3 text-end">Tax (IVA)</th>
              <th className="py-3 text-end">Discounts</th>
              <th className="py-3 text-end px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((sale) => (
              <tr key={sale.id_dft} className="border-top">
                <td className="px-4 py-3">{sale.fecha}</td>
                <td className="py-3">Sucursal {sale.id_sucursal}</td>
                <td className="py-3 text-end fw-semibold">
                  {formatCurrency(sale.vtas_netas)}
                </td>
                <td className="py-3 text-end">
                  {formatCurrency(sale.total_iva_por_pagar)}
                </td>
                <td className="py-3 text-end text-danger">
                  -{formatCurrency(sale.descuentos)}
                </td>
                <td className="py-3 text-end px-4">
                  <button className="btn btn-link p-1 me-2"><Pencil size={16} /></button>
                  <button className="btn btn-link text-danger p-1"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="d-md-none">
        {ventas.map((sale) => (
          <div key={sale.id_dft} className="card mb-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <small className="text-secondary">{sale.fecha}</small>
                <span className="badge bg-light text-dark">ID: {sale.id_sucursal}</span>
              </div>
              <div className="mb-2">
                <small className="d-block text-secondary">Net Sales</small>
                <div className="fw-bold">{formatCurrency(sale.vtas_netas)}</div>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <small className="text-secondary">Tax</small>
                  <div>{formatCurrency(sale.total_iva_por_pagar)}</div>
                </div>
                <div className="col-6 mb-2">
                  <small className="text-secondary">Discounts</small>
                  <div className="text-danger">-{formatCurrency(sale.descuentos)}</div>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-2">
                <button className="btn btn-outline-dark btn-sm"><Pencil size={16} /></button>
                <button className="btn btn-outline-danger btn-sm"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TableVentas;