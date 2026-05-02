#  Studio Araujo Agenda API

API REST para gerenciamento de agendamentos de clientes em um studio de beleza.
Desenvolvida com foco em boas práticas de arquitetura, segurança, documentação e testes de performance.

---
#  Autor

Antonio Araujo

 GitHub: https://github.com/araujodutra
 Projeto: https://github.com/araujodutra/studio-araujo-agenda

# Tecnologias Utilizadas

##  Backend

 JavaScript 
 k6 – Ferramenta para testes de carga e performance
 Node.js (opcional, para suporte e organização do projeto)
 
 Express.js

##  Banco de Dados

 MySQL
 mysql2

##  Segurança

 JSON Web Token (JWT)

##  Documentação

 Swagger (swagger-ui-express)

##  Testes de Performance
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=html-report.html \
k6 run tests/autenticacao/login.test.js \
-e BASE_URL=http://localhost:3000
 k6
![alt text](image-3.png)
 ##  Testes com Postman

A collection está disponível em:

postman/postman_collection.json

Importar no Postman para executar os cenários automatizados baseados em user stories.

##  Utilitários

 dotenv
 cors
 nodemon

---

#  Arquitetura do Projeto

O projeto segue uma estrutura em camadas:

 Controller      # entrada/saída da API
 Service         # regras de negócio
 Model           # acesso ao banco
 Middleware      # validação e segurança

---

#  Estrutura de Diretórios

```
studio-araujo-agenda/
│
├── k6/                        # (pode remover ou organizar se não estiver usando)
├── node_modules/              # dependências
├── reports/                   # relatórios HTML do k6
│
├── src/
│   ├── config/
│   │   └── database.js        # conexão com MySQL
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── clienteController.js
│   │
│   ├── docs/
│   │   └── swagger.js         # documentação Swagger
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── logger.js
│   │   └── validarCliente.js
│   │
│   ├── models/
│   │   ├── clienteModel.js
│   │   └── usuarioModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── clienteRoutes.js
│   │
│   ├── services/
│   │   ├── clienteService.js
│   │   └── usuarioService.js
│   │
│   └── app.js                 # configuração do Express
│
├── tests/
│   └── k6/
│       └── login-test.js      # teste de carga
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js                  # inicialização da API
```

---

#  Como Rodar o Projeto
 k6 run tests/k6/login-test.js


##  1. Instalar dependências

```
npm install
```

##  2. Configurar ambiente

Crie um `.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=studio_araujo_agenda
DB_PORT=3306
```

##  3. Executar

```
npm run dev
```

---

#  Endpoints

##  Autenticação

| Método | Rota          |
| ------ | ------------- |
| POST   | /api/login    |
| POST   | /api/register |

---

##  Clientes

| Método | Rota              |
| ------ | ----------------- |
| POST   | /api/clientes     |
| GET    | /api/clientes     |
| GET    | /api/clientes/:id |
| PUT    | /api/clientes/:id |
| DELETE | /api/clientes/:id |

---

#  Autenticação JWT

### Login

```
POST /api/login
```

```json
{
  "usuario": "admin",
  "senha": "123456"
}
```

Resposta:

```json
{
  "token": "JWT_TOKEN"
}
```

---

#  Logs

Middleware de logging registra:

 Método HTTP
 URL
 Status
 Tempo de resposta

Exemplo:

```
GET /api/clientes 200 - 120ms
```

---

#  Documentação Swagger

Acesse:

```
http://localhost:3000/docs
```

Permite:

 Testar rotas
 Inserir token JWT
 Visualizar exemplos 
 ![alt text](image.png)

---

#  Testes de Performance (k6)

## Executar:

```
k6 run tests/k6/login-test.js
```
![alt text](image-1.png)

---

##  Relatórios HTML

Gerados automaticamente em:

```
reports/
```

Abra:

```
reports/report-xxxx.html
```

---

##  Resultado do Teste

Cenário:

 10 usuários simultâneos
 30 segundos

Resultados:

 Tempo médio: ~447ms
 p95: ~1000ms
 Tempo máximo: ~1.39s
 Taxa de erro: 0%

---

##  Análise

A API manteve estabilidade sob carga, porém apresentou aumento de latência, indicando necessidade de otimização para cenários mais exigentes.

---

#  Regras de Negócio

 Campos obrigatórios no cliente
 Validação via middleware
 Rotas protegidas com JWT
 Expiração de token: 1 hora

---

#  Tratamento de Erros

| Código | Descrição       |
| ------ | --------------- |
| 400    | Dados inválidos |
| 401    | Não autorizado  |
| 404    | Não encontrado  |
| 500    | Erro interno    |

---

#  Melhorias Futuras

 Criptografia de senha (bcrypt)
 Controle de conflitos de horário
 Cache e otimização de queries
 Logs persistentes
 CI/CD
 Deploy em nuvem

---


