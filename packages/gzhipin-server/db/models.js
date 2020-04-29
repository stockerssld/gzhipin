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

const chatShema = mongoose.Schema({
    from: {type: String, require: true},
    to: {type: String, require:true},
    chat_id:{ type: String, require: true},
    content: {type: String, require: true},
    read: {type: Boolean, default: false},
    create_time: {type: Number}
})

const UserModel = mongoose.model('user',userSchema)
const ChatModel = mongoose.model('chat', chatShema)


exports.UserModel = UserModel
exports.ChatModel = ChatModel
