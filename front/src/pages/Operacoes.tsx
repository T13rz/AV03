import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import PecaModule from '../components/PecaModule';
import EtapaModule from '../components/EtapaModule';
import TestesModule from '../components/TestesModule';
import { IconTools, IconHistory, IconFlask } from '@tabler/icons-react';

const Operacoes = () => {
  const { aeronaves } = useAppContext();
  const [selectedAero, setSelectedAero] = useState('');
  const [activeTab, setActiveTab] = useState('etapas');
  const aero = aeronaves.find(a => a.codigo === selectedAero);

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '2rem' }}>GERENCIAMENTO OPERACIONAL</h2>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <select className="btn" style={{ width: '100%' }} value={selectedAero} onChange={e => setSelectedAero(e.target.value)}>
          <option value="">— SELECIONAR AERONAVE PARA GERENCIAR —</option>
          {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>)}
        </select>
      </div>
      {aero && (
        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
            <button className={`btn ${activeTab === 'pecas' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('pecas')}><IconTools size={14} /> PEÇAS</button>
            <button className={`btn ${activeTab === 'etapas' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('etapas')}><IconHistory size={14} /> ETAPAS</button>
            <button className={`btn ${activeTab === 'testes' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('testes')}><IconFlask size={14} /> TESTES</button>
          </div>
          {activeTab === 'pecas' && <PecaModule aero={aero} selectedAero={selectedAero} />}
          {activeTab === 'etapas' && <EtapaModule aero={aero} />}
          {activeTab === 'testes' && <TestesModule aero={aero} />}
        </>
      )}
    </div>
  );
};
export default Operacoes;
