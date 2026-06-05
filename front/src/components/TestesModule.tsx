import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { IconFlask, IconPlus, IconTrash, IconEdit, IconAlertCircle } from '@tabler/icons-react';

const TESTE_TIPO_LABELS = ['Segurança', 'Desempenho', 'Resistência'];
const TESTE_STATUS_LABELS = ['Pendente', 'Aprovado', 'Reprovado'];

const TestesModule = ({ aero }: { aero: any }) => {
  const { aeronaves, setAeronaves } = useAppContext();
  const [showAddTeste, setShowAddTeste] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [error, setError] = useState('');
  const [novoTeste, setNovoTeste] = useState({ testId: '', tipo: 0, status: 0 });

  const handleOpenEditTeste = (t: any, index: number) => {
    setNovoTeste(t);
    setEditIndex(index);
    setIsEditing(true);
    setShowAddTeste(true);
    setError('');
  };

  const handleSaveTeste = () => {
    if (!aero) return;
    if (!novoTeste.testId.trim()) {
      setError('O ID do teste é obrigatório.');
      return;
    }

    // Regra: IDs únicos por aeronave
    const idExiste = aero.testes?.some((t: any, idx: number) => 
      t.testId.toLowerCase() === novoTeste.testId.toLowerCase() && idx !== editIndex
    );
    if (idExiste) {
      setError('Este ID de teste já existe para esta aeronave.');
      return;
    }

    // Regra: Apenas um teste "Pendente" por vez (regra de negócio para "em andamento")
    if (novoTeste.status === 0) { // Tentando salvar como Pendente
      const jaExistePendente = aero.testes?.some((t: any, idx: number) => 
        t.status === 0 && idx !== editIndex
      );
      if (jaExistePendente) {
        setError('Já existe um teste pendente. Conclua-o antes de iniciar outro.');
        return;
      }
    }

    let novosTestes = [...(aero.testes || [])];
    if (isEditing) {
      novosTestes[editIndex] = novoTeste;
    } else {
      novosTestes.push(novoTeste);
    }

    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, testes: novosTestes } : a));
    handleClose();
  };

  const handleRemoveTeste = (index: number) => {
    if (!aero || !window.confirm('Deseja remover este registro de teste?')) return;
    const novosTestes = aero.testes.filter((_: any, i: number) => i !== index);
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, testes: novosTestes } : a));
  };

  const handleClose = () => {
    setShowAddTeste(false);
    setIsEditing(false);
    setEditIndex(-1);
    setNovoTeste({ testId: '', tipo: 0, status: 0 });
    setError('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><IconFlask size={16} /> TESTES DE QUALIDADE</span>
        <button className="btn btn-sm" onClick={() => { setShowAddTeste(true); setError(''); }}><IconPlus size={14} /></button>
      </div>

      {error && (
        <div style={{ 
          padding: '12px', 
          background: 'rgba(255, 68, 68, 0.1)', 
          borderLeft: '4px solid #ff4444', 
          color: '#ff4444', 
          fontSize: '11px', 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 'bold'
        }}>
          <IconAlertCircle size={16} />
          {error.toUpperCase()}
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID TESTE</th>
            <th>TIPO</th>
            <th>STATUS</th>
            <th style={{ textAlign: 'right' }}>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {(!aero.testes || aero.testes.length === 0) ? (
            <tr><td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#333' }}>Nenhum teste registrado</td></tr>
          ) : (
            aero.testes.map((t: any, i: number) => (
              <tr key={i}>
                <td><code>{t.testId}</code></td>
                <td>{TESTE_TIPO_LABELS[t.tipo]}</td>
                <td>
                  <span className={`status-badge status-${t.status}`}>
                    {TESTE_STATUS_LABELS[t.status]}
                  </span>
                </td>
                <td style={{ textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-sm" onClick={() => handleOpenEditTeste(t, i)} title="Editar Teste">
                    <IconEdit size={16} color="var(--color-accent)" />
                  </button>
                  <button className="btn btn-sm" onClick={() => handleRemoveTeste(i)} title="Remover Teste">
                    <IconTrash size={16} color="#ff3333" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showAddTeste && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'EDITAR TESTE' : 'NOVO TESTE'}</h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 800, color: '#444', display: 'block', marginBottom: '5px' }}>ID DO TESTE</label>
                <input 
                  className="btn" 
                  style={{ width: '100%', textAlign: 'left' }}
                  placeholder="EX: TST-001" 
                  value={novoTeste.testId} 
                  onChange={e => setNovoTeste({...novoTeste, testId: e.target.value.toUpperCase()})} 
                />
              </div>

              <div>
                <label style={{ fontSize: '10px', fontWeight: 800, color: '#444', display: 'block', marginBottom: '5px' }}>CATEGORIA</label>
                <select 
                  className="btn" 
                  style={{ width: '100%', textAlign: 'left' }}
                  value={novoTeste.tipo} 
                  onChange={e => setNovoTeste({...novoTeste, tipo: parseInt(e.target.value)})}
                >
                  {TESTE_TIPO_LABELS.map((l, i) => <option key={i} value={i}>{l.toUpperCase()}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '10px', fontWeight: 800, color: '#444', display: 'block', marginBottom: '5px' }}>SITUAÇÃO</label>
                <select 
                  className="btn" 
                  style={{ width: '100%', textAlign: 'left' }}
                  value={novoTeste.status} 
                  onChange={e => setNovoTeste({...novoTeste, status: parseInt(e.target.value)})}
                >
                  {TESTE_STATUS_LABELS.map((l, i) => <option key={i} value={i}>{l.toUpperCase()}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button className="btn" onClick={handleClose}>CANCELAR</button>
              <button className="btn btn-primary" onClick={handleSaveTeste}>
                {isEditing ? 'ATUALIZAR' : 'REGISTRAR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestesModule;
