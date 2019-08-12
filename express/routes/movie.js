//网站前台展示API（路由）文件
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var movie = require('../models/movie')
var comment = require('../models/comment');
var user = require('../models/user')


router.get('/', function(req, res, next) {
  return res.send('respond with a movie resource');
});

router.post('/detail', function(req, res, next) {
	if(! req.body.movie_id){
		return res.json({status:1,message:'电影id为空'})
	}
	movie.findById(req.body.movie_id,function(err,getArticle){
		return res.json({status:0,message:'获取电影详情成功',data:getArticle})
	})

});

router.post('/showNumber',function(req,res,next){
	if(!req.body.movie_id){
		return res.json({status:1,message:'电影id为空'})
	}
	movie.findById(req.body.movie_id,function(err,getSupposeNumber){
		return res.json({status:0,message:'获取点赞数',data:getSupposeNumber[0].movieNumSuppose})
	})
});

router.post('/showDownloadNumber',function(req,res,next){
	if(!req.body.movie_id){
		return res.json({status:1,message:'电影id为空'})
	}
	movie.findById(req.body.movie_id,function(err,getDownloadNumber){
		return res.json({status:0,message:'获取下载数',data:getDownloadNumber[0].movieNumDownload})
	})
})

router.post('/comment',function(req,res,next){
	if(!req.body.movie_id){
		return res.json({status:1,message:'电影id为空'})
	}
	comment.findByMovieId(req.body.movie_id,function(err,getComment){
		// console.log(getComment)
		// console.log(1111111)
		if (getComment.length == 0) {
				return res.json({status:1,message:'该电影评论不存在'})
			}
		console.log(getComment)	
		return res.json({status:0,message:'获取评论成功',data:getComment})
	})
})



module.exports = router;












