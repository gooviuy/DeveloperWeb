const express = require("express");
const connectDB = require("./config/db"); //Importamos db

const app = express();

// Connect Database
connectDB();

// Init Middleware

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Running");
});

// Accediendo a las rutas :

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 3000; //port buscará un ambiente de variable PORT, de lo contrario usa la establecida por defecto.

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
