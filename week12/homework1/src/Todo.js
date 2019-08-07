import React from 'react';
import { hot } from 'react-hot-loader/root';

class Todo extends React.Component{
	constructor(props){
		super(props)  
		this.state = {
		}
	}
	
	handleFinished = () => {
		const {status, todo, finishItem} = this.props //引入其他component的狀態或函式或屬性
		finishItem(todo)
	}
	
	handleDelete = () => {
		const {todo, removeItem} = this.props
		removeItem(todo)
	}

	
	render(){
		const {todo} = this.props
		return (
			<li className = "list-group-item liAdjust">
				{todo.text}
				<div className = "btngroupAdjust">
					<button type="button" onClick = {this.handleFinished} className = "btn btn-success btnAdust btn-mark">{todo.status}</button>
					<button type="button" onClick = {this.handleDelete} className = "btn btn-danger btnAdust">Delete</button>
				</div>
			</li>
		)
	}
}

export default hot(Todo);