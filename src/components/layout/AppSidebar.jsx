import { Building2, Tags, MapPin, DollarSign, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigationItems = [
  // { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Companies', url: '/companies', icon: Building2 },
  { title: 'Brands', url: '/brands', icon: Tags },
  { title: 'Branches', url: '/branches', icon: MapPin },
  { title: 'Sales', url: '/sales', icon: DollarSign },
];

export function AppSidebar() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header del Sidebar */}
      <div className="p-3 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-danger text-white rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <span className="fw-bold h4 m-0">D</span>
          </div>
          <div>
            <h6 className="mb-0 fw-bold">ERP Demo</h6>
            <small className="text-muted">Sales Management</small>
          </div>
        </div>
      </div>

      {/* Navegación Principal */}
      <div className="flex-grow-1 overflow-auto py-3">
        <p className="px-4 text-uppercase text-muted fw-bold small mb-2" style={{ fontSize: '0.7rem' }}>
          Navigation
        </p>
        <nav className="nav flex-column px-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) => 
                `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${
                  isActive ? 'bg-danger text-white shadow-sm' : 'text-dark hover-bg-light'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      
      {/* Footer */}
      <div className="p-3 border-top text-center mt-auto">
        <small className="text-muted">© 2026 KFC Enterprise</small>
      </div>
    </div>
  );
}