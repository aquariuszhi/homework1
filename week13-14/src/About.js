import React from 'react';
import { hot } from 'react-hot-loader/root';

class About extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		}
	}
	
	handleClick = (e) => {
		e.preventDefault()
		this.setState({
			tab: e.target.name
		})
	}
	
	render(){
		return (
			<div style = {{
				marginTop: '20px'
			}}>
				運用React-Redux+CodeIgniter實作留言板
			</div>
		)
	}
}

export default hot(About);