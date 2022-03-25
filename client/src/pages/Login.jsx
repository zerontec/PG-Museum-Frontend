import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from '../images/Logo.svg'
import Swal from "sweetalert2";
import './styles/Login.css'
const login = process.env.REACT_APP_URL;


const Login = () => {

    const { register, handleSubmit, resetField, formState: { errors } } = useForm();
	let navigate = useNavigate();
	const routeRegister = () => { navigate('/register')}
    
    const handleLogin = (data) => {

        fetch(`${login}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.message) {
                Swal.fire('Usuario no existente')
            } else {
                localStorage.setItem('session', JSON.stringify([result]))
                resetField('username')
                resetField('password')
                window.location.href = '/'
            }
        })
    }

    const handleLoginGoogle = async (googleData) => {
        const res = await fetch(`${login}/auth/signup/google`, {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                'content-type': 'application/json',
            },
        })
        const data = await res.json();
        localStorage.setItem('session', JSON.stringify([data]));
        window.location.href = '/'
    }

    return (
        <div className='login'>
            <div className='login--container'>
                <Link to='/' className="close--button">
                    <GrClose/>
                </Link>
                <div className='logo--container'>
                    <img src={logo} alt="logo" className='logo--image' />
                    <div className='logo--text'>Museum</div>
                </div>
                <h1 className='login--title'>Iniciar sesión</h1>
                <form onSubmit={handleSubmit(handleLogin)} className='login--form'>
                    <div className='form--input'>
                        <input
                            className={errors.username ? 'login-input-error' : 'login-input'}
                            type="text"
                            placeholder='Usuario'
                            {...register("username", { required: 'Campo obligatorio'})}
                        />
                        {errors.username && <p className='form-warning'>{errors.username.message}</p>}

                        <input
                            className={errors.password ? 'login-input-error' : 'login-input'}
                            type="password"
                            placeholder='Contraseña'
                            {...register("password", { required: 'Campo obligatorio'})}
                        />
                        {errors.password && <p className='form-warning'>{errors.password.message}</p>}
                    </div>

                    {/* TODO: MODAL EN ESTA PARTE */}
                    
                    <Link to="/resetPasswordPost" className='text-reset-content'>
                        <span className='text-reset'>Olvidaste tu contraseña?</span>
                    </Link>
                    <button type="submit" className='submit--btn-fill active'>Iniciar sesión</button>
                    <button onClick={routeRegister} className='submit--btn-border active'>Registrarse</button>
                    <GoogleLogin
                        clientId="359276887661-52enkr7gjhn5m9hm3e3t45jumqjnfnvj.apps.googleusercontent.com"
                        buttonText="Iniciar sesión con Google"
                        onSuccess={handleLoginGoogle}
                        cookiePolicy={'single_host_origin'}
                        className='login-google--submit'
                    />
                </form> 

            </div>
        </div>
    )


}

export default Login;
