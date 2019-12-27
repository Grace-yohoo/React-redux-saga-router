
import React,{Component,useState} from 'react';
import './App.css';
import Mytable from './Components/Table/index';
import CollectionsPage from './Pages/addinfo'
import {
  Route,
  Switch,
} from 'react-router-dom';

class App extends Component{
  render(){
    return(
      <div className="App">
        <Switch>
          <Route exact path='/' component = {Mytable} />   
          <Route exact path="/myinfo" component={CollectionsPage} />          
       </Switch> 
      </div>
    );
  }
}


 
export default App;