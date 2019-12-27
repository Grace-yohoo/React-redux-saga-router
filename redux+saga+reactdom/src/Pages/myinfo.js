import React, {Component} from 'react';
import { Input ,Button } from 'antd';
import {connect} from 'react-redux';

//映射状态
const mapStateToProps = (state) => {
    return {
      tablelistReducer : state.tablelistReducer
    }
}

@connect(mapStateToProps)
class MyInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'default',
            desc:'hello',
            source:'hello',
            url:'https://www.baidu.com/'
        }
        this.setName = this.setName.bind(this)
        this.setDesc = this.setDesc.bind(this)
        this.setUrl = this.setUrl.bind(this)
        this.setSource = this.setSource.bind(this)
        this.myclick = this.myclick.bind(this)
        this.myclick2 = this.myclick2.bind(this)



    }
    
    setName= (value) => {
        this.setState({name:value})
    }
    setDesc= (value) => {
        this.setState({desc:value})
    }
    setUrl= (value) => {
        this.setState({url:value})
    }
    setSource= (value) => {
        this.setState({source:value})
    }
    myclick=()=>{
        this.props.history.replace('/')

        const {
            name,
            desc,
            url,
            source
        } = this.state

        const data = {
            name, 
            desc,
            url,
            source
        }
        this.props.dispatch({type:'add',data})
    }
    myclick2=()=>{
        this.props.history.replace('/')
    }

    render(){
        return(
            <div>
                <Input addonBefore="名称:" placeholder="default" style={{width:"30%",marginTop:"20px", marginLeft:"35%"}}  onChange={(e) => {this.setName(e.target.value)}}/>
                <br/>
                <Input addonBefore="描述:" placeholder="hello" style={{width:"30%",marginTop:"10px", marginLeft:"35%"}}  onChange={(e) => {this.setDesc(e.target.value)}}/>
                <br/>
                <Input addonBefore="网址:" placeholder="http://www.baidu.com" style={{width:"30%",marginTop:"10px", marginLeft:"35%"}}  onChange={(e) => {this.setUrl(e.target.value)}}/>
                <br/>
                <Input addonBefore="类型:" placeholder="hello" style={{width:"30%",marginTop:"10px", marginLeft:"35%"}}  onChange={(e) => {this.setSource(e.target.value)}}/>
                <br/>
                <Button onClick={this.myclick}  style={{marginTop:"20px", marginLeft:"10px",background:'#1890ff',color:'#fff',marginLeft:"45%"}}>提交</Button>
                <Button onClick={this.myclick2}  style={{marginTop:"20px", marginLeft:"5px"}}>取消</Button>
                
            </div>
        )
    }
}

export default MyInfo