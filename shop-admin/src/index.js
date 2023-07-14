import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import reducer from "./store/reducers";
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import createSagaMiddleware from 'redux-saga';
import sagas from "./store/sagas";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import './assets/styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'


const saga = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(saga, thunk));

saga.run(sagas);

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement(document.body);
root.render(

    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
