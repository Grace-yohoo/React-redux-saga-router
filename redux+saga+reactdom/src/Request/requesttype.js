
export const localhost = 'http://localhost:8080/'
//初始fetch方法
export const fetchb =  function* (url){

  const res = yield fetch(url)

  const data = yield res.json()

  return data
}

//删除,添加,修改
export const fetchc =  function* (url,data){
  const res = yield fetch(url,{
      method: 'POST', 
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
  })
  const data1 = yield res.json()

  return data1
}

//添加key
export const addkey = function(response) {

  for (let k in response){
  response[k].key = response[k].id
  }
  return response

}
