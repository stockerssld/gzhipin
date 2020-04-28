// Importar mongoose
const mongoose = require('mongoose')

// Conectar base de datos mediate URL
mongoose.connect('mongodb://localhost:27017/gzhipin')

// 
const conn = mongoose.connection

// Realizas la conexión
conn.on('connected', ()=>{
    console.log('db connect success')
})

const userSchema = mongoose.Schema({
    username: {type: String, require:true},
    password: {type: String, require: true},
    type:{type: String, require: true},
    header: {type: String},
    post: {type: String},
    info: {type: String},
    company: {type: String},
    salary: {type: String}
})

const UserModel = mongoose.model('user',userSchema)

exports.UserModel = UserModel

