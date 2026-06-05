import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { IconTools, IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';

const TIPO_LABELS = ['Motor', 'Asa', 'Fuselagem', 'Eletrônico'];
const STATUS_LABELS = ['Em Produção', 'Em Transporte', 'Pronta'];

const PecaModule = ({ aero }: { aero: any }) => {
  const { aeronaves, setAeronaves } = useAppContext();
  const [showAddPeca, setShowAddPeca] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [novaPeca, setNovaPeca] = useState({ nome: '', fornecedor: '', tipo: 0, status: 0 });

  const handleOpenEditPeca = (p: any, index: number) => {
    setNovaPeca(p);
    setEditIndex(index);
    setIsEditing(true);
    setShowAddPeca(true);
  };

  const handleSavePeca = () => {
    if (!aero) return;
    let novasPecas = [...aero.pecas];
    if (isEditing) novasPecas[editIndex] = novaPeca;
    else novasPecas.push(novaPeca);
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, pecas: novasPecas } : a));
    handleClose();
  };

  const handleRemovePeca = (index: number) => {
    if (!aero || !window.confirm('Deseja remover este componente?')) return;
    const novasPecas = aero.pecas.filter((_: any, i: number) => i !== index);
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, pecas: novasPecas } : a));
  };

  const handleClose = () => {
    setShowAddPeca(false);
    setIsEditing(false);
    setEditIndex(-1);
    setNovaPeca({ nome: '', fornecedor: '', tipo: 0, status: 0 });
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><IconTools size={16} /> COMPONENTES</span>
        <button className="btn btn-sm" onClick={() => setShowAddPeca(true)}><IconPlus size={14} /></button>
      </div>
      <table>
        <thead>
          <tr><th>Peça</th><th>Fornecedor</th><th>Tipo</th><th>Status</th><th style={{ textAlign: 'right' }}>AÇÕES</th></tr>
        </thead>
        <tbody>
          {aero.pecas.map((p: any, i: number) => (
            <tr key={i}>
              <td><strong>{p.nome}</strong></td>
              <td>{p.fornecedor}</td>
              <td>{TIPO_LABELS[p.tipo]}</td>
              <td><span className={`status-badge status-${p.status}`}>{STATUS_LABELS[p.status]}</span></td>
              <td style={{ textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button className="btn btn-sm" onClick={() => handleOpenEditPeca(p, i)}><IconEdit size={16} color="var(--color-accent)" /></button>
                <button className="btn btn-sm" onClick={() => handleRemovePeca(i)}><IconTrash size={14} color="#ff3333" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPeca && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? 'EDITAR PEÇA' : 'NOVA PEÇA'}</h3>
            <input className="btn" placeholder="NOME" value={novaPeca.nome} onChange={e => setNovaPeca({...novaPeca, nome: e.target.value})} />
            <input className="btn" placeholder="FORNECEDOR" value={novaPeca.fornecedor} onChange={e => setNovaPeca({...novaPeca, fornecedor: e.target.value})} />
            <select className="btn" value={novaPeca.tipo} onChange={e => setNovaPeca({...novaPeca, tipo: parseInt(e.target.value)})}>
              {TIPO_LABELS.map((l, i) => <option key={i} value={i}>{l.toUpperCase()}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn" onClick={handleClose}>CANCELAR</button>
              <button className="btn btn-primary" onClick={handleSavePeca}>{isEditing ? 'SALVAR' : 'ADICIONAR'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PecaModule;
