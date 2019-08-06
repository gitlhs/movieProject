//邮箱模型

var mongoose = require('../common/db');

var mail = new mongoose.Schema({
	fromUser:String,
	toUser:String,
	title:String,
	context:String
})

mail.statics.findByToUserId = function(user_id,callBack){
	this.find({toUser:user_id},callBack);//查询发送的信件内容
};
mail.statics.findByFromUserId = function(user_id,callBack){
	this.find({fromUser:user_id},callBack);//查询接收的信件内容
};

//创建model构造器实例
var mailModel = mongoose.model('mail',mail); //参数一为模型的名字；参数二为Schema实例的名字
//mongoose会将集合（collection）名称设置为模型名称的小写版，如果名称最后一个字符为字母，则集合（表）名字变复数，如果最后字符为数字，则不变；

module.exports = mailModel
