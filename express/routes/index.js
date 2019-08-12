//网站前台展示API（路由）文件
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recommend = require('../models/recommend')
var movie = require('../models/movie')
var article = require('../models/article')
var user = require('../models/user')

/* 获取主页html【成功】 */ 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取所有前台页面中的主页推荐信息【成功】
router.get('/showIndex',function(req,res,next){
	recommend.findAll(function(err,getRecommend){
		res.json({status:0,message:"获取推荐",data:getRecommend})
	})
});

//显示排行榜 【成功】其实就是查找所有的电影条目
router.get('/showRanking',function(req,res,next){
	movie.find(function(err,getMovies){
		res.json({status:0,message:'显示排行榜成功',data:getMovies})
	})
});

//显示文章列表 【成功】
router.get('/showArticle',function(req,res,next){
	article.findAll(function(err,getArticles){
		res.json({status:0,message:" 获取文章列表成功",data:getArticles})
	})
});

//显示文章内容【成功】
router.post('/articleDetail',function(req,res,next){
			console.log(req.body)
	if(! req.body.article_id){
		return res.json({status:1,message:'文章id出错'})
	}
	article.findByArticleId(req.body.article_id,function(err,getArticle){
		return res.json({status:0,message:'获取成功',data:getArticle})
	})
});

//展示用户信息 【成功】data为数组，回调需要加[0]
router.post('/showUser',function(req,res,next){
	if(!req.body.user_id){
		console.log(req.body)
		res.json({status:1,message:"用户状态出错"})
	}
	user.findById(req.body.user_id,function(err,getUser){
		console.log(getUser)
		res.json({status:0,message:"获取成功",data:{
			user_id:getUser[0]._id,
			username:getUser[0].username,
			userMail:getUser[0].userMail,
			userPhone:getUser[0].userPhone,
			userStop:getUser[0].userStop
			//xxx这里的data为数组，需要加[0]
		}})
	})
});



module.exports = router;












