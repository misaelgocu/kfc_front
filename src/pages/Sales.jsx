import React from 'react';
import { Plus, Pencil, Trash2, DollarSign, Percent } from 'lucide-react';
import TableVentas from '../components/ui/TableVentas.jsx';

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
      <TableVentas />
    </div>
  );
}

export default Sales;
