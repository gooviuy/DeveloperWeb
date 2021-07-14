const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// add @route  GET api/Profile ///me
//@description Test route /// Get current users profile
//@acces       Public no necesita autentiación /// Private


///agregamos auth como segundo parametro ya que será una ruta protegida del perfil de usuario.
router.get('/me', auth, async (req, res)=> {   //res.send('Profile route')); // creando una ruta
 try {
const profile = await Profile.findOne({user: req.user.id }).populate('user', ['name', 'avatar']);
if(!profile) {
    return res.status(400).json({ msg: 'There is no profile for this user'})
}
 } catch(err) {
console.error(err.message);
res.status(500).send('Server Error')
 }
});

module.exports = router;