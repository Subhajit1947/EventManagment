import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Store} from './feature/store.js'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
  //for redux store is a prop that accessible all the child
  <Provider store={Store}>
    <App/>
  </Provider>
)
