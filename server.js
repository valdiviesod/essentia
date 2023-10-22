require('dotenv').config({ path: './dev.env' });
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const authController = require("./loginApi/controllers/auth.controller");


// Middleware
app.use(express.json());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SECRET_COOKIE_KEY], // Use the key defined in dev.env
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(cors());

// Ruta GET de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor en funcionamiento!');
});

// Include database synchronization and role creation
const db = require("./loginApi/models");
const Role = db.role;
db.sequelize.sync({ force: true }).then(() => {
  console.log('Eliminar y resincronizar la base de datos');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });
}

// Routes should be required after defining app
require('./loginApi/routes/auth.routes')(app);
require('./loginApi/routes/user.routes')(app);

// Start the server
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});