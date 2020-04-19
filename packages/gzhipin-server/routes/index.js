var express = require('express');
var router = express.Router();

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
router.post('/register',function(req, res, next){
	// 1. Obtener los parametos de busqueda
	const {username, password}=req.body
	// 2. Procesamiento
	if(username=='admin'){ // Registro fallara
		// Devolver respuesta
		res.send({code: 1, msg: 'El usuario ya existe'})
	}else{ //Registro exitoso
		res.send({code: 0, data: {id: 'id', username, password} })
	}
})
module.exports = router;
