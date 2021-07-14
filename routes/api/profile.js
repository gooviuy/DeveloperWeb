const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// add @route  GET api/Profile ///me
//@description Test route /// Get current users profile
//@acces       Public no necesita autentiación /// Private

///creamos ruta privada para perfil personal
///agregamos auth como segundo parametro ya que será una ruta protegida del perfil de usuario.
router.get("/me", auth, async (req, res) => {
  //res.send('Profile route')); // creando una ruta
  try {
    // populate implica que podamos obtener esos datos desde user model para mostrar el perfil :
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// add @route  POST api/Profile
//@description Create or update user profile
//@acces       Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

 // destructure the request
 const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;

   // build a profile
   const profileFields = {
    user: req.user.id,
    website:
      website && website !== ''
        ? normalize(website, { forceHttps: true })
        : '',
    skills: Array.isArray(skills)
      ? skills
      : skills.split(',').map((skill) => ' ' + skill.trim()),
    ...rest
  };

  }
);

module.exports = router;
