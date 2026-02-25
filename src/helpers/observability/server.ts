import express from "express";
import { metrics } from "./metrics";

const app = express();
const port = process.env.METRICS_PORT || 9100;

// Ruta para exponer las métricas
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

app.listen(port, () => {
  console.log(`✅ Metrics server running at http://localhost:${port}/metrics`);
});