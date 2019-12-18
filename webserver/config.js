var config = {
    port : '8080',//监听端口号
    root : '.',//根目录地址(先用.代替)
    inlet_file : ['index.html',],//入口文件
    special_suffixes : '.js',//需要解析的文件类型
    access_denied : [''],//拒绝访问的类型

    create : ['正方形','10'] //生成图形接口
}
module.exports =  config;