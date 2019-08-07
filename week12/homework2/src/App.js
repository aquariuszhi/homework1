import React from 'react';
import { hot } from 'react-hot-loader/root';
import Home from './Home'
import About from './About'

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
			<div>
				<nav className="navbar navbar-light bg-light">
				  <a className="navbar-brand" href="#">Blog</a>
				  <div className="navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav nav-box">
						//設定當前頁tab的效果
					  <li className={"nav-item" + (this.state.tab === 'home' ? ' active' : '')}>
						<a className="nav-link" name = 'home' onClick = {this.handleClick} >Home<span className="sr-only">(current)</span></a>
					  </li>
					  <li className={"nav-item" + (this.state.tab === 'about' ? ' active' : '')}>
						<a className="nav-link" name = 'about' onClick = {this.handleClick} >About<span className="sr-only">(current)</span></a>
					  </li>
					  <li className="nav-item dropdown nav-rightside">
						<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						  會員
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
						  <a className="dropdown-item" href="#">登入</a>
						  <a className="dropdown-item" href="#">註冊</a>
						  <a className="dropdown-item" href="#">登出</a>
						</div>
					  </li>
					</ul>
				  </div>
				</nav>
				<div className = 'container'>
					{this.state.tab === 'home' && <Home />}
					{this.state.tab === 'about' && <About />}
				</div>
			</div>
		)
	}
}

export default hot(App);