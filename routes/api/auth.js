const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

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

//res.send("Auth route")); // creando una ruta

module.exports = router;
