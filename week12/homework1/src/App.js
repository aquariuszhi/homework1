import React from 'react';
import { hot } from 'react-hot-loader/root';
import Todo from './Todo';  //引入component

//輸出App這個component
class App extends React.Component{
	constructor(props){  //props為其他component的狀態或屬性或函式
		super(props)  //將props請求交由React.Component處理
		this.state = {  //設置初始狀態
			items: [],
			value: ''
		}
	this.id = 1
	}
	
	//須更改狀態才能顯示使用者輸入的內容
	handleChange = (e) => {  //須使用箭頭函式以產生物件導向函式
		this.setState({
			value: e.target.value
		})
	}
	
	//按下enter鍵以後更改狀態並重新渲染
	handleEnter = (e) => {
		if(e.key === "Enter"){
			this.setState({
				items: [...this.state.items, {
					text: this.state.value,
					id: this.id++,
					status: 'Done'
				}],
				value: ''
			})
		}
	}
	
	
	//實做標示已完成功能
	finishItem = (todo) => {
		const num = todo.id-1
		const done = $('.liAdjust')[num]
		const btn = $('.btn-mark')[num]
		//根據按鈕的className變換class
		$(done).hasClass('finished') ? $(done).removeClass('finished') && $(btn).removeClass('btn-primary') && $(btn).addClass('btn-success') : $(done).addClass('finished') && $(btn).removeClass('btn-success') && $(btn).addClass('btn-primary')
		//根據按鈕的className變換狀態
		if($(done).hasClass('finished')){
			const oldItems = this.state.items
			const numText = this.state.items[num].text
			const numId = this.state.items[num].id
			oldItems.splice(num, 1, {text: numText, id: numId, status: 'Undone'})
			const newItems = oldItems
			this.setState({
				items: newItems
			})
		} else {
			const oldItems = this.state.items
			const numText = this.state.items[num].text
			const numId = this.state.items[num].id
			oldItems.splice(num, 1, {text: numText, id: numId, status: 'Done'})
			const newItems = oldItems
			this.setState({	
				items: newItems
			})
		}
		
	}
	//實做刪除功能
	removeItem = (todo) => {
		this.setState({
			items: this.state.items.filter(item => item.id !== todo.id)
		})
	}
	//渲染
	render(){
		return (
			<div className = "adjust" >
				<div className = "input-group flex-nowrap">
					<div>
						<span className = "input-group-text input-group-adjust" id="addon-wrapping">@</span>
					</div>
					<input type="text" value = {this.state.value} onChange = {this.handleChange} onKeyDown = {this.handleEnter} className = "form-control" placeholder="Insert Todo" aria-label="Username" aria-describedby="addon-wrapping" />
				</div>
				<ul className = "list-group ulAdjust">
					//<Todo>為令一個component，使用map時須加入唯一的key
					{this.state.items.map(todo => <Todo key = {todo.id} todo = {todo} removeItem = {this.removeItem} finishItem = {this.finishItem} status = {todo.status}  />)}
				</ul>
			</div>
		)
	}
}

export default hot(App);