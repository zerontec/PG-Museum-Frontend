import React from 'react'
import './styles/Landing.css'
import landing from '../images/pexels-charlotte-may-5825359.jpg'
import { useNavigate } from "react-router-dom";

const Landing = () => {
	
	let navigate = useNavigate();
	const routeLogin = () => { navigate('/login') }
	const routeRegister = () => { navigate('/register')}

	return (
		<div className="landing">
			<div className='landing--container'>
				<p className='landing--slogan-size'>Encuentra interesantes y exclusivas obras de arte en Museum, llévalas contigo!!</p>
				{
					!localStorage.getItem('session') ?
						<div className='buttons--container'>
							<button className='login--button-border active' onClick={routeLogin}>Iniciar sesión</button>
							<button className='register--button-fill active' onClick={routeRegister}>Registrarse</button>
							
						</div> : null
				}
			</div>
			<div className='landing__image'>
				<img src={landing} width="50%" alt="#" className="landing--image-in"></img>
			</div>
		</div>
	);
}

export default Landing;