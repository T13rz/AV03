import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { IconHistory, IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { StatusEtapa } from '../types';

const STATUS_ETAPA_LABELS = ['Pendente', 'Em Andamento', 'Concluída'];

const EtapaModule = ({ aero }: { aero: any }) => {
  const { aeronaves, setAeronaves, funcionarios } = useAppContext();
  const [showAddStep, setShowAddStep] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [novaEtapa, setNovaEtapa] = useState({ nome: '', prazo: '', funcionarios: [] as string[] });

  const handleOpenEditStep = (e: any, index: number) => {
    setNovaEtapa(e);
    setEditIndex(index);
    setIsEditing(true);
    setShowAddStep(true);
  };

  const handleSaveStep = () => {
    if (!aero) return;
    let novasEtapas = [...aero.etapas];
    if (isEditing) novasEtapas[editIndex] = { ...novaEtapa, status: novasEtapas[editIndex].status };
    else novasEtapas.push({ ...novaEtapa, status: StatusEtapa.Pendente });
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
    handleClose();
  };

  const handleRemoveStep = (index: number) => {
    if (!aero || !window.confirm('Deseja remover esta etapa?')) return;
    const novasEtapas = aero.etapas.filter((_: any, i: number) => i !== index);
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
  };

  const handleStartStep = (etapaIndex: number) => {
    const novasEtapas = [...aero.etapas];
    novasEtapas[etapaIndex] = { ...novasEtapas[etapaIndex], status: StatusEtapa.EmAndamento };
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
  };

  const handleFinishStep = (etapaIndex: number) => {
    const novasEtapas = [...aero.etapas];
    novasEtapas[etapaIndex] = { ...novasEtapas[etapaIndex], status: StatusEtapa.Concluida };
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
  };

  const toggleFunc = (id: string) => {
    const list = novaEtapa.funcionarios.includes(id) ? novaEtapa.funcionarios.filter(x => x !== id) : [...novaEtapa.funcionarios, id];
    setNovaEtapa({ ...novaEtapa, funcionarios: list });
  };

  const handleClose = () => {
    setShowAddStep(false);
    setIsEditing(false);
    setEditIndex(-1);
    setNovaEtapa({ nome: '', prazo: '', funcionarios: [] });
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><IconHistory size={16} /> FLUXO PRODUTIVO</span>
        <button className="btn btn-sm" onClick={() => setShowAddStep(true)}><IconPlus size={14} /></button>
      </div>
      {aero.etapas.map((e: any, i: number) => (
        <div key={i} style={{ padding: '20px', border: '1px solid #111', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ fontWeight: 900 }}>{e.nome.toUpperCase()}</div>
              <button onClick={() => handleOpenEditStep(e, i)}><IconEdit size={14} /></button>
              <button onClick={() => handleRemoveStep(i)}><IconTrash size={12} color="red" /></button>
            </div>
            <div className={`status-badge status-${e.status}`}>{STATUS_ETAPA_LABELS[e.status]}</div>
          </div>
          <div style={{ fontSize: '10px', color: '#444' }}>PRAZO: {e.prazo}</div>
          <div style={{ display: 'flex', gap: '4px', margin: '10px 0' }}>
            {e.funcionarios.map((fid: string) => {
                const f = funcionarios.find(x => x.id === fid);
                return <span key={fid} style={{ padding: '4px', background: '#000', fontSize: '9px' }}>{f?.nome}</span>
            })}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {e.status === StatusEtapa.Pendente && <button className="btn btn-sm btn-primary" onClick={() => handleStartStep(i)}>INICIAR</button>}
            {e.status === StatusEtapa.EmAndamento && <button className="btn btn-sm" onClick={() => handleFinishStep(i)}>FINALIZAR</button>}
          </div>
        </div>
      ))}
      {showAddStep && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? 'EDITAR ETAPA' : 'NOVA ETAPA'}</h3>
            <input className="btn" placeholder="NOME" value={novaEtapa.nome} onChange={e => setNovaEtapa({...novaEtapa, nome: e.target.value})} />
            <input className="btn" placeholder="PRAZO" value={novaEtapa.prazo} onChange={e => setNovaEtapa({...novaEtapa, prazo: e.target.value})} />
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              {funcionarios.map(f => (
                <div key={f.id} onClick={() => toggleFunc(f.id)} style={{ background: novaEtapa.funcionarios.includes(f.id) ? '#111' : 'transparent' }}>
                  {f.nome}
                </div>
              ))}
            </div>
            <button className="btn" onClick={handleClose}>CANCELAR</button>
            <button className="btn btn-primary" onClick={handleSaveStep}>SALVAR</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EtapaModule;
