const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator"); //mirar doc de express-validator github

const User = require("../../models/User");

// add @route  POST api/users
//@description Register user
//@acces       Public no necesita autentiación

// creando una ruta Post ya que necesitamos enviar info (email, users, pass) para registrar un usuario.
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(), //express-validator para solicitar name (que el campo no esté vacío)
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
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

    const { name, email, password } = req.body; //= req.body.name , .email...(destructuración)
    try {
      let user = await User.findOne({ email });

      if (user) {
        // checking if the user exists
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200", //fullsize
        r: "pg", //reading
        d: "mm", //default img user icon
      });

      user: new User({
        //instance of a user from the let user.
        name,
        email,
        avatar,
        password,
      });

      //Encrypt the password:
      const salt = await bcrypt.genSalt(10); // viene de la doc de bcrypt.(obtenemos promesa de bcrypt.genSalt)

      user.password = await bcrypt.hash(password, salt); //plain txt pass + salt.

      await user.save(); // saving the user to the Data base, todo lo que retorne una promesa (debe usarse await)
      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
