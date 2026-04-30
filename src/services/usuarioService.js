const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');


const criar = async (usuario, senha) => {
  const hash = await bcrypt.hash(senha, 10);

  const [result] = await usuarioModel.criarUsuario(usuario, hash);

  return result;
};


const autenticar = async (usuario, senha) => {
  const [rows] = await usuarioModel.buscarPorUsuario(usuario);


  if (rows.length === 0) {
    return null;
  }

  const user = rows[0];

  
  const senhaValida = await bcrypt.compare(senha, user.senha);

  if (!senhaValida) {
    return null;
  }

  return user;
};

module.exports = {
  criar,
  autenticar
};