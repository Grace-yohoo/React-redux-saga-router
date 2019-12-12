//加载express
const express = require('express');
//1.创建一个app对象（类似于server的对象）
var app = express();
const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql','root','123456',{
    host:'localhost',
    dialect:'mysql',

    pool: {
        max:10,
        min:0,
        idle:10000
    }
})

// 测试连接是否成功
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.log('Unable to connect to the database', err)
  })

// 根据 model自动创建表
sequelize
  .sync()
  .then(() => {
    console.log('init db ok')
  })
  .catch(err => {
    console.log('init db error', err)
  }) 

  const UserModel = sequelize.define('user', {
    // _id: {
    //   type: Sequelize.INTEGER(11),
    //   primaryKey: true,            // 主键
    //   autoIncrement: true,         // 自动递增
    // },
    name: Sequelize.STRING(100),
    key: Sequelize.STRING(100),
    createdAt:  Sequelize.STRING(100),
    desc:  Sequelize.STRING(100),
    source: Sequelize.STRING(100),

  }, {
    timestamps: false
  })

//注册路由（这里只能监听get方法和根目录）
app.get('/', (req, res)=> {
    res.sendFile('/home/grace/test/webserver/index.html');
})

//启动服务
app.listen(8080,()=>{
    console.log('http://localhost:8080');
})