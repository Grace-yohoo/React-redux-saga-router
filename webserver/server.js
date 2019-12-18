
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

const dataq = (res) => {
    User.findAll().then(users => {
    str = JSON.stringify(users)
    res.send(str)
  })
}



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
    dataq(res)
})

app.post('/', function (req, res) {
    console.log("POST");
    dataq(res)
})

//增加
app.post('/add', function(req, res){
   //获取数据
    let reqdata = req.body;
    //获取key部分
    str = Object.keys(reqdata)
    //转换为对象
    da= JSON.parse(str)
    //传入插数据方法
    insert(da,res)
})



//mysql增加数据
const insert = (da,res) => {
    try{
      User.create({
        name : da.name,
        desc : da.desc,
        source : da.source,
        url : da.url
      });

  }
  catch{
    res.end(JSON.stringify(false)) 
  }
}

//删除
app.post('/delete', (req)=> {
  //获取数据
   let id = req.body;
   str = Object.keys(id)
   //转换为对象
   da= JSON.parse(str)
   User.destroy({
    where:{
      createdAt: da
    }
  })
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
app.post('/reset',(res) => {
    dataq(res) 
})

//修改
app.post('/change',(res)=>{
  let str = res.body
  da1 = Object.keys(str)
  da= JSON.parse(da1)
  console.log(da)
  User.update({
    name: da.name,
    desc: da.desc,
    url: da.url,
    source: da.source,
  },{
    where:{
      createdAt: da.key
    }
  }).then(updata=>{
    str = JSON.stringify(updata)
    res.send(str)
  });


})

app.listen(8080,function(){
    console.log('http://localhost:8080');
})
