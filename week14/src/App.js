import React from 'react';
import { hot } from 'react-hot-loader/root';
import Todo from './Todo';

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			items: [],
			value: ''
		}
	this.id = 1
	}
	
	handleChange = (e) => {
		this.setState({
			value: e.target.value
		})
	}
	
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
	
	finishItem = (todo) => {
		const num = todo.id-1
		const done = $('.liAdjust')[num]
		const btn = $('.btn-mark')[num]
		$(done).hasClass('finished') ? $(done).removeClass('finished') && $(btn).removeClass('btn-primary') && $(btn).addClass('btn-success') : $(done).addClass('finished') && $(btn).removeClass('btn-success') && $(btn).addClass('btn-primary')
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
	
	removeItem = (todo) => {
		this.setState({
			items: this.state.items.filter(item => item.id !== todo.id)
		})
	}
	
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
					{this.state.items.map(todo => <Todo key = {todo.id} todo = {todo} removeItem = {this.removeItem} finishItem = {this.finishItem} status = {todo.status}  />)}
				</ul>
			</div>
		)
	}
}

export default hot(App);