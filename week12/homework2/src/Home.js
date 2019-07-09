import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import Post from './Post'

class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			posts: [],
			postId: null
		}
	}

	componentDidMount(){
		axios.get('https://jsonplaceholder.typicode.com/posts')
		.then(response => {
			this.setState({
				posts: response.data
			})
		})
	}
	

	
	turnBack = () => {
		this.setState({
			postId: null
		})
	}
	
	render(){
		const {posts, postId} = this.state
		return (
			<div>
				<div style = {{
					marginTop: '20px'
				}}>
					<h2>Bolg Posts</h2>
					{postId && <Post id = {postId} turnBack = {this.turnBack} />}
					{
						!postId && <ul className = "list-group">
										{posts.map(post => {
											return (
												<li key = {post.id} className = "list-group-item" onClick = {() => {
													this.setState({
														postId: post.id
													})
												}} >{post.title}</li>
											)
										})}
									</ul>
					}
				</div>				
			</div>
		)
	}
}

export default hot(Home);