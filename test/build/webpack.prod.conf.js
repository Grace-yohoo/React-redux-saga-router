const path = require("path")
const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 在头部引入
const config = require('../config')
const utils = require('./utils')

const webpackConfig = merge(baseWebpackConfig, {
    mode: "production", // 两个参数: production 和 development
    entry: {
      // 配置入口文件
      app: "./src/index.js"
    },
    output: {
      // 配置输出文件
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin(), // 压缩js文件
      ],
      // 目的是分离框架代码和业务代码
      splitChunks: {
        chunks: "all",
        minChunks: 1,
        cacheGroups: {
          framework: {
            // 定义被抽离的模块
            priority: 200,
            test: "framework",
            name: "framework",
            enforce: true,
            reuseExistingChunk: true
          },
          vendor: {
            priority: 10,
            test: /node_modules/,
            name: "vendor",
            enforce: true,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: config.build.index,
        inject: "body", // script 标签位于 body 底部
        minify: {
          // 使用 minify 会对生成的 html 文件进行压缩
          removeComments: true, // 清理html中的注释
          collapseWhitespace: true, // 清理html中的空格、换行符
          removeAttributeQuotes: true // 移除属性的引号
        }
      }),
      new CleanWebpackPlugin({
        root: config.build.assetsRoot, //根目录
        verbose: true //开启在控制台输出信息
      }),
      new MiniCssExtractPlugin({
        // 导出 css
        filename: utils.assetsPath("css/[name].[hash:5].css"),
        chunkFilename: utils.assetsPath("css/[id].[hash:5].css")
      })
    ],
    module: {
      // 所有的第三方模块的配置规则
      rules: [
        // 第三方匹配规则
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader?modules&localIdentName=[local]-[hash:5]"
            },
            "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    }
  })
  
  if (config.build.productionGzip) {
    // 添加gzip压缩插件
    const CompressionWebpackPlugin = require("compression-webpack-plugin")
  
    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]', // 压缩后的文件名
        algorithm: 'gzip', // 算法 默认gzip
        test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'), // 针对文件的正则表达式规则，符合规则的文件被压缩
        threshold: 10240, // 文件大于这个值的会被压缩
        minRatio: 0.8 // 压缩率 默认0.8
      })
    )
  }
  
  module.exports = webpackConfig