//用于前台API
//主页推荐数据集（电影推荐数据模型）
var mongoose = require('../common/db');

//recommand表的数据集（字段）
var recommend = new mongoose.Schema({
	recommendImg:String,
	recommendSrc:String,
	recommendTitle:String
})
//通过id获得主页推荐
recommend.statics.findByIndexId = function(m_id,callBack){
	this.find({findByIndexId:m_id},callBack);
};

//找到所有推荐
recommend.statics.findAll = function(callBack){
	this.find({},callBack);
};
var recommendModel = mongoose.model('recommend',recommend);
module.exports = recommendModel