//后台API（路由）文件
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//管理需要验证其账号后台管理权限
//管理admin，添加新的电影
router.post('/movieAdd',function(req,res,next){
	if(! req.body.movieMainPage){
		var movieMainPage = false
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && ! findUser[0].userStop){
				var saveMovie = new movie({
					movieName:req.body.movieName,
					movieImg:req.body.movieImg,
					movieVideo:req.body.movieVideo,
					movieDownload:req.body.movieDownload,
					movieTime:Data.now(),
					movieNumSuppose:0,
					movieNumDownload:0,
					movieMainPage:movieMainPage,
				})
				saveMovie.save(function(err){
					if(err){
						res.json({status:1,message:err})
					}else{
						res.json({status:0,message:"添加成功"})
					}
				})
			}else{
				res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	} else{
		res.json({status:1,message:check.message})
	}
});
//删除后台添加的电影条目
router.post('./movieDel',function(req,res,next){
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && ! findUser[0].userStop){
				movie.remove({_id:req.body.movieId},function(err,delMovie){
					res.json({status:0,message:'删除成功',data:delMovie})
				})
			}else{
				res.json({error:1,message:'用户没有获得权限或者已经停用'})
			}
		})
	}
	else{
		res.json({status:1,message:check.message})
	}
});
//修改电影条目
router.post('/movieUpdate',function(req,res,next){
	if(! req.body.movieId){
		res.json({status:1,message:"电影id传递失败"})
	}
	if(! req.body.username){
		res.json({status:1,message:"用户名为空"})
	}
	if(! req.body.token){
		res.json({status:1,message:"登录出错"})
	}
	if(! req.body.id){
		res.json({status:1,message:"用户传递错误"})
	}
	//这里在前台打包一个电影对象全部发送到后台直接存储
	var saveData = req.body.movieInfo
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				movie.update({_id:req.body.movieId},saveData,function(err,delMovie){
					res.json({status:0,message:'删除成功',data:delMovie})
				})
			}else{
				res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	}else{
		res.json({status:1,message:check,message})
	}
});
//显示后台所有电影
router.get('/movie',function(req,res,next){
	movie.findAll(function(err,allMovie){
		res.json({status:0,message:'获得成功',data:allMovie})
	})
});
//显示后台所有评论
router.get('/commentList',function(req,res,next){
	comment.findAll(function(err,allComment){
		res.json({status:0,message:"获取成功",data:allComment})
	})
});
//将评论进行审核
router.post('/checkComment',function(req,res,next){
	if(! req.body.commentId){
		res.json({status:1,message:"评论id传递失败"})
	}
	if(! req.body.username){
		res.json({status:1,message:"用户名为空"})
	}
	if(! req.body.token){
		res.json({status:1,message:"登录出错"})
	}
	if(! req.body.id){
		res.json({status:1,message:"用户传递错误"})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
	user.findByUsername(req.body.username,function(err,findUser){
		if(findUser[0].userAdmin && ! findUser[0].userStop){
			comment.update({_id:req.body.commentId},{check:true},function(err,updateComment){
				res.json({status:0,message:'审核成功',data:updateComment})
			})
		}else{
			res.json({error:1,message:'用户没有获得权限或者已经停用'})
		}
	})

	}else{
		res.json({status:1,message:check.message})
		}
});
//对用户的评论进行删除
router.post('/delComment',function(req,res,next){
	if(! req.body.commentId){
		res.json({status:1,message:'评论id传递失败'})
	}
	if(! req.body.username){
		res.json({status:1,message:'用户名为空'})
	}
		if(! req.body.token){
		res.json({status:1,message:'登录出错'})
	}
		if(! req.body.id){
		res.json({status:1,message:'用户传递错误'})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				comment.remove({_id:req.body.commentId},function(err,delComment){
					res.json({status:0,message:'删除成功',data:delComment})
				})
			}else{
				res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//封停用户
router.post('/stopUser',function(req,res,next){
	if(! req.body.userId){
		res.json({status:1,message:"用户名id传递失败"})
	}
	if(! req.body.username){
		res.json({status:1,message:"用户名为空"})
	}
	if(! req.body.token){
		res.json({status:1,message:"登录出错"})
	}
	if(! req.body.id){
		res.json({status:1,message:"用户传递错误"})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				user.update({_id:req.body.userId},{userStop:true},function(err,updateUser){
					res.json({status:0,message:'封停成功',data:updateUser})
				})
			}else{
				res.json({err:1,message:'用户没有获得权限或者已经停用'})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//用户密码更改（管理员）
router.post('/changeUser',function(req,res,next){
	if(! req.body.userId){
		res.json({status:1,message:'用户名id传递失败'})
	}
	if(! req.body.username){
		res.json({status:1,message:'用户名为空'})
	}
	if(! req.body.token){
		res.json({status:1,message:'登录出错'})
	}
	if(! req.body.id){
		res.json({status:1,message:'用户传递错误'})
	}
	if(! req.body.newPassword){
		res.json({status:1,message:'用户新密码错误'})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				user.update({_id:req.body.userId},{password:req.body.newPassword},function(err,updateUser){
					res.json({status:0,message:'修改成功',data:updateUser})
				})
			}else{
				res.json({error : 1,message:'用户没有获得权限或者已经停用'})
			}
		})
	}
});
//后端所有用户的资料显示（列表）
router.post('/showUser',function(req,res,next){
	if(!req.body.username){
		res.json({status:1,message:"用户名为空"})
	}
	if(!req.body.tokem){
		res.json({status:1,message:"登录出错"})
	}
	if(!req.body.id){
		res.json({status:1,message:"用户传递错误"})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				user.findAll(function(err,alluser){
					res.json({status:0,message:'获取成功',data:alluser})
				})
			}else{
				res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//这里只是对后台权限的管理	
router.post('/powerUpdate',function(req,res,next){
	if(!req.body.userId){
		res.json({status:1,message:'用户名id传递失败传递失败'})
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'})
	}
	if(!req.body.token){
		res.json({status:1,message:'登录出错'})
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				user.update({_id:req.body.userId},{userAdmin:true},function(err,updateUser){
					res.json({status:0,message:'修改成功',data:updateUser})
				})
			}else{
				res.json({error:1,message:'用户没有获得权限或者已经停用'})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//后台新增文章
router.post('/addArticle',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:'登录出错'})
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'})
	}
	if(!req.body.articleTitle){
		res.json({status:1,message:'文章名称为空'})
	}
	if(!req.body.articleContext){
		res.json({status:1,message:'文章内容为空'})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				var saveArticle = new article({
					articleTitle:req.body.articleTitle,
					articleContext:req.body.articleContext,
					articleTime:Data.now()
				})
				saveArticle.save(function(err){
					if(err){
						res.json({status:1,message:err})
					}
				})
			}else{
				res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//后台删除文章
router.post('/delArticle',function(req,res,next){
	if(! req.body.articleId){
		res.json({status:1,message:"文章id传递失败"})
	}
	if(! req.body.username){
		res.json({status:1,message:"用户名为空"})
	}
	if(! req.body.token){
		res.json({status:1,message:"登录出错"})
	}
	if(! req.body.id){
		res.json({status:1,message:"用户传递错误"})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && ! findUser[0].userStop){
				article.remove({_id:req.body.articleId},function(err,delArticle){
					res.json({status:0,message:'删除成功',data:delArticle})
				})
			}else{
				res.json({error:1,message:'用户没有获得权限或者已经停用'})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//新增主页推荐
router.post('/addRecommend',function(req,res,next){
	if(!req.body.token){
		res.json({status:1,message:"登录出错"})
	}
	if(!req.body.id){
		res.json({status:1,message:"用户传递错误"})
	}
	if(!req.body.recommendImg){
		res.json({status:1,message:"推荐图片为空"})
	}
	if(!req.body.recommendSrc){
		res.json({status:1,message:"推荐跳转地址为空"})
	}
	if(!req.body.recommendTitle){
		res.json({status:1,message:"推荐标题为空"})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				var saveRecommend = new recommend({
					recommendImg:req.body.recommendImg,
					recommendSrc:req.body.recommendSrc,
					recommendTitle:req.body.recommendTitle
				})
				saveRecommend.save(function(err){
					if(err){
						res.json({status:1,message:err})
					}else{
						res.json({status:0,message:'保存成功'})
					}
				})
			}else{
				res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//删除主页推荐
router.post('/delRecommend',function(req,res,next){
	if(! req.body.recommendId){
		res.json({status:1,message:'评论id传递失败'})
	}
	if(! req.body.username){
		res.json({status:1,message:'用户名为空'})
	}
	if(! req.body.token){
		res.json({status:1,message:'登录出错'})
	}
	if(! req.body.id){
		res.json({status:1,message:'用户传递错误'})
	}
	var check = checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				recommend.remove({_id:req.body.recommendId},function(err,delRecommend){
					res.json({status:0,message:'删除成功',data:delRecommend})
				})
			} else{
				res.json({error:1,message:' 用户没有获得权限或者已经停用'})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}

});

module.exports = router;





