import express from 'express';
import cors from 'cors';

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

app.listen(3000, () => {
  console.log('Server is running on port 3000 (Dynamic Mocked Metrics with CORS)');
});
