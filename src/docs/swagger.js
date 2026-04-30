const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Studio Araujo Agenda',
    version: '1.0.0',
    description: 'Documentação da API de agendamento'
  },
  servers: [
    {
      url: 'http://localhost:3000/api'
    }
  ],

components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
},
security: [
  {
    bearerAuth: []
  }
],
  paths: {

    
    '/register': {
      post: {
        summary: 'Registrar novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                usuario: "admin",
                senha: "123456"
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuário criado com sucesso'
          }
        }
      }
    },

    '/login': {
      post: {
        summary: 'Login do usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                usuario: "admin",
                senha: "123456"
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Token JWT'
          },
          401: {
            description: 'Credenciais inválidas'
          }
        }
      }
    },

    '/clientes': {
      get: {
        summary: 'Lista todos os clientes',
        responses: {
          200: {
            description: 'Lista de clientes'
          }
        }
      },
      post: {
        summary: 'Cria um novo cliente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                nome: "Antonio",
                telefone: "61999999999",
                email: "teste@email.com",
                servico: "Limpeza",
                data_agendamento: "2026-04-30",
                horario: "14:00:00",
                observacoes: "Teste"
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Cliente criado com sucesso'
          }
        }
      }
    },

    '/clientes/{id}': {
      get: {
        summary: 'Busca cliente por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            }
          }
        ],
        responses: {
          200: {
            description: 'Cliente encontrado'
          },
          404: {
            description: 'Cliente não encontrado'
          }
        }
      },

      put: {
        summary: 'Atualiza um cliente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                nome: "Antonio Atualizado",
                telefone: "61999999999",
                email: "teste@email.com",
                servico: "Limpeza Premium",
                data_agendamento: "2026-05-01",
                horario: "15:00:00",
                observacoes: "Atualizado"
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Cliente atualizado com sucesso'
          },
          404: {
            description: 'Cliente não encontrado'
          }
        }
      },

      delete: {
        summary: 'Remove um cliente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            }
          }
        ],
        responses: {
          204: {
            description: 'Cliente removido com sucesso'
          },
          404: {
            description: 'Cliente não encontrado'
          }
        }
      }
    }

  }
};

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};