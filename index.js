require('dotenv').config();

const express=require('express');
const cors = require('cors');

const {dbConnection}=require('./database/config');

//crear el servidor de express
const app=express();

//configurar CORS
app.use(cors());

dbConnection();

app.get('/', (req,res)=>{{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
}});

app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en puerto ' + process.env.PORT);
})