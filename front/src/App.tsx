import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { IconPlane, IconUsers, IconReport, IconHome, IconLogout, IconTools } from '@tabler/icons-react';

import Home from './pages/Home';
import Aeronaves from './pages/Aeronaves';
import Login from './pages/Login';
import Funcionarios from './pages/Funcionarios';
import Operacoes from './pages/Operacoes';
import Relatorios from './pages/Relatorios';

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={`nav-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAppContext();
  const [logoClicks, setLogoClicks] = useState(0);
  const [isFlaming, setIsFlaming] = useState(false);
  
  if (!user) return <Navigate to="/login" />;

  const handleLogoClick = () => {
    setLogoClicks(prev => prev + 1);
    if (logoClicks + 1 === 7) {
      setIsFlaming(true);
      // Som removido conforme solicitado para manter apenas o efeito visual
      setTimeout(() => {
        setIsFlaming(false);
        setLogoClicks(0);
      }, 3000);
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer', position: 'relative' }}>
          <img 
            src="/logo-dragao.png" 
            alt="Logo" 
            style={{ 
              height: '40px', 
              width: 'auto',
              filter: isFlaming ? 'drop-shadow(0 0 15px #00D1FF) drop-shadow(0 0 30px #0044ff)' : 'none',
              transition: 'filter 0.3s ease',
              transform: isFlaming ? 'scale(1.1)' : 'scale(1)'
            }} 
          />
          <span style={{ 
            color: isFlaming ? '#00D1FF' : 'inherit', 
            transition: 'all 0.3s', 
            fontWeight: isFlaming ? 900 : 'inherit',
            letterSpacing: isFlaming ? '3px' : 'normal'
          }}>
            {isFlaming ? 'DRAKOSYS!' : 'AEROCODE'}
          </span>
          {isFlaming && (
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '25px',
              fontSize: '14px',
              color: '#00D1FF',
              fontWeight: 900,
              animation: 'fadeUp 1.5s forwards',
              textShadow: '0 0 10px #00D1FF'
            }}>
              🚀 TURBO!
            </div>
          )}
        </div>        
        {/*TOTODILE*/}
        <div className="topbar-user">
          <span>{user.nome}</span>
          <button className="btn btn-sm" onClick={logout}>
            <IconLogout size={16} />
            Sair
          </button>
        </div>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <span className="sidebar-label">Navegação</span>
            <NavItem to="/" icon={<IconHome size={18} />} label="Início" />
            <NavItem to="/aeronaves" icon={<IconPlane size={18} />} label="Aeronaves" />
            <NavItem to="/operacoes" icon={<IconTools size={18} />} label="Operações" />
          </div>
          <div className="sidebar-section">
            <span className="sidebar-label">Relatórios</span>
            <NavItem to="/relatorios" icon={<IconReport size={18} />} label="Relatórios" />
          </div>
          {user.NivelAcesso === 0 && (
            <div className="sidebar-section">
              <span className="sidebar-label">Administração</span>
              <NavItem to="/funcionarios" icon={<IconUsers size={18} />} label="Funcionários" />
            </div>
          )}
        </aside>
        <main className="content">
          {children}
        </main>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 1; transform: translateY(0) scale(0.8); }
          50% { opacity: 1; transform: translateY(-15px) scale(1.2); }
          to { opacity: 0; transform: translateY(-40px) scale(1); }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/aeronaves" element={<Layout><Aeronaves /></Layout>} />
        <Route path="/operacoes" element={<Layout><Operacoes /></Layout>} />
        <Route path="/funcionarios" element={<Layout><Funcionarios /></Layout>} />
        <Route path="/relatorios" element={<Layout><Relatorios /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
