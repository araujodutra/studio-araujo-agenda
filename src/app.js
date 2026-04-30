const express = require('express');
const cors = require('cors');

require('./config/database');

const clienteRoutes = require('./routes/clienteRoutes');
const setupSwagger = require('./docs/swagger');
const authRoutes = require('./routes/authRoutes');
const logger = require('./middlewares/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use(logger);


setupSwagger(app);


app.use('/api', clienteRoutes);

app.get('/', (req, res) => {
  res.send('API Studio Araujo Agenda funcionando 💄');
});

module.exports = app;