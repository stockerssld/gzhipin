/*
    Base de datos con mongoose mongoDB
*/
const md5=require('blueimp-md5')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin_test')

const conn = mongoose.connection

conn.on('connected', function(){
    console.log('base de datos conectada')
})


const userShema= mongoose.Schema({
    username:{type:String, required:true},
    password:{type: String, required:true},
    type:{type:String, required:true},
    header:{type:String}
})

const UserModel = mongoose.model('user', userShema)

function testSave(){
    const userModel= new UserModel({username:'Tom', password: md5('127ad127'), type:'Hombre'})
    userModel.save(function(e, user){
        console.log('save()', e, user)
    })
}

// testSave()

// find/findOne | Busca multiples o un usuario
function testFind(){
    //una matriz con una Lista de objetos con coincidencia,
    UserModel.find({_id:'5e9c65a04f679b1d7454383b'}, function (error, users){
        console.log('find()', error,users)
    })

    // UserModel.find(function (error, users){
    //     console.log('find()', error,users)
    // })

    //Obitnen una coincidencia, si no hay es nulo
    UserModel.findOne({_id:'5e9c65a04f679b1d7454383b'}, function(error, user){
        console.log('findOne()', error,user)
    })
}

// testFind()


function testUpdate (){
    UserModel.findByIdAndUpdate({_id: '5e9c65a04f679b1d7454383b'},
    {username:'Padre'}, function(error, oldUser){
        console.log('findByIdAndUpdate()', error,oldUser)
    })
}
// testUpdate()

function testDelete(){
    UserModel.remove({_id:'5e9c65a04f679b1d7454383b'}, function(err, doc){
        console.log('remove()', err,doc) //{n:1/0, ok:1}
    })
}
testDelete()