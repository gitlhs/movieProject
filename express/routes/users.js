var express = require('express');
var router  = express.Router();

//
var user    = require('../models/user');
var crypto  = require('crypto'); //加密的中间件
var movie = require('../models/movie');
var mail    = require('../models/mail');
var comment = require('../models/comment');
const init_token = 'TKL02o';

/* GET users listing. */ //系统默认的users API即其对应的操作
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//the login API 【成功】
router.post('/login',function(req,res,next){
		//验证用户提交的登录表单数据的完整性
		if(!req.body.username){
			res.json({status:1,message:'username is null'})
		}if(!req.body.password){
			res.json({status:1,message:'password is null'})
		}
		user.findUserLogin(req.body.username,req.body.password,function(err,userSave){
			console.log(userSave)
			if(userSave.length!=0){
				var token_after = getMD5Password(userSave[0]._id) 
				//用户名和密码正确时提示登录成功并且返回一个登录的Token值
				res.json({status:0,data:{token:token_after,user:userSave},message:'user logining success!!'})
			}else{
				res.json({status:1,message:"username  or password error"})
			}
		})
	
});
//注册 API 【成功】
router.post('/register',function(req,res,next){
	if(! req.body.username){
		return res.json({status:1,message:"username is null!"})
	}
	if(! req.body.password){
		return res.json({status:1,message:"password is null!"})
	}
	if(! req.body.userMail){
		return res.json({status:1,message:"userMail is null!"})
	}
	if(! req.body.userPhone){
		return res.json({status:1,message:"userPhone is null"})
	}
	//使用用户名查找用户
	user.findByUsername(req.body.username,function(err,userSave){
		if(userSave.length!=0){
			return res.json({status:1,message:"the user has been registed!!!"})
		}else{
			var registerUser = new user({ //实例化一个user模型(注册)，详细查看/models/user.js
				username:req.body.username,
				password:req.body.password,
				userMail:req.body.userMail,
				userPhone:req.body.userPhone,
				userAdmin:0,
				userPower:0,
				userStop:0
				})
			registerUser.save(function(){ //save？
				return res.json({status:0,message:"registing success!!!"})
			})
		}
	})
});
//提交评论 API 【成功】
router.post('/postComment',function(req,res,next){
	if(!req.body.username){
		var username = '匿名用户'
	}
	if(!req.body.movie_id){
		return res.json({status:1,message:'电影id为空'})
	}
	if(! req.body.context){
		return res.json({status:1,message:'评论内容为空'})
	}
	if(! req.body.context){
		return res.json({status:1,message:'评论内容为空'})
	}
	var saveComment = new comment({
		movie_id:req.body.movie_id,
		username:req.body.username?req.body.username:username,
		context:req.body.context,
		check:0
	})
	saveComment.save(function(err){
		if(err){
			return res.json({status:1,message:err})
		}else{
			return res.json({status:0,message:'评论成功'})
		}
	})
});
//the support点赞 API 【成功】 [点赞一直失败， 因为movie表结构的数据类型应该为number,且supportMovie为数组，应该+[0]]
router.post('/support',function(req,res,next){

		if(!req.body.movie_id){
			return res.json({status:1,message:'电影id为传递失败'})
		}
		movie.findById(req.body.movie_id,function(err,supportMovie){
			if (supportMovie.length == 0) {
				return res.json({status:1,message:'该电影不存在'})
			}
			console.log(supportMovie)
			movie.updateOne({_id:req.body.movie_id},{movieNumSuppose:
				supportMovie[0].movieNumSuppose + 1},function(err){
					if(err){
						return res.json({status:1,movieNumSupposeage:'点赞失败',data:err})
					}
					return res.json({status:0,message:'点赞成功'})
				})
		})
	
});
//找回密码 API 【成功】
router.post('/findPassword',function(req,res,next){
	if(req.body.repassword){
		console.log(req.body) //拿到了
		if(req.body.token){ //登录状态
			if(!req.body.user_id){
				return res.json({status:1,message:'用户登录错误'})
			}
			if(!req.body.password){
				return res.json({status:1,message:'用户老密码错误'})
			}
			if(req.body.token == getMD5Password(req.body.user_id)){
				user.findOne({_id:req.body.user_id,password:req.body.password},function(err,checkUser){
					if(checkUser){
						user.update({_id:req.body.user_id},{password:req.body.repassword},function(err,userUpdate){
							if(err){
								return res.json({status:1,message:'更改错误',data:err})
							}return res.json({status:0,message:'更改成功',data:userUpdate})
						})
					}else{
						return res.json({status:1,message:'用户老密码错误'})
					}
				})

			 }	
			 else{
						return res.json({status:1,message:'用户登录错误'})
				}
		}	
		else{			//未登录状态
		user.findUserPassword(req.body.username,req.body.userMail,req.body.userPhone,function(err,userFound){
				if(userFound.length!=0){
					user.update({_id:userFound[0]._id},{password:req.body.repassword},function(err,userUpdate){
						if(err){
							res.json({status:1,message:'更改错误',data:err})
						}
						res.json({status:0,message:' 更改成功',data:userUpdate})
					})
				}else{
					res.json({status:1,message:'信息错误'})
				}
			})
		}
	}else{
		if(!req.body.username){
			res.json({status:1,message:'用户名称为空'})
		}
		if(!req.body.userMail){
			res.json({status:1,message:'用户邮箱为空'})
		}
		if(!req.body.userPhone){
			res.json({status:1,message:'用户手机为空'})
		}
		user.findUserPassword(req.body.username,req.body.userMail,req.body.userPhone,function(err,userFound){
			if(userFound.length!=0){
				res.json({status:0,message:'验证成功，请修改密码',data:{username:req.body.username,userMail:req.body.userMail,userPhone:req.body.userPhone}})
			}else{
				res.json({status:1,message:'信息错误'})
			}
		})				
	}
});

