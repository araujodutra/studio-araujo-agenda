const connection = require('../config/database');


const criarCliente = (cliente) => {
  const sql = `
    INSERT INTO clientes 
    (nome, telefone, email, servico, data_agendamento, horario, observacoes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    cliente.nome,
    cliente.telefone,
    cliente.email,
    cliente.servico,
    cliente.data_agendamento,
    cliente.horario,
    cliente.observacoes
  ];

  return connection.promise().execute(sql, values);
};


const listarClientes = () => {
  return connection.promise().execute('SELECT * FROM clientes');
};


const buscarPorId = (id) => {
  return connection
    .promise()
    .execute('SELECT * FROM clientes WHERE id = ?', [id]);
};


const atualizarCliente = (id, cliente) => {
  const sql = `
    UPDATE clientes SET
      nome = ?, telefone = ?, email = ?, servico = ?,
      data_agendamento = ?, horario = ?, observacoes = ?
    WHERE id = ?
  `;

  const values = [
    cliente.nome,
    cliente.telefone,
    cliente.email,
    cliente.servico,
    cliente.data_agendamento,
    cliente.horario,
    cliente.observacoes,
    id
  ];

  return connection.promise().execute(sql, values);
};


const deletarCliente = (id) => {
  return connection
    .promise()
    .execute('DELETE FROM clientes WHERE id = ?', [id]);
};

module.exports = {
  criarCliente,
  listarClientes,
  buscarPorId,
  atualizarCliente,
  deletarCliente
};