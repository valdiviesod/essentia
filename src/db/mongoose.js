const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Conexión a la base de datos exitosa');
}).catch((error) => {
    console.error('Error de conexión a la base de datos:', error);
});