//the sendEmail API 
router.post('/sendEmail',function(req,res,next){
	if(! req.body.token){
		res.json({status:1,message:"用户登录状态错误"})
	}
	if(! req.body.user_id){
		res.json({status:1,message:"用户登录状态出错"})
	}
	if(! req.body.toUserName){
		res.json({status:1,message:"未选择相关的用户"})
	}
	if(! req.body.title){
		res.json({status:1,message:"标题不能为空"})
	}
	if(! req.body.context){
		res.json({status:1,message:"内容不能为空"})
	}
	if(req.body.token == getMD5Password(req.body.user_id)){
  		user.findByUsername(req.body.toUserName,function(err,toUser){
			if(toUser.length!=0){
				var NewEmail = new mail({fromUser:req.body.user_id,toUser:toUser[0]._id,title:req.body.title,context:req.body.context})
				NewEmail.save(function(){
					res.json({status:0,message:"发送成功"})
				
			
		})
	}else{
		res.json({status:1,message:"您发送的对象不存在"})
		}
	})
	}else{
		res.json({status:1,message:"用户登录错误"})
	}
});
//show Email
router.post('/showEmail',function(req,res,next){
	if(! req.body.token){
		res.json({status:1,message:"用户登录状态错误"})
	}
	if(! req.body.user_id){
		res.json({status:1,message:"用户登录状态出错"})
	}
	if(! req.body.receive){
		res.json({status:1,message:"参数出错"})
	}
	if(! req.body.token == getMD5Password(req.body.user_id)){
		if(req.body.receive == 1){
			mail.findByFromUserId(req.body.user_id,function(err,sendMail){
				res.json({status:0,message:"获取成功",data:sengMail})
			})
		}else{
			mail.findByToUserId(req.body.user_id,function(err,receiveMail){
				res.json({status:0,message:'获取成功',data:receiveMail})
			})
		}
	}else{
		res.json({status:1,message:"用户登录错误"})
	}
});

//download API 【得看movie表】
router.post('/download',function(req,res,next){
	if(! req.body.movie_id){
		res.json({status:1,message:""})
	}
	movie.findById(req.body.movie_id,function(err,supportMovie){
		movie.update({_id:req.body.movie_id},{movieNumDownload:
			supportMovie.movieNumDownload + 1},function(err){
				if(err){
					res.json({status:1,message:"下载失败",data:err})
				}
				res.json({status:0,message:'下载成功',data:supportMovie.movieDownload}) //返回下载地址，并自动增加一个下载数
			})
	})
});
//the getting of MD5 API
function getMD5Password(id){
	var md5 = crypto.createHash('md5');
	var token_before = id +init_token 
		//res.json(userSave[0]._id)
		return md5.update(token_before).digest('hex')
}

module.exports = router;
