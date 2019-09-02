import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Link, withRouter } from 'react-router-dom'

class Register extends React.Component{
	constructor(props){
		super(props)
	}
	
	
	render(){
		const {location} = this.props
		const {pathname} = location
		return (
			<div>
			</div>
		)
	}
}

export default hot(withRouter(Register));