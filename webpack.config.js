var webpack=require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var WEBPACK_ENV =process.env.WEBPACK_ENV || 'dev';



//获取html-webpack-plugin参数的方法
var getHtmlConfig=function(name,title){
    return {
        template:'./src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        inject:true,
        title:title ,
        hash:true,
        chunks:['common',name]
    }
}
//webpack config
var config={
    entry:{
        'index': ['./src/page/index/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'common':['./src/page/common/index.js'],
        'result':['./src/page/result/index.js']
    },
    output:{
        //生成路径
        path:'./dist',
        //页面访问路径
        publicPath:'/dist',
        filename:'js/[name].js'
    },
    externals:{
        //jQuery  Q大写 为了让jquery在方便子页面能够自定义引用
        'jquery':'window.jQuery'
    },
    
    plugins:[
    //公共模块    该配置为不需要子页面再进行加载
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        //css单独打包
        new ExtractTextPlugin("css/[name].css"),
        //html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ],
    //该形式讲css放在js中进行加载
    module:{
        loaders:[
        { test:/\.css$/, loader:ExtractTextPlugin.extract("style-loader","css-loader")},
        { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        { test:/\.string$/, loader:'html-loader'},
        ]
    },
    resolve:{
        alias:{
            //__dirname标识根目录
            util:__dirname+'/src/util',
            page:__dirname+'/src/page',
            service:__dirname+'/src/service',
            image:__dirname+'/src/image',
            node_modules:__dirname+'/node_modules',
        }
    }
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

//webpack 进行打包
module.exports=config;

