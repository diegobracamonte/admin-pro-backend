const {Schema, model} = require('mongoose');

const UsuarioSchema=Schema({
    nombre:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    img:{
        type:String
    },
    role:{
        type:String,
        default: 'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    },
});

UsuarioSchema.method('toJSON', function(){
    const {_v, _id, password, ...object} = this.toObject();
    object.uid=_id;
    return object;
});

module.exports=model('Usuario', UsuarioSchema);