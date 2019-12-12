'use strict'

const path = require('path')

module.exports = {
  dev: { // 开发环境配置
    assetsSubDirectory: 'static', // 资源文件编译后存放的文件夹名称
    assetsPublicPath: '/', // 公共路径
    index: path.resolve(__dirname, '../public/index.html'), // index.html模板位置
    host: 'localhost', // 域名
    port: 8080, // 端口号
    autoOpenBrowser: true, // 自动打开浏览器
    proxyTable: {}, // 代理相关
  },
  build: { // 生产环境配置
    assetsRoot: path.resolve(__dirname, '../dist'), // 编译后的文件存放根路径
    assetsSubDirectory: 'static', // 资源文件编译后存放的文件夹名称
    assetsPublicPath: '/', // 公共路径
    index: path.resolve(__dirname, '../public/index.html'), // index.html模板位置
    productionGzip:true,
    productionGzipExtensions: ['js', 'css'], // 表示 js 和 css 后缀名文件将被压缩
    bundleAnalyzerReport: process.env.npm_config_report, // 表示是否开启 bundle 分析    

  }
}