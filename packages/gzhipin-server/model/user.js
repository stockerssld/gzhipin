const userShema= mongoose.userShema({
    username:{type:String, required:true},
    password:{type: String, required:true},
    type:{type:String, required:true},
    header:{type:String}
})

const userModel = mongoose.model('user', userShema)

function testSave(){
    new userModel({username:'Tom', password="123", type='Hombre'})
}

testSave()