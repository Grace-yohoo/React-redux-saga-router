import {  Input ,Button} from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import {observer, inject} from 'mobx-react'


const { Search } = Input;

@inject('store')
@observer
class SearchSet extends React.Component {

  render(){
     const{home:{handleSearchIn,handleChange,searchvalue,handleResetson}} = this.props.store;
    return(
      <div>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={value => handleSearchIn(value)}
        onChange={e => handleChange(e)}
        style={{margin:20 ,width:"30%" }}
        value={searchvalue}
      />
      <Button onClick={handleResetson} style={{ width:90}} style={{margin:20}}>
       Reset
      </Button>
    </div>
    )
  }
 
}

export default SearchSet