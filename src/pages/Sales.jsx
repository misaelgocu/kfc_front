import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { getVentasCompletas } from '../api/ventas.api';

function Sales() {
  const [ventas, setVentas] = useState([]);
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    ventasNetas: 0,
    promedio: 0,
  });

  // ========== CARGAR VENTAS ==========
  const fetchVentas = async () => {
    try {
      setLoading(true);
      const response = await getVentasCompletas();
      const data = response.data;
      setVentas(data);
      setFilteredVentas(data);
      
      // Calcular estadísticas
      const totalVentas = data.reduce((sum, v) => sum + parseFloat(v.vtas_netas || 0), 0);
      setStats({
        total: data.length,
        ventasNetas: totalVentas,
        promedio: data.length > 0 ? totalVentas / data.length : 0,
      });
    } catch (error) {
      toast.error('Error al cargar ventas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  // ========== BUSCAR ==========
  useEffect(() => {
    const filtered = ventas.filter((venta) => {
      const searchLower = searchTerm.toLowerCase();
      const sucursal = venta.sucursal?.nombre_sucursal || '';
      const marca = venta.sucursal?.marca?.nombre_marca || '';
      const empresa = venta.sucursal?.marca?.empresa?.nombre_empresa || '';
      
      return (
        sucursal.toLowerCase().includes(searchLower) ||
        marca.toLowerCase().includes(searchLower) ||
        empresa.toLowerCase().includes(searchLower) ||
        venta.periodo?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredVentas(filtered);
  }, [searchTerm, ventas]);

  // ========== FORMATEAR ==========
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-MX');
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
      <div className="mb-4">
        <h2 className="fw-bold m-0">Ventas</h2>
        <small className="text-secondary">
          Consulta el histórico de ventas
        </small>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="p-3 bg-danger bg-opacity-10 rounded me-3">
                  <TrendingUp className="text-danger" size={24} />
                </div>
                <div>
                  <small className="text-secondary">Total Registros</small>
                  <h4 className="fw-bold m-0">{stats.total.toLocaleString()}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="p-3 bg-success bg-opacity-10 rounded me-3">
                  <DollarSign className="text-success" size={24} />
                </div>
                <div>
                  <small className="text-secondary">Ventas Netas Totales</small>
                  <h4 className="fw-bold m-0">{formatCurrency(stats.ventasNetas)}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="p-3 bg-primary bg-opacity-10 rounded me-3">
                  <Calendar className="text-primary" size={24} />
                </div>
                <div>
                  <small className="text-secondary">Promedio por Venta</small>
                  <h4 className="fw-bold m-0">{formatCurrency(stats.promedio)}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text bg-white">
            <Search size={18} className="text-secondary" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por sucursal, marca, empresa o periodo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <small className="text-secondary">
          Mostrando {filteredVentas.length} de {ventas.length} registros
        </small>
      </div>

      {/* TABLA DESKTOP */}
      <div className="table-responsive d-none d-md-block">
        <table className="table align-middle">
          <thead>
            <tr className="text-secondary small">
              <th>ID</th>
              <th>FECHA</th>
              <th>PERIODO</th>
              <th>SUCURSAL</th>
              <th>MARCA</th>
              <th>EMPRESA</th>
              <th className="text-end">VENTAS NETAS</th>
            </tr>
          </thead>
          <tbody>
            {filteredVentas.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-secondary py-4">
                  {searchTerm ? 'No se encontraron resultados' : 'No hay ventas registradas'}
                </td>
              </tr>
            ) : (
              filteredVentas.map((venta) => (
                <tr key={venta.id_dft}>
                  <td className="text-secondary">{venta.id_dft}</td>
                  <td>{formatDate(venta.fecha)}</td>
                  <td className="text-secondary">{venta.periodo || '-'}</td>
                  <td>{venta.sucursal?.nombre_sucursal || '-'}</td>
                  <td className="text-secondary">
                    {venta.sucursal?.marca?.nombre_marca || '-'}
                  </td>
                  <td className="text-secondary">
                    {venta.sucursal?.marca?.empresa?.nombre_empresa || '-'}
                  </td>
                  <td className="text-end fw-bold text-success">
                    {formatCurrency(venta.vtas_netas)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CARDS MOBILE */}
      <div className="d-md-none">
        {filteredVentas.length === 0 ? (
          <div className="text-center text-secondary py-4">
            {searchTerm ? 'No se encontraron resultados' : 'No hay ventas registradas'}
          </div>
        ) : (
          filteredVentas.map((venta) => (
            <div key={venta.id_dft} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <small className="text-secondary">ID: {venta.id_dft}</small>
                    <div className="fw-bold">{venta.sucursal?.nombre_sucursal || '-'}</div>
                  </div>
                  <span className="badge bg-success fs-6">
                    {formatCurrency(venta.vtas_netas)}
                  </span>
                </div>

                <div className="row mb-2">
                  <div className="col-6">
                    <small className="text-secondary">Fecha</small>
                    <div>{formatDate(venta.fecha)}</div>
                  </div>
                  <div className="col-6">
                    <small className="text-secondary">Periodo</small>
                    <div>{venta.periodo || '-'}</div>
                  </div>
                </div>

                <div className="mb-2">
                  <small className="text-secondary">Marca</small>
                  <div>{venta.sucursal?.marca?.nombre_marca || '-'}</div>
                </div>

                <div>
                  <small className="text-secondary">Empresa</small>
                  <div>{venta.sucursal?.marca?.empresa?.nombre_empresa || '-'}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sales;