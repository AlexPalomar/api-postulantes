const express = require('express');
const pool = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h3>* Bienvenido al Api Postulantes*<h3>');
});


router.post('/nuevo-postulante', async (req, res) => {

  const newUser = {
    'tipoDocumento': req.body.tipoDocumento,
    'documento' : req.body.documento,
    'nombre' : req.body.nombre,
    'apellido' : req.body.apellido,
    'correo' : req.body.correo
  }

  await pool.query('INSERT INTO postulante SET ?', [newUser], (err, result) => {

    if(err){
      console.log('Error', err.message);
    }else if(result){
      // console.log(result);
      res.status(200).json({message: 'save'});
    }

  });
  
});

router.get('/postulantes', async (req, res) => {
  await pool.query('SELECT * FROM postulante', (err, result) => {
    if(err){
      console.log('Error', err.message);
    }else if(result){
      console.log(result);
      res.status(200).json(result);
    }
  });
});

router.get('/postulante/:id', async (req, res) => {

  const idPostulante = req.params.id;
  await pool.query('SELECT * FROM postulante WHERE idPostulante = ?',idPostulante, (err, result) => {
    if(err){
      console.log('Error', err.message);
    }else if(result){
      console.log(result);
      res.status(200).json({postulantes: result});
    }
  });
});

router.get('/postulante/:id', async (req, res) => {

  const empresa = req.params.id;
  console.log(empresa);
  await pool.query('SELECT * FROM postulante WHERE empresaVacante LIKE ?',`%${empresa}%`, (err, result) => {
    if(err){
      console.log('Error', err.message);
    }else if(result){
      console.log(result);
      res.status(200).json({vacantes: result});
    }
  });
});

router.delete('/postulante/:id', async (req, res) => {

  const idPostulante = req.params.id;
  await pool.query('DELETE FROM postulante WHERE idPostulante = ?',idPostulante, (err, result) => {
    if(err){
      console.log('Error', err.message);
    }else if(result){
      console.log(result);
      res.status(200).json({postulante: result});
    }
  });
});

router.post('/postulante/:id', async (req, res) => {

  const idPostulante = req.params.id;

  const updateUser = {
    'empresaVacante': req.body.empresa,
    'nombreVacante' : req.body.vacante,
    'descripcionVacante' : req.body.descripcion,
    'cantidadVacante' : req.body.vacantes,
    'estadoVacante' : req.body.estado
  }

  await pool.query('UPDATE empresaVacante, nombreVacante, descripcionVacante, cantidadVacante, estadoVacante FROM vacante WHERE idVacante = SET ?', [updateUser], (err, result) => {

    if(err){
      console.log('Error', err.message);
    }else if(result){
      // console.log(result);
      res.status(200).json({message: 'save'});
    }

  });
  
});
module.exports = router;
