import React, { useEffect, useState } from 'react';
import { DollarSign, Percent } from 'lucide-react';
import { getVentas } from '../../api/ventas.api.js';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

function KPICards() {
  const [stats, setStats] = useState({ totalNet: 0, totalTax: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKpiData() {
      try {
        const res = await getVentas();
        const data = res.data;

        // Calculamos los totales sumando cada registro de la API
        const totals = data.reduce((acc, curr) => {
          return {
            // Usamos parseFloat porque los valores vienen como strings ("61699.25")
            totalNet: acc.totalNet + parseFloat(curr.vtas_netas || 0),
            totalTax: acc.totalTax + parseFloat(curr.total_iva_por_pagar || 0)
          };
        }, { totalNet: 0, totalTax: 0 });

        setStats(totals);
      } catch (error) {
        console.error("Error al cargar KPIs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadKpiData();
  }, []);

  // Definimos la estructura de las cards basándonos en los resultados
  const salesStats = [
    {
      label: 'Total Net Sales',
      value: formatCurrency(stats.totalNet),
      icon: DollarSign,
      color: 'text-success'
    },
    {
      label: 'Total Tax (IVA)',
      value: formatCurrency(stats.totalTax),
      icon: Percent,
      color: 'text-primary'
    },
  ];

  if (loading) {
    return (
      <div className="row g-3 mb-4">
        <div className="col-12 text-center p-3">Cargando indicadores...</div>
      </div>
    );
  }

  return (
    <div className="row g-3 mb-4">
      {salesStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="col-12 col-md-6">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-uppercase fw-bold text-secondary" style={{ fontSize: '0.75rem' }}>
                    {stat.label}
                  </small>
                  <h3 className="fw-bold mb-0 mt-1">
                    {stat.value}
                  </h3>
                  <small className="text-muted">
                    Acumulado actual
                  </small>
                </div>
                <div className={`p-3 rounded-circle bg-light ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KPICards;