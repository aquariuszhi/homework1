import { createStore, applyMiddleware } from 'redux'
import reducers from './reducer'
import promise from 'redux-promise-middleware' //引入middleware處理API
import logger from 'redux-logger' //可以顯示redux的patch和state，可用來debug

//redux數據存放的地方
const store = createStore(reducers, applyMiddleware(  //logger專用語法
	promise,
	logger
))

export default store