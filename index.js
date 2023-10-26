const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/routes');

const app = express();


// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));
app.use(movieRoutes);

const mongoUrl = "mongodb+srv://user:user@cluster0.xkdtbjj.mongodb.net/movies?retryWrites=true&w=majority";
mongoose.connect(mongoUrl).then(() => {
    app.listen(3000, () => {
        console.log('app is running...');
    });
}).catch(err => {
    console.log('No se pudo conectar a la base de datos', err);
})
