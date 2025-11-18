const express = require("express");
const { Pool } = require("pg");
const client = require('prom-client');
const app = express();
const register = client.register;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "postgres",
  port: 5432
});

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP',
  labelNames: ['route'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({ route: req.path });

  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
    end();
  });

  next();
});

app.get("/vendas", async (req, res) => {
  const result = await pool.query("SELECT * FROM vendas ORDER BY id DESC LIMIT 20");
  res.json(result.rows);
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => console.log("API rodando na porta 3000"));
