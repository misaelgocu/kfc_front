import React from 'react';
import { Plus, Pencil, Trash2, DollarSign, Percent } from 'lucide-react';

const salesStats = [
  {
    label: 'Total Net Sales',
    value: '$238,000.50',
    icon: DollarSign,
  },
  {
    label: 'Total Tax (IVA)',
    value: '$38,080.08',
    icon: Percent,
  },
];

const salesData = [
  {
    id: 'sale_1',
    date: '2024-01-15',
    branch: 'KFC Reforma',
    net: '$45,000.50',
    tax: '$7,200.08',
    discount: '$500.00',
  },
  {
    id: 'sale_2',
    date: '2024-01-16',
    branch: 'KFC Reforma',
    net: '$52,000.00',
    tax: '$8,320.00',
    discount: '$750.00',
  },
];

function Sales() {
  return (
    <div className="container-fluid p-2 p-md-3">

      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Sales</h2>
          <small className="text-secondary">
            Manage daily transactions and revenue
          </small>
        </div>

        <button className="btn btn-danger fw-semibold d-flex align-items-center gap-2">
          <Plus size={16} />
          Add Sale
        </button>
      </div>

      {/* ===================== */}
      {/* KPI CARDS */}
      {/* ===================== */}
      <div className="row g-3 mb-4">
        {salesStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="col-12 col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-secondary">
                      {stat.label}
                    </small>
                    <h4 className="fw-bold mb-0">
                      {stat.value}
                    </h4>
                    <small className="text-secondary">
                      Filtered results
                    </small>
                  </div>
                  <Icon size={28} className="text-secondary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===================== */}
      {/* FILTERS */}
      {/* ===================== */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-4">
              <label className="form-label small text-secondary">
                Company
              </label>
              <select className="form-select">
                <option>All Companies</option>
              </select>
            </div>

            <div className="col-6 col-md-4">
              <label className="form-label small text-secondary">
                From
              </label>
              <input type="date" className="form-control" />
            </div>

            <div className="col-6 col-md-4">
              <label className="form-label small text-secondary">
                To
              </label>
              <input type="date" className="form-control" />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* DESKTOP TABLE */}
      {/* ===================== */}
      <div className="table-responsive d-none d-md-block rounded-3 border shadow-sm overflow-hidden">
        <table className="table mb-0 align-middle">
          <thead>
            <tr className="small text-uppercase text-secondary">
              <th className="px-4 py-3">Date</th>
              <th className="py-3">Branch</th>
              <th className="py-3 text-end">Net Sales</th>
              <th className="py-3 text-end">Tax</th>
              <th className="py-3 text-end">Discounts</th>
              <th className="py-3 text-end px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id} className="border-top">
                <td className="px-4 py-3">{sale.date}</td>
                <td className="py-3">{sale.branch}</td>
                <td className="py-3 text-end fw-semibold">{sale.net}</td>
                <td className="py-3 text-end">{sale.tax}</td>
                <td className="py-3 text-end">{sale.discount}</td>
                <td className="py-3 text-end px-4">
                  <button className="btn btn-link p-1 me-2">
                    <Pencil size={16} />
                  </button>
                  <button className="btn btn-link text-danger p-1">
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
        {salesData.map((sale) => (
          <div key={sale.id} className="card mb-3 shadow-sm">
            <div className="card-body">

              <div className="mb-2">
                <small className="text-secondary">Date</small>
                <div className="fw-semibold">{sale.date}</div>
              </div>

              <div className="mb-2">
                <small className="text-secondary">Branch</small>
                <div>{sale.branch}</div>
              </div>

              <div className="mb-2">
                <small className="text-secondary">Net Sales</small>
                <div className="fw-bold">{sale.net}</div>
              </div>

              <div className="mb-2">
                <small className="text-secondary">Tax</small>
                <div>{sale.tax}</div>
              </div>

              <div className="mb-3">
                <small className="text-secondary">Discounts</small>
                <div>{sale.discount}</div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-dark btn-sm">
                  <Pencil size={16} />
                </button>
                <button className="btn btn-outline-danger btn-sm">
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

export default Sales;
