const clienteService = require('../services/clienteService');

const criarCliente = async (req, res) => {
  try {
    const result = await clienteService.criar(req.body);

    res.status(201).json({
      mensagem: 'Cliente criado com sucesso',
      id: result.insertId
    });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteService.listar();

    res.status(200).json(clientes);

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const buscarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const clientes = await clienteService.buscarPorId(id);

    if (!clientes || clientes.length === 0) {
      return res.status(404).json({
        erro: 'Cliente não encontrado'
      });
    }

    res.status(200).json(clientes[0]);

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await clienteService.atualizar(id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        erro: 'Cliente não encontrado'
      });
    }

    res.status(200).json({
      mensagem: 'Cliente atualizado com sucesso'
    });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const deletarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await clienteService.deletar(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        erro: 'Cliente não encontrado'
      });
    }

    res.status(204).send(); // padrão REST

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

module.exports = {
  criarCliente,
  listarClientes,
  buscarCliente,
  atualizarCliente,
  deletarCliente
};