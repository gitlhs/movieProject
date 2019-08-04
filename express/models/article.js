var mongoose = require('../common/db');

//定义文章表的数据集（字段）
var article = new mongoose.Schema({
	articleTitle:String,
	articleContext:String,
	articleTime:String
})

//通过id查找文章
article.statics.findByArticleId = function(id,callBack){
	this.find({_id:id},callBack);
};
//查找所有文章
article.statics.findAll = function(callBack){
	this.find({},callBack);
};

var articleModel = mongoose.model('article',article);
module.exports = articleModel;