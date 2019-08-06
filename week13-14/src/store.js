import { createStore, applyMiddleware } from 'redux'
import reducers from './reducer'
import promise from 'redux-promise-middleware' //引入middleware處理API
import logger from 'redux-logger' //可以顯示redux的patch和state，可用來debug


const store = createStore(reducers, applyMiddleware(  //logger專用語法
	promise,
	logger
))

export default store