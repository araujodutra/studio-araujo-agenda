const usuarioService = require('../services/usuarioService');
const jwt = require('jsonwebtoken');


const registrar = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({
        erro: 'Usuário e senha são obrigatórios'
      });
    }

    const result = await usuarioService.criar(usuario, senha);

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      id: result.insertId
    });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const user = await usuarioService.autenticar(usuario, senha);

    if (!user) {
      return res.status(401).json({
        erro: 'Credenciais inválidas'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        usuario: user.usuario
      },
      'segredo', 
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

module.exports = {
  registrar,
  login
};