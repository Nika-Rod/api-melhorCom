const express = require('express');
const sequelize = require('./config/db'); 
const Phone = require('./models/Phone'); 
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json(), cors());

const phoneRoutes = require('./routes/phoneRoutes');
app.use('/api', phoneRoutes);

app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err.stack); 
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
});

const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });
