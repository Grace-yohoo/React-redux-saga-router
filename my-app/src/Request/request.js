
const request = {

    //查询
    mysqlquery(datafun){
      fetch('http://localhost:8080', {
        method: 'GET', 
        body: JSON.stringify(), 
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(res => res.json())
      // .then(res => console.log(Update))
      .then(resdata => datafun(resdata))
     },

    
    //增加
    mysqladd(data,datafun){
        fetch('http://localhost:8080/add', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded'
            })

          })
          .then((res) => {
            this.mysqlquery(datafun);
          })

    },

    //删除
    mysqldelete(id,datafun){
      fetch('http://localhost:8080/delete', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(id), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(this.mysqlquery(datafun))
    },

    //搜索
    mysqlsearch(name,datafun){
      fetch('http://localhost:8080/search', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(name), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(res => res.json())
      .then(resdata => datafun(resdata))
    },
   //重置
    mysqlreset(datafun){
      fetch('http://localhost:8080', {
        method: 'GET', 
        body: JSON.stringify(), 
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
      .then(this.mysqlquery(datafun))
     },
   //修改
   mysqlchange(row,datafun){
    fetch('http://localhost:8080/change', {
      method: 'POST', 
      body: JSON.stringify(row), 
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
    .then(this.mysqlquery(datafun))     
   }
}

export default request;