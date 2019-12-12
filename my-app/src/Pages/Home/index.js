import React from 'react';
import { observer, inject } from "mobx-react"

@inject('store')
@observer
class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
          name:'8988'
        }

    }
 
    click = () => {
        this.setState({
            name: 'li_si',
            age: 10,
        })
    }
    render(){
        const {store} = this.props;
        const {home:{name,age,click,price}} = store;
        // const {name,age} = this.state


        return(
            <div>
                <h1>{name}</h1>
                <h1>{age}</h1>
                <h1>{price}</h1>


                <button onClick ={()=>click()}>点击</button>
            </div>
        )
    }
}

export default Home

