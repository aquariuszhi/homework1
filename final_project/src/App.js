import React from 'react';
import { hot } from 'react-hot-loader/root';

import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Search from './Search'
import Mypage from './Mypage'
import Category from './Category'
import FollowWriting from './FollowWriting'
import FollowUser from './FollowUser'

class App extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
		return (
			<Router>
					<Header />
					<div className = 'container'>
						<Route exact path='/' component = {Home} />
						<Route path='/home/:page' component = {Home} />
						<Route path='/mypage/:account/:page' component = {Mypage} />
						<Route path='/category/:category/:page' component = {Category} />
						<Route path='/followWriting/:page' component = {FollowWriting} />
						<Route path='/followUser/' component = {FollowUser} />
						<Route path='/search' component = {Search} />
					</div>
			</Router>
		)
	}
}

export default hot(App);