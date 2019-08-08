//后台API（路由）文件
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user');
var movie = require('../models/movie')
var comment = require('../models/comment')
var article = require('../models/article')
var recommend = require('../models/recommend')
var crypto  = require('crypto'); //加密的中间件
const init_token = 'TKL02o';


//管理需要验证其账号后台管理权限
//管理admin，添加新的电影 【成功】 第一次遇到坑爹的nodejs异步问题，解决方法用async await Promise！
router.post('/movieAdd',async function(req,res,next){
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
	var check = await checkAdminPower(req.body.username, req.body.token, req.body.id)

	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){

			if(findUser[0].userAdmin && !findUser[0].userStop){
				//建立需要存入数据库的数据集结构
				var saveMovie = new movie({
					movieName:req.body.movieName,
					movieImg:req.body.movieImg,
					movieVideo:req.body.movieVideo,
					movieDownload:req.body.movieDownload,
					movieTime:Date.now(),
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

//删除电影条目 【成功】 //404原因：路由写错，前面加了个点，捂脸
router.post('/movieDel',async function(req,res,next){
	if(!req.body.movieId){
		res.json({status:1,message:'电影id传递失败'})
	}
	if(!req.body.username){
		res.json({status:1,message:'用户名为空'})
	}
	if(!req.body.token){
		res.json({status:1,message:'登录出错'})
	}
	if(!req.body.id){
		res.json({status:1,message:'用户名id传递错误'})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
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
//修改电影条目 [需要写模型里的mongoose更新方法]
router.post('/movieUpdate',async function(req,res,next){
	if(! req.body.movieId){
		return res.json({status:1,message:"电影id传递失败"})
	}
	if(! req.body.username){
		return res.json({status:1,message:"用户名为空"})
	}
	if(! req.body.token){
		return res.json({status:1,message:"登录出错"})
	}
	if(! req.body.id){
		return res.json({status:1,message:"用户传递错误"})
	}
	if(!req.body.movieInfo){
		return res.json({status:1,message:"修改信息为空"})
	}
	
	var saveData = req.body.movieInfo //这里在前台打包一个电影对象(作为movie模型里update方法的参数)全部发送到后台直接存储
	//movieInfo为一个更新对象，例如
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		console.log(check.error)
		user.findByUsername(req.body.username,function(err,findUser){ 
			if(findUser[0].userAdmin && !findUser[0].userStop){
				movie.findOneAndUpdate({_id:req.body.movieId},saveData,function(err,movieUpdate){
					console.log(movieUpdate)
					res.json({status:0,message:'运行到这',data:movieUpdate})
				})
			}else{
				res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//显示后台所有电影 【成功】
router.get('/movie',function(req,res,next){
	movie.findAll(function(err,allMovie){
		res.json({status:0,message:'获得成功',data:allMovie})
	})
});
//显示后台所有评论 【成功】
router.get('/commentList',function(req,res,next){
	comment.findAll(function(err,allComment){
		res.json({status:0,message:"获取成功",data:allComment})
	})
});
//将评论进行审核 【成功】可以给movieUpdate参考
router.post('/checkComment',async function(req,res,next){
	if(! req.body.commentId){
		return res.json({status:1,message:"评论id传递失败"})
	}
	if(! req.body.username){
		return res.json({status:1,message:"用户名为空"})
	}
	if(! req.body.token){
		return res.json({status:1,message:"登录出错"})
	}
	if(! req.body.id){
		return res.json({status:1,message:"用户传递错误"})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
	user.findByUsername(req.body.username,function(err,findUser){
		if(findUser[0].userAdmin && ! findUser[0].userStop){
			comment.update({_id:req.body.commentId},{check:true},function(err,updateComment){
				return res.json({status:0,message:'审核成功',data:updateComment})
			})
		}else{
			return res.json({error:1,message:'用户没有获得权限或者已经停用'})
		}
	})

	}else{
		return res.json({status:1,message:check.message})
		}
});
//对用户的评论进行删除 【成功】
router.post('/delComment',async function(req,res,next){
	if(! req.body.commentId){
		return res.json({status:1,message:'评论id传递失败'})
	}
	if(! req.body.username){
		return res.json({status:1,message:'用户名为空'})
	}
	if(! req.body.token){
		return res.json({status:1,message:'登录出错'})
	}
	if(! req.body.id){
		return res.json({status:1,message:'用户传递错误'})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)

	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			if(findUser[0].userAdmin && !findUser[0].userStop){
				comment.remove({_id:req.body.commentId},function(err,delComment){
					res.json({status:0,message:'删除成功',data:delComment})
				})
			}else{
				res.json({status:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	}else{
		res.json({status:1,message:check.message})
	}
});
//封停用户 【成功，需要添加被封用户id是否存在的判断方法】
router.post('/stopUser',async function(req,res,next){
	if(! req.body.userId){
		return res.json({status:1,message:"被封用户的id传递失败"})
	}
	if(! req.body.username){
		return res.json({status:1,message:"用户名为空"})
	}
	if(! req.body.token){
		return res.json({status:1,message:"登录出错"})
	}
	if(! req.body.id){
		return res.json({status:1,message:"管理员传递错误"})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
	console.log(check.error)

	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			console.log(findUser)
			if(findUser[0].userAdmin && !findUser[0].userStop){
				//判断用户上传的被封id有没有存在
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
//管理员更新用户密码（高权限） 【成功】&再添加判断被改用户id是否存在的验证&
router.post('/changeUser',async function(req,res,next){
	if(! req.body.userId){
		return res.json({status:1,message:'用户名id传递失败'})
	}
	if(! req.body.username){
		return res.json({status:1,message:'用户名为空'})
	}
	if(! req.body.token){
		return res.json({status:1,message:'登录出错'})
	}
	if(! req.body.id){
		return res.json({status:1,message:'用户传递错误'})
	}
	if(! req.body.newPassword){
		return res.json({status:1,message:'用户新密码错误'})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
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
//后台所有用户的资料显示 【成功】完善：过滤掉密码显示
router.post('/showUser',async function(req,res,next){
	if(!req.body.username){
		return res.json({status:1,message:"用户名为空"})
	}
	if(!req.body.token){
		return res.json({status:1,message:"登录出错"})
	}
	if(!req.body.id){
		return res.json({status:1,message:"用户传递错误"})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
	console.log(check.error)
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
//把用户升级为管理员 【成功】
router.post('/powerUpdate',async function(req,res,next){
	if(!req.body.userId){
		return res.json({status:1,message:'被修改用户的id传递失败'})
	}
	if(!req.body.username){
		return res.json({status:1,message:'管理员用户名为空'})
	}
	if(!req.body.token){
		return res.json({status:1,message:'登录出错'})
	}
	if(!req.body.id){
		return res.json({status:1,message:'管理员id传递错误'})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
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
//后台新增文章 【成功】
router.post('/addArticle',async function(req,res,next){
	if(!req.body.token){
		return res.json({status:1,message:'登录出错'})
	}
	if(!req.body.id){
		return res.json({status:1,message:'管理员id传递错误'})
	}
	if(!req.body.username){
		return res.json({status:1,message:'管理员用户名为空'})
	}
	if(!req.body.articleTitle){
		return res.json({status:1,message:'文章名称为空'})
	}
	if(!req.body.articleContext){
		return res.json({status:1,message:'文章内容为空'})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
	if(check.error == 0){
		user.findByUsername(req.body.username,function(err,findUser){
			console.log(findUser)
			if(findUser[0].userAdmin && !findUser[0].userStop){
				var saveArticle = new article({
					articleTitle:req.body.articleTitle,
					articleContext:req.body.articleContext,
					articleTime:Date.now()
				})
				saveArticle.save(function(err){
					if(err){
						res.json({status:1,message:err})
					}else{
						res.json({status:0,message:'添加文章成功'})
					}
				})
			}else{
				return res.json({error:1,message:"用户没有获得权限或者已经停用"})
			}
		})
	}else{
		return res.json({status:1,message:check.message})
	}
});
//后台删除文章 【成功】
router.post('/delArticle',async function(req,res,next){
	if(! req.body.articleId){
		res.json({status:1,message:"文章id传递失败"})
	}
	if(! req.body.username){
		res.json({status:1,message:"管理员用户名为空"})
	}
	if(! req.body.token){
		res.json({status:1,message:"管理员登录出错"})
	}
	if(! req.body.id){
		res.json({status:1,message:"管理员id传递错误"})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
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
//新增主页推荐 【成功】
router.post('/addRecommend',async function(req,res,next){
	if(!req.body.token){
		return res.json({status:1,message:"登录出错"})
	}
	if(!req.body.id){
		return res.json({status:1,message:"管理员id传递错误"})
	}
	if(!req.body.username){
		return res.json({status:1,message:' 管理员username为空！'})
	}
	if(!req.body.recommendImg){
		return res.json({status:1,message:"推荐图片为空"})
	}
	if(!req.body.recommendSrc){
		return res.json({status:1,message:"推荐跳转地址为空"})
	}
	if(!req.body.recommendTitle){
		return res.json({status:1,message:"推荐标题为空"})
	}
	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
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
//删除主页推荐 【成功】 &判断请求id数据库里是否存在&
router.post('/delRecommend',async function(req,res,next){
	if(! req.body.recommendId){
		return res.json({status:1,message:'评论id传递失败'})
	}
	if(! req.body.username){
		return res.json({status:1,message:'管理员username为空'})
	}
	if(! req.body.token){
		return res.json({status:1,message:'登录出错'})
	}
	if(! req.body.id){
		return res.json({status:1,message:'管理员id传递错误'})
	}

	var check = await checkAdminPower(req.body.username,req.body.token,req.body.id)
	
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
		//const init_token = 'TKL02o';
		//res.json(userSave[0]._id)
		return md5.update(token_before).digest('hex')
}
function checkAdminPower(u_name,u_token,u_id){
	
	return new Promise(function(resolve, reject) {

		user.findById(u_id,function(err,userSave){
				
				// 初始化变量
				var ret  = {'error':1, 'message':'没有权限'}
				var token_db = getMD5Password(userSave[0]._id) //封装数据库里的用户id为一个token
				
				//判断用户名跟数据库里的用户名是否一致
				if(u_name !== userSave[0].username){
					
					resolve(ret) //返回error信息 :id不正确
				
				//判断数据库id的token跟用户上传的token是否一致
				} else if(u_token !== token_db){
					
					resolve(ret) //返回error信息:token不正确
				
				//判断用户是否为管理员
				} else if(userSave[0].userAdmin == false){
					
					resolve(ret) //返回信息：不是管理员
				
				} else {

					ret['error']   = 0
					ret['message'] = ''
					resolve(ret) //用户身份确认，可以进行电影条目的增删操作
				}	
		})

	})
};


module.exports = router;





