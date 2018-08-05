import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose  } from 'redux';
import store from './store';
import { changeMeatType, changeDoneness } from './actions/index';

ReactDOM.render(<App />, document.getElementById('root'));
window.store = store;
window.changeMeatType = changeMeatType;
window.changeDoneness = changeDoneness;
registerServiceWorker();
