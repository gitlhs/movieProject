//movie模型
var mongoose = require('../common/db');

var movie = new mongoose.Schema({
	movieName:String,
	movieImg:String,
	movieVideo:String,
	movieDowndload:String,
	movieTime:String,
	movieNumSuppose:Number, // xxxx 这里不能写String
	movieNumDownload:Number, // xxxx 这里不能写String
	movieMainPage:Boolean,

})	
movie.statics.findById = function(movie_id,callBack){
	this.find({_id:movie_id},callBack);//xxx这里的movie_id应该和数据库里的字段一样
}	//之前在movie_id后面加了个,check:true，导致出错，要去掉

var movieModel = mongoose.model('movie',movie);
module.exports = movieModel