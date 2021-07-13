const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator"); //mirar doc de express-validator github

const User = require("../../models/User");
// add @route  GET api/auth
//@description Test route
//@acces       Public no necesita autentiación

// AGREGAMOS auth, por lo cual la ruta quedará protegida :

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// add @route  POST api/auth
//@description Authenticate user and get token
//@acces       Public no necesita autentiación

// creando una ruta Post ya que necesitamos enviar info (email, users, pass) para registrar un usuario.
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "password is required").exists(), // queremos asegurarnos que exista pass
  ],
  async (req, res) => {
    // to handle the response of the check stuff that we established up there.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // establecemos respuesta en caso de error, solicite lo que pedimos en check.
      return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body); // será el objecto de información que será enviada a esta ruta.

    // User Registration Logic :

    const { email, password } = req.body; //= req.body.name , .email...(destructuración)
    try {
      let user = await User.findOne({ email });

      if (!user) {
        // checking if the user exists
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // necesitamos aseguarnos que el pass match al user , traemos bycrypt:

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      // we sign the token :
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // obtendremos el token como respuesta del servidor, luego de registrar al user.
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
//res.send("Auth route")); // creando una ruta

module.exports = router;
