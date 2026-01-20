import React from 'react';
import {
  Building2,
  Tags,
  MapPin,
  DollarSign,
  CreditCard,
  TrendingUp,
  Percent,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Companies',
    value: '2',
    subtitle: 'Active enterprises',
    icon: Building2,
  },
  {
    label: 'Total Brands',
    value: '3',
    subtitle: 'Registered brands',
    icon: Tags,
  },
  {
    label: 'Total Branches',
    value: '4',
    subtitle: 'Operating locations',
    icon: MapPin,
  },
  {
    label: 'Total Transactions',
    value: '5',
    subtitle: 'Sales records',
    icon: CreditCard,
  },
  {
    label: 'Total Net Sales',
    value: '$238,000.50',
    subtitle: '+12.5% from last period',
    icon: TrendingUp,
    highlight: true,
  },
  {
    label: 'Total Tax (IVA)',
    value: '$38,080.08',
    subtitle: 'Total IVA collected',
    icon: Percent,
  },
  {
    label: 'Total Discounts',
    value: '$2,950.00',
    subtitle: 'Applied discounts',
    icon: DollarSign,
  },
];

function Dashboard() {
  return (
    <div className="container-fluid p-2 p-md-3">

      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Dashboard</h2>
        <small className="text-secondary">
          Overview of your enterprise operations
        </small>
      </div>

      {/* ===================== */}
      {/* KPI GRID */}
      {/* ===================== */}
      <div className="row g-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={
                stat.label === 'Total Net Sales'
                  ? 'col-12 col-lg-6'
                  : 'col-12 col-sm-6 col-lg-3'
              }
            >
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex justify-content-between align-items-start">

                  <div>
                    <small className="text-secondary">
                      {stat.label}
                    </small>

                    <h4 className="fw-bold mb-1">
                      {stat.value}
                    </h4>

                    <small
                      className={
                        stat.highlight
                          ? 'text-success'
                          : 'text-secondary'
                      }
                    >
                      {stat.subtitle}
                    </small>
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: 42,
                      height: 42,
                      backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    }}
                  >
                    <Icon size={20} className="text-danger" />
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Dashboard;
