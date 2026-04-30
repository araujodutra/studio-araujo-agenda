const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken'); 

const clienteController = require('../controllers/clienteController');
const validarCliente = require('../middlewares/validarCliente');
const authMiddleware = require('../middlewares/authMiddleware'); 


router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === 'admin' && senha === '123456') {

    const token = jwt.sign(
      { usuario },
      'segredo',
      { expiresIn: '1h' }
    );

    return res.json({ token });
  }

  return res.status(401).json({
    erro: 'Credenciais inválidas'
  });
});


router.post('/clientes', validarCliente, clienteController.criarCliente);

router.get('/clientes', authMiddleware, clienteController.listarClientes);

router.get('/clientes/:id', authMiddleware, clienteController.buscarCliente);

router.put('/clientes/:id', authMiddleware, validarCliente, clienteController.atualizarCliente);

router.delete('/clientes/:id', authMiddleware, clienteController.deletarCliente);

module.exports = router;