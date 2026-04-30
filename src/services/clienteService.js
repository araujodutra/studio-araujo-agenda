const clienteModel = require('../models/clienteModel');


const criar = async (dados) => {
  const [resultado] = await clienteModel.criarCliente(dados);
  return resultado;
};


const listar = async () => {
  const [clientes] = await clienteModel.listarClientes();
  return clientes;
};

module.exports = {
  criar,
  listar
};