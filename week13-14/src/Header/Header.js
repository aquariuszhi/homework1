import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component{
	constructor(props){
		super(props)
	}
	
	handleLogout = (e) => {
		e.preventDefault();
		this.props.logout()
	}
	
	componentDidMount(){
		this.props.checkLogin()
	}
	
	render(){
		const {location, loginData} = this.props
		const {pathname} = location
		return (
			<nav className="navbar navbar-light bg-light">
			  <a className="navbar-brand" href="#">留言板</a>
			  <div className="navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav nav-box">
				  <li className={"nav-item" + (pathname === '/' ? ' active' : '')}>
					<Link className="nav-link" name = 'home' to='/home/1' >Home<span className="sr-only">(current)</span></Link>
				  </li>
				  <li className={"nav-item" + (pathname === '/about' ? ' active' : '')}>
					<Link className="nav-link" name = 'about' to='/about' >About<span className="sr-only">(current)</span></Link>
				  </li>
				  <li className="nav-item dropdown nav-rightside">
					<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  {loginData ? loginData : '會員'}
					</a>
					<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
						{!loginData && (
							<div>
								<Link className="dropdown-item" name='login' to='/login'>登入</Link>
								<Link className="dropdown-item" name='register' to='/register'>註冊</Link>
							</div>
						)}
						{loginData && (
							<a className="dropdown-item" onClick={this.handleLogout} >登出</a>
						)}
					</div>
				  </li>
				</ul>
			  </div>
			</nav>
		)
	}
}

export default hot(withRouter(Header)); //withRouter使該component可以存取到其他props