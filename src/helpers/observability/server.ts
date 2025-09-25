import express from "express";
import { metrics } from "../../helpers/observability/metrics";

const app = express();

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

app.listen(9100, () => {
  console.log("Metrics server running at http://localhost:9100/metrics");
});
