const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

//Firestore
const admin = require("firebase-admin");
const serviceAccount = require("./config/ecommercecoderhouse-2f872-9d1109101c0e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

//Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
const authRouter = require('./routers/authRouter');
app.get('/', (req, res) => {
    res.json({ status: 'ok' });
})
app.use('/auth', authRouter);

//Events
app.on('error', (err) => console.error);

const server = app.listen(PORT, () => {
    console.log(`Servidor listo y escuchando en el puerto ${server.address().port}`);
});