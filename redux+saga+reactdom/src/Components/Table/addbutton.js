import { Button } from 'antd';
import React, {Component} from 'react';

const addbutton = function(props){
    //点击事件,跳转至Myinfo页面
    const aclick = ()=>{
      props.history.replace('/myinfo')
    }

  return(
    <div>
      <Button onClick = {aclick} style={{background:'#1890ff',color:'#fff',marginTop:"30px",marginBottom:"10px"}}>创建</Button>
    </div>
  )

}

export default addbutton
