//用户模型
var mongoose = require('../common/db');//这里的数据库操作都是对common/db.js文件中已经连接的数据库而进行的

//user data collection of DB; seven fields;
var user = new mongoose.Schema({
	username:String,
	password:String,
	userMail:String,
	userPhone:String,
	userAdmin:Boolean, //是否管理员
	userPower:Number, //用户权限等级
	userStop:Boolean //是否封停
})
//mongoose模型对象的数据库查询方法find
user.statics.findAll = function(callBack){
	this.find({},callBack);
};

//使用用户名查找用户
user.statics.findByUsername = function(name,callBack){
	this.find({username:name},callBack);
};

//Dose the login-status have the same username and password,  the account is not blocked?(banned)
user.statics.findUserLogin = function(name,password,callBack){
	this.find({username:name,password:password,userStop:false},callBack);
};

//the validation of E-mail,phone and username,find the user
user.statics.findUserPassword = function(name,mail,phone,callBack){
	this.find({username:name,userMail:mail,userPhone:phone},callBack);
};

user.statics.findById = function (u_id,callBack) {
	// 
	this.find({_id:u_id},callBack);  //find方法类似于sql中的select()
	//xxxx这里的_id跟数据库里的字段一样，不能写错！！！！
};

var userModel = mongoose.model('user',user);
module.exports = userModel;











