import express from 'express';
import cors from 'cors';
import PDFDocument from 'pdfkit';

const app = express();
app.use(cors());
app.use(express.json());

const getDynamicMetric = (base: number, volatility: number) => {
  const variation = (Math.random() - 0.5) * base * volatility;
  return Math.max(1, base + variation).toFixed(2);
};

app.get('/api/metrics', (req, res) => {
  const loads = [1, 5, 10];
  const data = loads.map(load => {
    const latencyBase = 10 * load;
    const processingBase = 20 * load;
    const latency = getDynamicMetric(latencyBase, 0.2);
    const processingTime = getDynamicMetric(processingBase, 0.3);
    
    return {
      latency,
      processingTime,
      responseTime: (parseFloat(latency) + parseFloat(processingTime)).toFixed(2),
      userLoad: load,
      timestamp: new Date().toISOString()
    };
  });
  res.json(data);
});

app.get('/api/metrics/download', (req, res) => {
  const loads = [1, 5, 10];
  const doc = new PDFDocument({ margin: 50 });
  const filename = 'performance_report.pdf';

  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/pdf');

  doc.pipe(res);

  // Cabeçalho
  doc.fontSize(20).text('DRAKOSYS AEROCODE', { align: 'center' });
  doc.fontSize(14).text('Relatório Técnico de Performance', { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(`Data de Geração: ${new Date().toLocaleString()}`, { align: 'right' });
  doc.moveDown();
  doc.rect(50, doc.y, 500, 2).fill('#00D1FF');
  doc.moveDown();

  // Conteúdo
  loads.forEach(load => {
    const latencyBase = 10 * load;
    const processingBase = 20 * load;
    const latency = getDynamicMetric(latencyBase, 0.2);
    const processingTime = getDynamicMetric(processingBase, 0.3);
    const respTime = (parseFloat(latency) + parseFloat(processingTime)).toFixed(2);

    doc.fontSize(12).fillColor('#000000').text(`CARGA DE USUÁRIOS: ${load}`, { underline: true });
    doc.fontSize(11).fillColor('#444444').text(`- Latência de Rede: ${latency} ms`);
    doc.text(`- Tempo de Processamento: ${processingTime} ms`);
    doc.fillColor('#0044ff').text(`- Tempo de Resposta Total: ${respTime} ms`, { stroke: false });
    doc.moveDown();
  });

  // Rodapé
  doc.rect(50, 750, 500, 1).fill('#CCCCCC');
  doc.fontSize(8).fillColor('#999999').text('Documento gerado automaticamente pelo Sistema Industrial DrakoSys AeroCode', 50, 760, { align: 'center' });

  doc.end();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000 (Dynamic Metrics with PDF Generation)');
});
