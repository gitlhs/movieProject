//后台API（路由）文件
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user');
var movie = require('../models/movie')
var crypto  = require('crypto'); //加密的中间件
const init_token = 'TKL02o';


//管理需要验证其账号后台管理权限
//管理admin，添加新的电影
router.post('/movieAdd',function(req,res,next){
	//console.log(req.body)
	if(!req.body.username){
		return res.json({status:1,message:'用户名为空'})
	}
	if(!req.body.token){
		return res.json({status:1,message:'登录出错'})
	}
	if(!req.body.id){
		res.json({status:1,message:'用户传递错误'})
	}
	if(!req.body.movieName){
		return res.json({status:1,message:'电影名称为空'})
	}
	if(!req.body.movieImg){
		return res.json({status:1,message:'电影图片为空'})
	}
	if(!req.body.movieDownload){
		return res.json({status:1,message:'电影下载地址为空'})
	}


	if(! req.body.movieMainPage){
		var movieMainPage = false
	}
	//验证管理权限(验证token值和_id值的对应性，获得用户信息后，对用户后台权限进行验证，如果权限符合进行操作增加，反之直接返回错误信息)
	var check = checkAdminPower(req.body.username,       req.body.token,        req.body.id)

	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){

			if(findUser[0].userAdmin && ! findUser[0].userStop){
				//建立需要存入数据库的数据集结构
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
						return res.json({status:1,message:err})
					}else{
						return res.json({status:0,message:"添加成功"})
					}
				})
			}else{
				return res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	} else{
		return res.json({status:1,message:check.message})
	}
});
//the login API 【成功】
// router.post('/login',function(req,res,next){
// 		user.findUserLogin(req.body.username,req.body.password,function(err,userSave){
// 			console.log(userSave)
// 			if(userSave.length!=0){
// 				var token_after = getMD5Password(userSave[0]._id) 
// 				//用户名和密码正确时提示登录成功并且返回一个登录的Token值
// 				res.json({status:0,data:{token:token_after,user:userSave},message:'user logining success!!'})
// 			}else{
// 				res.json({status:1,message:"username  or password error"})
// 			}
// 		})
	
// });
//删除电影条目
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
		res.json({status:1,message:check.message })
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
function getMD5Password(id){
	var md5 = crypto.createHash('md5');
	var token_before = id +init_token 
		//res.json(userSave[0]._id)
		return md5.update(token_before).digest('hex')
}

function checkAdminPower(u_name,u_token,u_id){

	var ret  = {'error':1, 'message':'没有权限'}

	user.findById(u_id,function(err,userSave){

			//判断用户名跟数据库里的用户名是否一致
			if(u_name !== userSave[0].username){
				//返回error信息 :id不正确
				return ret
			}
			//封装数据库里的用户id为一个token
			var token_db = getMD5Password(userSave[0]._id)
			//判断数据库id的token跟用户上传的token是否一致
			if(u_token !== token_db){
				//返回error信息:token不正确
				return ret
			}
			//判断用户是否为管理员
			if(userSave[0].userAdmin == false){
				//返回信息：不是管理员
				return ret
			}
			//用户身份确认，可以进行电影条目的增删操作

			 ret.error = 0

			 ret.message = ''

	})

	 return ret

};


	
module.exports = router;





