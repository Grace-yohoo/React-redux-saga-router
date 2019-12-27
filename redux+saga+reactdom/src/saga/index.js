import { put, takeEvery, call} from 'redux-saga/effects';
import {model} from '../Request/request'
import {FETCH, DELETE,CREATE,SEARCH,SAVE} from '../ActionTypes/tablelist'

//put 与actiontype相同

//Mysql 请求数据 (初始渲染  重置)
function* fetchUser() {
  const data = yield call(model.fetch1)

  yield put({type: FETCH, payload:data});   
}

//MYSQL 删除
function* mysqlDelFectch(val){

  const fedata = yield val.data2

  const data =  yield val.data

  const data2 = yield call(model.change,fedata,data)

  yield put({type: DELETE, payload:data2});
}

//MYSQL 添加
function* mysqlAddFectch(val){

  const fedata = yield val.data2

  const data =  yield val.data

  const data2 = yield call(model.change,fedata,data)

  yield put ({type: CREATE ,payload:data2})
}

//MYSQL 搜索
function* mysqlSearchFectch(val){

  const data = yield call(model.datamql3,val)

  yield put ({type:SEARCH ,payload:data})

}  

//MYSQL 修改
function* mysqlSaveFectch(val){

  const fedata = val.data2

  const data = val.data

  const data2 = yield call(model.change,fedata,data)

  yield put({type:SAVE,payload:data2})
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

