const express = require('express');
const router = express.Router();

// add @route  GET api/Profile
//@description Test route
//@acces       Public no necesita autentiación


router.get('/', (req, res)=> res.send('Profile route')); // creando una ruta

module.exports = router;