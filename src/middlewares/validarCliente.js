const validarCliente = (req, res, next) => {
  const {
    nome,
    telefone,
    servico,
    data_agendamento,
    horario
  } = req.body;

  if (!nome || !telefone || !servico || !data_agendamento || !horario) {
    return res.status(400).json({
      erro: 'Campos obrigatórios não preenchidos'
    });
  }

  next(); 
};

module.exports = validarCliente;