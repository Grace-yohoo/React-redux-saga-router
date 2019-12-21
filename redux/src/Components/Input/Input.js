import React from 'react';
import { Input,Button } from 'antd';

const { Search } = Input;

class Myinput extends React.Component{
    constructor(){
        super();
        this.state =({
            value: '',
        })
        this.onSearch = this.onSearch.bind(this);
        this.handResets = this.handResets.bind(this);
        this.handChange = this.handChange.bind(this);
    }
    onSearch(value ){
        this.props.handSearch(value);
    }
    handResets(){
        this.props.handReset();
        this.setState({
            value: '',
        });
    }
    handChange(e){
        this.setState({
            value: e.target.value,
        });
    }
    


    render(){
        return <div>
        <Search
          placeholder="input search text"
          enterButton="搜索"
          size="large"
          onSearch={value => this.onSearch(value) }
          value = {this.state.value}
          onChange={e => this.handChange(e)}
          style={{width:'500px'}}
        />
        <Button onClick={this.handResets} size='large' style={{background:'#1890ff',color:'#fff'}}>重置</Button>
      </div>
    }
}
export default Myinput;