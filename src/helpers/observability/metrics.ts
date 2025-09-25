import client from "prom-client";

// Registry de Prometheus
const register = new client.Registry();

// Métricas que queremos recolectar
const testDuration = new client.Histogram({
  name: "playwright_test_duration_seconds",
  help: "Duración de los tests de Playwright en segundos",
  labelNames: ["test_name", "status"],
});

const testCounter = new client.Counter({
  name: "playwright_test_total",
  help: "Número total de tests ejecutados",
  labelNames: ["test_name", "status"],
});

// Registrar métricas en Prometheus
register.registerMetric(testDuration);
register.registerMetric(testCounter);
client.collectDefaultMetrics({ register });

export const metrics = {
  register,
  testDuration,
  testCounter,
};
