import React from 'react';
import { useAppContext } from '../context/AppContext';
import { IconPlane, IconTools, IconReport, IconUsers, IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, aeronaves } = useAppContext();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '3px', margin: 0 }}>DRAKOSYS AEROCODE</h1>
        <p style={{ color: 'var(--color-accent)', fontWeight: 700, marginTop: '5px' }}>SISTEMA DE GESTÃO AERONÁUTICA INDUSTRIAL</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--color-accent)', padding: '30px' }}>
        <h2 style={{ fontSize: '20px', margin: '0 0 10px 0' }}>BEM-VINDO, {user?.nome.toUpperCase()}</h2>
        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Você está conectado ao terminal de controle DrakoSys. Utilize o menu lateral ou os atalhos abaixo para navegar.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/aeronaves')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <IconPlane size={32} color="var(--color-accent)" />
            <IconArrowRight size={20} color="#333" />
          </div>
          <h3 style={{ margin: '15px 0 5px 0' }}>FROTA</h3>
          <p style={{ color: '#666', fontSize: '12px' }}>Gerencie as {aeronaves.length} aeronaves cadastradas no sistema.</p>
        </div>

        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/operacoes')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <IconTools size={32} color="var(--color-accent)" />
            <IconArrowRight size={20} color="#333" />
          </div>
          <h3 style={{ margin: '15px 0 5px 0' }}>OPERAÇÕES</h3>
          <p style={{ color: '#666', fontSize: '12px' }}>Controle de peças, etapas de produção e testes de qualidade.</p>
        </div>

        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/relatorios')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <IconReport size={32} color="var(--color-accent)" />
            <IconArrowRight size={20} color="#333" />
          </div>
          <h3 style={{ margin: '15px 0 5px 0' }}>RELATÓRIOS</h3>
          <p style={{ color: '#666', fontSize: '12px' }}>Acesse as métricas de performance e exporte dados técnicos.</p>
        </div>

        {user?.NivelAcesso === 0 && (
          <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/funcionarios')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <IconUsers size={32} color="var(--color-accent)" />
              <IconArrowRight size={20} color="#333" />
            </div>
            <h3 style={{ margin: '15px 0 5px 0' }}>EQUIPE</h3>
            <p style={{ color: '#666', fontSize: '12px' }}>Administração de usuários e níveis de acesso ao sistema.</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: '4rem', padding: '20px', textAlign: 'center', borderTop: '1px solid #111' }}>
        <p style={{ fontSize: '10px', color: '#222', letterSpacing: '2px' }}>DRAKOSYS INDUSTRIAL SYSTEMS v1.0.0 — SECURE TERMINAL</p>
      </div>
    </div>
  );
};

export default Home;
