// imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); 

const dbConection = require('./database');

// inicializacion
const app = express();
dbConection;

// configuracioin
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// rutas
app.use('/api', require('./routes/postulante'));

// encendido del server
app.listen(app.get('port'), () => {
  console.log('server running on port ', app.get('port'));
});