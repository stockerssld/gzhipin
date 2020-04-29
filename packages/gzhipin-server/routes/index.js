var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel,  ChatModel} = require('./../db/models')
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



// 更新用户信息的路由
router.post('/update', function (req, res) {
	// 从请求的cookie得到userid
	const userid = req.cookies.userid
	// 如果不存在, 直接返回一个提示信息
	if(!userid) {
	  return res.send({code: 1, msg: '请先登陆'})
	}
	// 存在, 根据userid更新对应的user文档数据
	// 得到提交的用户数据
	const user = req.body // 没有_id
	UserModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {
  
	  if(!oldUser) {
		// 通知浏览器删除userid cookie
		res.clearCookie('userid')
		// 返回返回一个提示信息
		res.send({code: 1, msg: '请先登陆'})
	  } else {
		// 准备一个返回的user数据对象
		const {_id, username, type} = oldUser
		const data = Object.assign({_id, username, type}, user)
		// 返回
		res.send({code: 0, data})
	  }
	})
  })

router.get('/user', function(req, res){
	const userid = req.cookies.userid
	if(!userid){
		return res.send({code:1, msg: 'Primero debe iniciar sesión'})
	}
	UserModel.findOne({_id: userid}, filter, function(error, user){
		res.send({code: 0, data:user})
	})
})

router.get('/userlist', function(req, res){
	const {type} = req.query
	UserModel.find({type},filter, function(error, users){
		res.send({code:0, data: users})
	})
})


router.get('/msglist', function(req, res){
	const userid = req.cookies.userid
	UserModel.find(function(err, usersDocs){
		// let users={}
		// users= usersDocs.forEach(doc=>{
		// 	users[doc._id]={ username: doc.username, header: doc.header}
		// })

		const users = usersDocs.reduce((users, user)=>{
			users[user._id]= {username: user.username, header: user.header}
			return users

		}, {})

		ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function(err, chatMsgs){
			res.send({code: 0, data: {users, chatMsgs}})
		})
	})
})

router.post('/readmsg', function(req, res){
	const from = req.body.from
	const to = req.body.userid

	ChatModel.update({from, to, read: false},{read:true}, {multi: true}, function(err, doc){
		console.log('/readmsg', doc)
		res.send({code: 0, data: doc.nModified})
	})
})

module.exports = router;
