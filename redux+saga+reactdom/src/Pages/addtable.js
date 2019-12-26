import React, {Component,useState} from 'react';
import { Input ,Button } from 'antd';

//表单页面
export default function MyInfo(props) {
    const [name, setName] = useState('default');
    const [desc, setDesc] = useState('hello');
    const [url, setUrl] = useState('http://www.baidu.com');
    const [source, setSource] = useState('hello');
  
  
    const myclick = () => {
      const data = {name,desc,url,source}
  
       console.log(data)
       fetch('http://localhost:8080/add', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                  'Content-Type': 'application/x-www-form-urlencoded'
                })
    
      })
    
       props.history.push({
        pathname:'/',
         state: {
           name,
           desc,
           url,
           source
         }
       })  
    }
    return (
      <>
      <div>
        <Input addonBefore="名称:" placeholder="default" style={{width:"30%",marginTop:"20px", marginLeft:"30%"}}  onChange={(e) => {setName(e.target.value)}}/>
        <br/>
        <Input addonBefore="描述:" placeholder="hello" style={{width:"30%",marginTop:"10px", marginLeft:"30%"}}  onChange={(e) => {setDesc(e.target.value)}}/>
        <br/>
        <Input addonBefore="网址:" placeholder="http://www.baidu.com" style={{width:"30%",marginTop:"10px", marginLeft:"30%"}}  onChange={(e) => {setUrl(e.target.value)}}/>
        <br/>
        <Input addonBefore="类型:" placeholder="hello" style={{width:"30%",marginTop:"10px", marginLeft:"30%"}}  onChange={(e) => {setSource(e.target.value)}}/>
        <br/>
        <Button onClick={myclick}  style={{marginTop:"20px", marginLeft:"10px",background:'#1890ff',color:'#fff',marginLeft:"30%"}}>提交</Button>
  
      </div>
      </>
    );
  };
  


  