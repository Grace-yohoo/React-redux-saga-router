import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'mobx-react';
import Store from './Store/index';
import * as mobx from 'mobx';


mobx.configure({
    enforceActions: "always"             // 不允许在动作之外进行状态修改
});

ReactDOM.render(
    <Provider store ={Store}>
        <App />
    </Provider>


, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
    }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
