
import { put, takeEvery } from 'redux-saga/effects';
import { fetcha } from '../Request/request'





//put 与actiontype相同
//Mysql 请求数据 (初始渲染  重置)
function* fetchUser() {
       const res =  yield fetch('http://localhost:8080/')

       const response = yield res.json()
       for (let k in response){
        response[k].key = response[k].id
       }
      
       yield put({type: "fetch", payload:response});
    
}


//MYSQL 删除
function* mysqlDelFectch(key){
  const id = yield key.key
  console.log(id)
  yield fetcha('http://localhost:8080/delete',id)

  //重新请求数据
  const res =  yield fetch('http://localhost:8080/')

  const response = yield res.json()
  for (let k in response){
    response[k].key = response[k].id
   }

  yield put({type: "delete", payload:response});
}

//MYSQL 添加
function* mysqlAddFectch(val){
      const data = yield val.values
      
      yield fetcha('http://localhost:8080/add',data)

      //重新请求数据
      const res =  yield fetch('http://localhost:8080/')

      const response = yield res.json()
      for (let k in response){
        response[k].key = response[k].id
       }

      yield put ({type:'create' ,payload:response})

}

//MYSQL 搜索
function* mysqlSearchFectch(data){
      const name = yield data.value
      // const response = yield fetcha('http://localhost:8080/search',name)
      const res = yield fetch('http://localhost:8080/search', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(name), // data can be `string` or {object}!
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
      const response = yield res.json()
      for (let k in response){
        response[k].key = response[k].id
       }

      yield put ({type:'create' ,payload:response})

}

//MYSQL 修改
function* mysqlSaveFectch(val){
  const data = yield val.row
  yield console.log(data)
  yield fetcha('http://localhost:8080/change',data)
  
  //重新请求数据
  const res =  yield fetch('http://localhost:8080/')

  const response = yield res.json()
  for (let k in response){
    response[k].key = response[k].id
   }

  yield put({type:'save',payload:response})

}


//监听与组件type相同
 function* mySaga() {
   yield takeEvery("feh", fetchUser);
   yield takeEvery('del', mysqlDelFectch)
   yield takeEvery('add', mysqlAddFectch)
   yield takeEvery('sear', mysqlSearchFectch)
   yield takeEvery('sav', mysqlSaveFectch)


 }

 
 export default mySaga;

