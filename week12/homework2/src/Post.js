import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

class Post extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			post: {},
			postId: this.props.id
		}
	}
	
	componentDidMount(){
		axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
		.then(response => {
			this.setState({
				post: response.data
			})
		})
	}
	
	handleBefore = () => {
		const {turnBack} = this.props
		turnBack()
	}
	
	render(){
		const {post, postId} = this.state
		return (
				<div>
					<h3>{post.title}</h3>
					<div>userId: {post.userId}</div>
					<p>{post.body}</p>
					<button type="button" className="btn btn-secondary" onClick = {this.handleBefore}>上一頁</button>
				</div>
		)
	}
}

export default hot(Post);