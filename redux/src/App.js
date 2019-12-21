import React,{Component} from 'react';
import './App.css';
import Mytable from './Components/Table/index'
// import Mytable from './Components/c/c'




class App extends Component{
  render(){
    return(
      <div className="App">
        <Mytable />
      </div>
    );
  }
}

export default App;