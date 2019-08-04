var mongoose = require('mongoose');
var url = "mongodb://localhost/lhs"
//lhs是数据库名
mongoose.connect(url,{useNewUrlParser:true});
//connect database;
module.exports = mongoose;


//问题：在配置完user.js路由文件后，想进行连接，发现数据库连接错误：DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
//解决办法：添加{useNewUrlParser:true}参数