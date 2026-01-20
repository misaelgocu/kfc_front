import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';

const companiesData = [
  { id: 'comp_1', name: 'KFC México', created: '1/20/2026' },
  { id: 'comp_2', name: 'KFC Colombia', created: '1/20/2026' },
];

function Companies() {
  const [companies, setCompanies] = useState(companiesData);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (company) => {
    setEditingId(company.id);
    setEditValue(company.name);
  };

  const saveEdit = (id) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, name: editValue } : c
      )
    );
    setEditingId(null);
  };

  return (
    <div className="container-fluid p-2">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold m-0">Companies</h2>
          <small className="text-secondary">Manage your enterprise entities</small>
        </div>
        <button className="btn btn-danger fw-bold">
          <Plus size={18} className="me-1" /> Add Company
        </button>
      </div>

      {/* ===================== */}
      {/* DESKTOP TABLE */}
      {/* ===================== */}
      <div className="table-responsive d-none d-md-block">
        <table className="table align-middle">
          <thead>
            <tr className="text-secondary small">
              <th>COMPANY NAME</th>
              <th>ID</th>
              <th>CREATED</th>
              <th className="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>
                  {editingId === company.id ? (
                    <input
                      className="form-control form-control-sm"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    company.name
                  )}
                </td>
                <td className="text-secondary">{company.id}</td>
                <td className="text-secondary">{company.created}</td>
                <td className="text-end">
                  {editingId === company.id ? (
                    <>
                      <button
                        className="btn btn-link text-success p-1"
                        onClick={() => saveEdit(company.id)}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        className="btn btn-link text-secondary p-1"
                        onClick={() => setEditingId(null)}
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-link text-dark p-1"
                        onClick={() => startEdit(company)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button className="btn btn-link text-danger p-1">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
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
        {companies.map((company) => (
          <div key={company.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <div className="mb-2">
                <small className="text-secondary">Company</small>
                {editingId === company.id ? (
                  <input
                    className="form-control form-control-sm"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  <div className="fw-bold">{company.name}</div>
                )}
              </div>

              <div className="mb-2">
                <small className="text-secondary">ID</small>
                <div>{company.id}</div>
              </div>

              <div className="mb-3">
                <small className="text-secondary">Created</small>
                <div>{company.created}</div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                {editingId === company.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => saveEdit(company.id)}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => startEdit(company)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;
