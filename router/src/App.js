import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import Slider from "react-slick";
import PikaQiu from './1.jpg';

const activeStyle = {
  background: "#000",
  textDecoration: "none",
  color: "#fff"
};

function App() {
  return (
    <div>
      <div>
          <NavLink to="/tiancat" activeStyle={activeStyle}>
              天猫
          </NavLink>

          <span>&nbsp;&nbsp;&nbsp;</span>
            <NavLink to="/jucheap" activeStyle={activeStyle}>
                聚划算
            </NavLink>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <NavLink to="/tiansupermarket" activeStyle={activeStyle}>
                天猫超市
            </NavLink>
      </div>

      <Switch>
        {/* <Redirect from="/" to="/tiancat" /> */}
       <Route exact path="/tiancat" component={TianCat} />

          <Route path="/tiancat/test">
              <div>
                  test
              </div>
          </Route>

          <Route path="/jucheap">
            <JuCheap />
          </Route>

          <Route path="/tiansupermarket">
            <TianSupermarket />
          </Route>

          <Route path="/getid/:id" component={GetId} />

          <Route path="/myinfo" component={MyInfo} />

          <Route path="/slider" component={SimpleSlider} />
    
          
          <Route>
            <div>
                Router Not Found~ 404
              </div>
          </Route>
      </Switch>

    
    </div>
  );
}

const GetId  = function(props) {


  console.log('props', props);

  return (
    <div>
        id is {props.match.params.id};
      </div>
  );
}

const MyInfo = function(props) {

  console.log('myinfo ==', props);

  const {state} = props.location;

  if (!state) {
    props.history.replace('/tiancat');
    // props.history.goBack();
  }

  const {
    username,
    age
  } = state || {};

  return (
      <div>
          名字: {username}
          年龄: {age}
      </div>
  );
}


const TianCat = function(props) {

  const [username, setUsername] = useState('');
  const [age, setUserAge] = useState(0);
  console.log(props);

  const click = () => {
    props.history.push({
      pathname: '/myinfo',
      state: {
        username,
        age,
      }
    });
  };

  return (
    <>
      <div>欢迎来到天猫！</div>

    <div>
      <input placeholder="用户名" onChange={(e) => {setUsername(e.target.value)}} />
      <input placeholder="年龄" onChange={(e) => {setUserAge(e.target.value)}} />
      <button onClick={click} >提交</button>
    </div>
    </>
  );
};


const JuCheap = function() {
  return (
    <div>欢迎来到聚划算！</div>
  );
};


const TianSupermarket = function() {
  return (
    <div>欢迎来到天猫超市！</div>
  );
};

class SimpleSlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      arrows: false,
      accessibility: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <img src={PikaQiu} />
          </div>
          <div>
          <img src={PikaQiu} />

          </div>
          <div>
          <img src={PikaQiu} />

          </div>
          <div>
          <img src={PikaQiu} />

          </div>
          <div>
          <img src={PikaQiu} />

          </div>
          <div>
          <img src={PikaQiu} />

          </div>
        </Slider>
      </div>
    );
  }
}


export default App;


