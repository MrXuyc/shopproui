var webpack=require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var WEBPACK_ENV =process.env.WEBPACK_ENV || 'dev';



//获取html-webpack-plugin参数的方法
var getHtmlConfig=function(name){
    return {
        template:'./src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        inject:true,
        hash:true,
        chunks:['common',name]
    }
}
//webpack config
var config={
    entry:{
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/login.js'],
        'common':['./src/page/common/common.js']
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ],
    //该形式讲css放在js中进行加载
    module:{
        loaders:[
        { test:/\.css$/, loader:ExtractTextPlugin.extract("style-loader","css-loader")},
        { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    }
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

//webpack 进行打包
module.exports=config;

