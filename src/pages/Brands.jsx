import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const brandsData = [
  {
    id: 'brand_1',
    name: 'KFC Express',
    company: 'KFC México',
    created: '1/20/2026',
  },
  {
    id: 'brand_2',
    name: 'KFC Traditional',
    company: 'KFC México',
    created: '1/20/2026',
  },
  {
    id: 'brand_3',
    name: 'KFC Colombia Premium',
    company: 'KFC Colombia',
    created: '1/20/2026',
  },
];

function Brands() {
  return (
    <div className="container-fluid p-2 p-md-3">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Brands</h2>
          <small className="text-secondary">
            Manage brands linked to your companies
          </small>
        </div>

        <button className="btn btn-danger fw-semibold d-flex align-items-center gap-2">
          <Plus size={16} />
          Add Brand
        </button>
      </div>

      {/* ===================== */}
      {/* DESKTOP TABLE */}
      {/* ===================== */}
      <div className="table-responsive d-none d-md-block rounded-3 border shadow-sm overflow-hidden">
        <table className="table mb-0 align-middle">
          <thead>
            <tr className="small text-uppercase text-secondary">
              <th className="px-4 py-3">Brand Name</th>
              <th className="py-3">Company</th>
              <th className="py-3">ID</th>
              <th className="py-3">Created</th>
              <th className="py-3 text-end px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brandsData.map((brand) => (
              <tr key={brand.id} className="border-top">
                <td className="px-4 py-3 fw-semibold">
                  {brand.name}
                </td>
                <td className="py-3">
                  {brand.company}
                </td>
                <td className="py-3 text-secondary">
                  {brand.id}
                </td>
                <td className="py-3 text-secondary">
                  {brand.created}
                </td>
                <td className="py-3 text-end px-4">
                  <button
                    className="btn btn-link p-1 me-2"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-link text-danger p-1"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================== */}
      {/* MOBILE CARDS */}
      {/* ===================== */}
      <div className="d-md-none">
        {brandsData.map((brand) => (
          <div key={brand.id} className="card mb-3 shadow-sm">
            <div className="card-body">

              <div className="mb-2">
                <small className="text-secondary">Brand</small>
                <div className="fw-bold">{brand.name}</div>
              </div>

              <div className="mb-2">
                <small className="text-secondary">Company</small>
                <div>{brand.company}</div>
              </div>

              <div className="mb-2">
                <small className="text-secondary">ID</small>
                <div className="text-secondary">{brand.id}</div>
              </div>

              <div className="mb-3">
                <small className="text-secondary">Created</small>
                <div className="text-secondary">{brand.created}</div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-dark btn-sm"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Brands;
