import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { render } from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose  } from 'redux';
import store from './store';
import { changeMeatType, changeDoneness } from './actions/index';
import { connect } from "react-redux";

ReactDOM.render( <Provider store={store}><App /></Provider>, 
    document.getElementById('root'));
window.store = store;
window.changeMeatType = changeMeatType;
window.changeDoneness = changeDoneness;
registerServiceWorker();
