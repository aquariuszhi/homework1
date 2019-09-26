import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Link, withRouter } from 'react-router-dom'

class Slider extends React.Component{
	
	render(){
		return (
			<div className= "slider_div">
				<div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img src="./src/P1000646.JPG" className="d-block w-100" alt="..."/>
						</div>
						<div className="carousel-item">
							<img src="./src/P1000653.JPG" className="d-block w-100" alt="..."/>
						</div>
						<div className="carousel-item">
							<img src="./src/P1020636.JPG" className="d-block w-100" alt="..."/>
						</div>
						<div className="carousel-item">
							<img src="./src/P1020671.JPG" className="d-block w-100" alt="..."/>
						</div>
						<div className="carousel-item">
							<img src="./src/P1020693.JPG" className="d-block w-100" alt="..."/>
						</div>
					</div>
					<a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
			</div>
		)
	}
}

export default hot(withRouter(Slider));