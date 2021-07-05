const express = require('express');
const router = express.Router();

// add @route  GET api/auth
//@description Test route
//@acces       Public no necesita autentiación


router.get('/', (req, res)=> res.send('Auth route')); // creando una ruta

module.exports = router;