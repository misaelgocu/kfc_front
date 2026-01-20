import React, { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function MainLayout() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const isMobile = window.innerWidth <= 768;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex min-vh-100 w-100 position-relative overflow-hidden bg-light">
      
      {/* 1. Sidebar */}
      <aside 
        style={{ 
          // El ancho estructural siempre es 280px para que el contenido no se borre
          width: '280px', 
          minWidth: '280px',
          height: '100vh',
          // En escritorio, si está cerrado, usamos margen negativo para eliminar el espacio
          marginLeft: !isOpen && !isMobile ? '-280px' : '0',
          // En móvil, usamos la posición left para el efecto overlay
          left: isMobile ? (isOpen ? '0' : '-280px') : '0',
          transition: 'margin-left 0.3s ease, left 0.3s ease',
          zIndex: 1050,
          position: isMobile ? 'fixed' : 'relative',
          top: 0
        }}
        className="d-flex flex-column bg-white border-end shadow-sm"
      >
        <AppSidebar />
        
        {isMobile && isOpen && (
          <button 
            onClick={toggleSidebar}
            className="btn btn-dark position-absolute top-0 end-0 m-2"
            style={{ zIndex: 1060 }}
          >
            <X size={20} />
          </button>
        )}
      </aside>

      {/* 2. Overlay (Solo móvil) */}
      {isOpen && isMobile && (
        <div 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1040,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* 3. Área de Contenido */}
      <div className="flex-grow-1 d-flex flex-column min-w-0">
        <header className="d-flex align-items-center px-3 border-bottom bg-white sticky-top" style={{ height: '56px' }}>
          <button onClick={toggleSidebar} className="btn btn-light border-0 p-2 me-2">
            <Menu size={20} />
          </button>
          <span className="fw-bold text-truncate">KFC Enterprise Dashboard</span>
        </header>

        <main className="p-3 p-md-4 flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}