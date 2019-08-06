//评论模型
var mongoose = require('../common/db');

var comment = new mongoose.Schema({
	user_id:String,
	movie_id:String,
	username:String,
	context:String, //评论内容
	check:Boolean
})

comment.statics.findByMovieId = function(m_id,callBack){
	this.find({movie_id:m_id,check:true},callBack);
};

comment.statics.findAll = function(movieMainPage,callBack){
	this.find({},callBack);
};

var commentModel = mongoose.model('comment',comment);
module.exports = commentModel