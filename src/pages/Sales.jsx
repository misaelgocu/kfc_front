import React, {useState} from 'react';
import { Plus, Pencil, Trash2, DollarSign, Percent } from 'lucide-react';
import TableVentas from '../components/ui/TableVentas.jsx';
import KPICardsVentas from '../components/ui/KPICardsVentas.jsx';
import SaleFormModal from '../components/forms/SaleFormModal.jsx';



function Sales() {

  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <button 
        onClick={() => setIsModalOpen(true)}
        className="btn btn-danger fw-semibold d-flex align-items-center gap-2">
          <Plus size={16} />
          Add Sale
        </button>
      </div>

      <div className="row g-3 mb-4">
        <KPICardsVentas/>
      </div>
      {/* ===================== */}
      <TableVentas />
      <SaleFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default Sales;
