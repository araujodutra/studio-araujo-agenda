const connection = require('../config/database');


const buscarPorUsuario = (usuario) => {
  return connection
    .promise()
    .execute(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );
};

const criarUsuario = (usuario, senhaHash) => {
  return connection
    .promise()
    .execute(
      'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
      [usuario, senhaHash]
    );
};

module.exports = {
  buscarPorUsuario,
  criarUsuario
};