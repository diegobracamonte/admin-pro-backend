require('dotenv').config();

const express=require('express');
const cors = require('cors');

const {dbConnection}=require('./database/config');

//crear el servidor de express
const app=express();

//configurar CORS
app.use(cors());

app.use(express.json());

dbConnection();

app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto ' + process.env.PORT);
})