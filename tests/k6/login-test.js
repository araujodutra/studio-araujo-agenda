import http from 'k6/http';
import { check, sleep } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  vus: 10,
  duration: '30s'
};

export default function () {


  const loginRes = http.post(
    `${BASE_URL}/api/login`,
    JSON.stringify({
      usuario: 'admin',
      senha: '123456'
    }),
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

  let body;

  try {
    body = loginRes.json();
  } catch (e) {
    console.error('Erro ao converter login:', loginRes.body);
    return;
  }

  if (!body || !body.token) {
    console.error('Erro no login:', loginRes.body);
    return;
  }

  const token = body.token;

  
  const res = http.get(
    `${BASE_URL}/api/clientes`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  check(res, {
    'status é 200': (r) => r.status === 200,
    'resposta não vazia': (r) => r.body && r.body.length > 2,
    'tempo < 500ms': (r) => r.timings.duration < 500
  });

  sleep(1);
}



export function handleSummary(data) {
  const date = new Date().toISOString().replace(/[:.]/g, '-');

  return {
    [`reports/report-${date}.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}