//请求方法
export const fetcha = (url,data) => {
    fetch(url,{
      method: 'POST', 
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
    .then(res => res.json())
  }