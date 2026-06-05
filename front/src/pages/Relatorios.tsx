import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IconReport, IconChartBar, IconDownload, IconRefresh, IconFileTypePdf } from '@tabler/icons-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const TIPO_AERO = ['Comercial', 'Carga', 'Militar'];

const Relatorios = () => {
  const { aeronaves, user } = useAppContext();
  const [selectedAero, setSelectedAero] = useState('');
  const [activeView, setActiveView] = useState('aeronaves');
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loadingMetrics, setLoadingMetrics] = useState(false);

  const aero = aeronaves.find(a => a.codigo === selectedAero);

  const fetchMetrics = () => {
    setLoadingMetrics(true);
    fetch('http://localhost:3000/api/metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setLoadingMetrics(false);
      })
      .catch(err => {
        console.error("Erro ao buscar métricas:", err);
        setLoadingMetrics(false);
      });
  };

  const downloadPerformancePDF = () => {
    window.open('http://localhost:3000/api/metrics/download', '_blank');
  };

  useEffect(() => {
    if (activeView === 'metricas' && user?.NivelAcesso === 0) {
      fetchMetrics();
    }
  }, [activeView, user]);

  const chartData = {
    labels: metrics.map(m => `Carga: ${m.userLoad} usuários`),
    datasets: [
      { 
        label: 'Latência (ms)', 
        data: metrics.map(m => m.latency), 
        backgroundColor: '#00D1FF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#00D1FF'
      },
      { 
        label: 'Processamento (ms)', 
        data: metrics.map(m => m.processingTime), 
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF'
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
          font: { family: 'Inter', weight: 'bold' as const }
        }
      },
      datalabels: {
        display: true,
        color: '#FFFFFF',
        align: 'end' as const,
        anchor: 'end' as const,
        offset: 4,
        font: {
          weight: 'bold' as const,
          size: 11
        },
        formatter: (value: any) => `${value}ms`
      },
      tooltip: {
        backgroundColor: '#000000',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        borderColor: '#00D1FF',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#666666' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#FFFFFF', font: { weight: 'bold' as const } }
      }
    }
  };

  const exportTxt = () => {
    if (!aero) return;
    let txt = `AEROCODE — RELATÓRIO TÉCNICO\n${'='.repeat(40)}\n`;
    txt += `Código: ${aero.codigo}\nModelo: ${aero.modelo}\nTipo: ${TIPO_AERO[aero.tipo]}\nAlcance: ${aero.alcance} km\nCapacidade: ${aero.capacidade}\n\n`;
    
    txt += `COMPONENTES (${aero.pecas.length})\n${'-'.repeat(30)}\n`;
    aero.pecas.forEach(p => {
      txt += `- ${p.nome} (${p.fornecedor})\n`;
    });

    txt += `\nFLUXO PRODUTIVO (${aero.etapas.length})\n${'-'.repeat(30)}\n`;
    aero.etapas.forEach(e => {
      txt += `- ${e.nome}: ${e.status === 2 ? 'CONCLUÍDA' : 'PENDENTE/EM ANDAMENTO'}\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${aero.codigo}.txt`;
    a.click();
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '2rem', letterSpacing: '2px' }}>CENTRAL DE RELATÓRIOS</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeView === 'aeronaves' ? 'btn-primary' : ''}`} 
          onClick={() => setActiveView('aeronaves')}
        >
          <IconReport size={16} /> AERONAVES
        </button>
        {user?.NivelAcesso === 0 && (
          <button 
            className={`btn ${activeView === 'metricas' ? 'btn-primary' : ''}`} 
            onClick={() => setActiveView('metricas')}
          >
            <IconChartBar size={16} /> MÉTRICAS DE SISTEMA
          </button>
        )}
      </div>

      {activeView === 'aeronaves' ? (
        <div className="card">
          <label style={{ fontSize: '10px', fontWeight: 800, marginBottom: '8px', display: 'block' }}>SELECIONAR AERONAVE PARA EXPORTAÇÃO</label>
          <select 
            className="btn" 
            style={{ width: '100%', marginBottom: '2rem' }}
            value={selectedAero}
            onChange={e => setSelectedAero(e.target.value)}
          >
            <option value="">— SELECIONAR —</option>
            {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>)}
          </select>

          {aero ? (
            <div style={{ padding: '20px', border: '1px solid #111', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{aero.modelo.toUpperCase()}</h3>
                  <code style={{ fontSize: '12px', color: 'var(--color-accent)' }}>{aero.codigo}</code>
                </div>
                <button className="btn btn-primary" onClick={exportTxt}>
                  <IconDownload size={16} /> BAIXAR RELATÓRIO TXT
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#222', fontWeight: 900 }}>AGUARDANDO SELEÇÃO</div>
          )}
        </div>
      ) : (
        <div className="card" style={{ background: '#050505', border: '1px solid #111' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ margin: 0, letterSpacing: '1px' }}>MÉTRICAS DE QUALIDADE (AV03)</h3>
              <p style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>Análise de desempenho em milissegundos</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-sm btn-primary" onClick={downloadPerformancePDF}>
                <IconFileTypePdf size={16} /> BAIXAR PDF
              </button>
              <button className="btn btn-sm" onClick={fetchMetrics} disabled={loadingMetrics}>
                <IconRefresh size={16} className={loadingMetrics ? 'spin' : ''} />
              </button>
            </div>
          </div>
          
          {loadingMetrics && metrics.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', fontWeight: 800, color: '#00D1FF' }}>SINCRONIZANDO DADOS...</div>
          ) : metrics.length > 0 ? (
            <div style={{ height: '400px', padding: '0 20px 20px 20px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#ff4444', fontWeight: 800 }}>
              ERRO DE CONEXÃO COM O SERVIDOR
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Relatorios;
