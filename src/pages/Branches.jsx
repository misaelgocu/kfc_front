import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const branchesData = [
  {
    id: 'branch_1',
    name: 'KFC Reforma',
    code: 'MX001',
    brand: 'KFC Express',
    startDate: '2020-01-15',
  },
  {
    id: 'branch_2',
    name: 'KFC Polanco',
    code: 'MX002',
    brand: 'KFC Express',
    startDate: '2021-03-20',
  },
  {
    id: 'branch_3',
    name: 'KFC Santa Fe',
    code: 'MX003',
    brand: 'KFC Traditional',
    startDate: '2019-06-05',
  },
  {
    id: 'branch_4',
    name: 'KFC Bogotá Centro',
    code: 'CO001',
    brand: 'KFC Colombia Premium',
    startDate: '2022-01-01',
  },
];

function Branches() {
  return (
    <div className="container-fluid p-2 p-md-3">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Branches</h2>
          <small className="text-secondary">
            Manage physical restaurant locations
          </small>
        </div>

        <button className="btn btn-danger fw-semibold d-flex align-items-center gap-2">
          <Plus size={16} />
          Add Branch
        </button>
      </div>

      {/* ===================== */}
      {/* DESKTOP TABLE */}
      {/* ===================== */}
      <div className="table-responsive d-none d-md-block rounded-3 border shadow-sm overflow-hidden">
        <table className="table mb-0 align-middle">
          <thead>
            <tr className="small text-uppercase text-secondary">
              <th className="px-4 py-3">Branch Name</th>
              <th className="py-3">Code</th>
              <th className="py-3">Brand</th>
              <th className="py-3">Start Date</th>
              <th className="py-3 text-end px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branchesData.map((branch) => (
              <tr key={branch.id} className="border-top">
                <td className="px-4 py-3 fw-semibold">
                  {branch.name}
                </td>
                <td className="py-3">
                  {branch.code}
                </td>
                <td className="py-3">
                  {branch.brand}
                </td>
                <td className="py-3 text-secondary">
                  {branch.startDate}
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
        {branchesData.map((branch) => (
          <div key={branch.id} className="card mb-3 shadow-sm">
            <div className="card-body">

              <div className="mb-2">
                <small className="text-secondary">Branch</small>
                <div className="fw-bold">{branch.name}</div>
              </div>

              <div className="mb-2">
                <small className="text-secondary">Code</small>
                <div>{branch.code}</div>
              </div>

              <div className="mb-2">
                <small className="text-secondary">Brand</small>
                <div>{branch.brand}</div>
              </div>

              <div className="mb-3">
                <small className="text-secondary">Start Date</small>
                <div className="text-secondary">{branch.startDate}</div>
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

export default Branches;
