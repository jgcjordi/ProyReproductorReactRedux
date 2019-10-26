import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Dependencias de Redux para React
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Importamos todos los Reducers de index.js
import RootReducers from './reducers';

//Creamos el store a partir de un conjunto de Reducers
const store = createStore(RootReducers, applyMiddleware(thunk));

ReactDOM.render(
    /* Provider SIEMPRE tiene el Atributo store */
    <Provider store={store}>
        <App /> 
    </Provider>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
