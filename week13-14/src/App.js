import React from 'react';
import { hot } from 'react-hot-loader/root';

//用來設定不同的url對應不同的conponent，HashRouter會在url加上＃，BrowserRouter須設定確切的路徑
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import PostComment from './PostComment'
import PostChildComment from './PostChildComment'
import Modify from './Modify'

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			tab: 'home'
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
			<Router>
					<Header />
					//透過Router設定不同的url對應不同的conponent
					<div className = 'container'>
						<Route exact path='/' component = {Home} />
						<Route path='/home/:page' component = {Home} />
						<Route path='/post/:id' component = {PostChildComment} />
						<Route path='/about' component = {About} />
						<Route path='/login' component = {Login} />
						<Route path='/register' component = {Register} />
						<Route path='/post_comment' component = {PostComment} />
						<Route path='/modify/:id' component = {Modify} />
					</div>
			</Router>
		)
	}
}

export default hot(App);