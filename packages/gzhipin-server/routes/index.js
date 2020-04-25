var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel} = require('./../db/models')
const filter = {password: 0, __v: 0}

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/*
a) la ruta es path: /regsiter 
b) Eliminar es Post
c) username/password
d) usuario registrado es admin
e) Registro con exito {code: 0, data:{_id, 'abc, username:'xxx'}}
f) Registro cn error{code: 1, msg: 'Mensaje'}
*/
/*
1. Obtener parametros de solicitud 
2. Proceso
3. Devolver la trasnmisión de datos de la respuesta
*/
// router.post('/register',function(req, res, next){
// 	// 1. Obtener los parametos de busqueda
// 	const {username, password}=req.body
// 	// 2. Procesamiento
// 	if(username=='admin'){ // Registro fallara
// 		// Devolver respuesta
// 		res.send({code: 1, msg: 'El usuario ya existe'})
// 	}else{ //Registro exitoso
// 		res.send({code: 0, data: {id: 'id', username, password} })
// 	}
// })

router.post('/register', function(req, res, next){
	const { username, password, type } = req.body
	UserModel.findOne({username}, function(err, user){
		if(user){ // verificar si existe el usuario
			res.send({code: 1, msg: 'El usuario ya existe.'})
		}else{
			new UserModel({ username, password: md5(password), type}).save(function(err, user){
				res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
			
			
				const data = {username, type, _id: user._id} //No mandar la contraseña en la respuesta
				res.send({code: 0, data})
			})
		}
	})

})

router.post('/login', function( req, res, next){
	const {username, password} = req.body

	UserModel.findOne({username, password: md5(password)}, filter, function(err, user){
		if(user){
			res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
			res.send({code: 0, data: user})

		}else{
			res.send({code:1, msg: 'Credenciales incorrectas'})
		}
	})
})


router.post('/update', function(req, res){
	const userid=req.cookies.userid
	// console.log(userid)
	if(!userid){	
		return res.send({code:1, msg:'Debe iniciar sesión primero'})
	}
	const user = req.body
	// console.log(req)
	// res.json({req:req.cookies})
	UserModel.findByIdAndUpdate({_id: userid},user, function(error, oldUser){
		if(!oldUser){
			res.clearCookie('userid')
			res.send({code:1,msg:'por favor iniciar primero'})
		}else{
			const { _id, username, type }=oldUser
			const data = Object.assign({ _id, username, type }, user)
			  
			res.send({code: 0, data})
			// return res.json({status:"Operación Realizada", user:data})
		}
	})


})

module.exports = router;