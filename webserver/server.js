
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('mysql', 'root', '123456', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql'
});

//连接状态检查
sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });


//创建表的结构
const User = sequelize.define('react_table', {
    name:Sequelize.STRING(255),
    desc: Sequelize.STRING,
    source:Sequelize.STRING,
    url:Sequelize.STRING,
  },  
  {
    timestamps: true,
  } 
);




app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//注册路由（这里只能监听get方法和根    res.send(str)目录）
app.get('/', function (req, res) {
    new Promise((resolve,reject)=> {
      let data =  User.findAll({
  
      });
      resolve(data)
    })
    .then(data =>(res.send(JSON.stringify(data))))
})

//初始渲染数据
app.post('/', function (req, res) {
    console.log("POST");
    new Promise((resolve,reject)=> {
      let data =  User.findAll({
  
      });
      resolve(data)
    })
    .then(data =>(res.send(JSON.stringify(data))))
    
})

//增加
app.post('/add', function(req, res){
  new Promise((resolve,reject) => {
       //获取数据
       let reqdata = req.body;
       //获取key部分
       str = Object.keys(reqdata)
       //转换为对象
       da= JSON.parse(str)
       let data =  User.create({
        name : da.name,
        desc : da.desc,
        source : da.source,
        url : da.url
       });
       resolve(data)
  })
  .then(data => res.send(JSON.stringify(data)))
    
})


//删除
app.post('/delete', (req,res)=> {
  //获取数据
  new Promise((resolve,reject) => {
    let id = req.body;
    str = Object.keys(id)
    //转换为对象
    da= JSON.parse(str)

    let data = User.destroy({
          where:{
            createdAt: da
          }
     })  
    resolve(data)    
  })
  .then((data)=> res.send(JSON.stringify(data)))

})


//搜索
app.post('/search',(req,res) =>{
  let name = req.body;
  str = Object.keys(name)
  //转换为对象
  da= JSON.parse(str)
  User.findAll({
      where:{
        name: {
          [Op.like]: `%${da}%`
        }
      }
    }).then(updata=>{
      str = JSON.stringify(updata)
      res.send(str)

    });
})

//重置
app.post('/reset',(req,res) => {
  new Promise((resolve,reject)=> {
    let data =  User.findAll({

    });
    resolve(data)
  })
  .then(data =>(res.send(JSON.stringify(data))))
})

//修改
app.post('/change',(req,res)=>{
  new Promise((resolve,reject) => {
    let str = req.body
    da1 = Object.keys(str)
    da= JSON.parse(da1)
    console.log(da)

   let data =  User.update({
      name: da.name,
      desc: da.desc,
      source: da.source,
    },{
      where:{
        createdAt: da.key,
      }
    });
    resolve(data)
  })
  .then((data) => res.send(JSON.stringify(data)))

})


app.listen(8080,function(){
    console.log('http://localhost:8080');
})
