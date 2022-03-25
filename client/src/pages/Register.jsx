import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { GrClose } from "react-icons/gr";
import { useForm } from "react-hook-form";
import logo from '../images/Logo.svg'
import './styles/Register.css'
import axios from 'axios';

const Register = () => {

    let navigate = useNavigate();
    const { register, handleSubmit, resetField, formState: { errors }, watch } = useForm();
    const url = process.env.REACT_APP_URL;
	const routeLogin = () => { navigate('/login')}
    const [user, setUser] = useState({
        image: '',
    });

    function onSubmit(dataUser) {
        dataUser.roles = ['user']
        dataUser.image = user.image
        axios.post(`${url}/auth/signup`, dataUser)
            .catch((error) => {
                //* Falta validación específica del error o mensaje de cual fue el error
                console.log(error)
            })
        resetField('name')
        resetField('username')
        resetField('email')
        resetField('password')
        resetField('passwordbis')
        setUser({image: ''})
        navigate('/login');
    }

    function processImage(e) {
        const imageFile = e.target.files[0];
        const imageUrl = new FileReader();
        imageUrl?.readAsDataURL(imageFile)
        imageUrl.onload = (e) => {
            setUser({
                ...user,
                image: e.target.result
            })
        };
    };

return (
    <div className='signup'>
        <div className='signup--container'>
            <Link to='/' className="close--button">
                <GrClose/>
            </Link>
            <div className='logo--container'>
                <img src={logo} alt="logo" className='logo--image' />
                <div className='logo--text'>Museum</div>
            </div>

            <h1 className='signup--title'>Registrarse</h1>

            <form onSubmit={handleSubmit(onSubmit)} className='register--form'>
                <div className='firstRow'>
                    <div className='container--input'>
                        <input 
                            type="text"
                            className={errors.name? 'register-input-error':'register--input'} 
                            placeholder='Nombre'
                            {...register("name", { required: 'Campo obligatorio'})}
                        />
                        {errors.name && <p className='form-warning'>{errors.name.message}</p>}
                    </div>

                    <div className="container--input">
                        <input 
                            type="text"
                            className={errors.username? 'register-input-error':'register--input'} 
                            placeholder='Usuario (tu perfil)'
                            {...register("username", { required: 'Campo obligatorio'})}
                        />
                        {errors.username && <p className='form-warning'>{errors.username.message}</p>}
                    </div>
                </div>
                <div className='secondRow'>
                    <div className="container--input-width">       
                        <input 
                            type="text"
                            className={errors.email? 'register-input-error':'register--input'}  
                            placeholder='Correo'
                            {...register("email", {required: 'Campo obligatorio', pattern: { 
                                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
                                    message: 'Correo invalidó'
                                }}
                            )}
                        />
                        {errors.email && <p className='form-warning'>{errors.email.message}</p>}
                    </div>
                </div>
                <div className='threeRow'>
                    <div className="container--input">
                        <input 
                            type="password"
                            className={errors.password? 'register-input-error':'register--input'}  
                            placeholder='Contraseña'
                            {...register("password", { required: 'Campo obligatorio'}
                            )}
                        />
                        {errors.password && <p className='form-warning'>{errors.password.message}</p>}
                    </div>
                    <div className="container--input">
                        <input 
                            type="password"
                            className={errors.passwordbis? 'register-input-error':'register--input'}  
                            placeholder='Repetir contraseña'
                            {...register("passwordbis", { required: 'Campo obligatorio', validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Contraseñas no coinciden";
                                }
                                }}
                            )}
                        />
                        {errors.passwordbis && <p className='form-warning'>{errors.passwordbis.message}</p>} 
                    </div>
                </div>
                <input
                    onChange={(e) => processImage(e)}
                    name="image" 
                    type="file" 
                    className='form-control form-control-sm'
                    accept="image/*"
                    placeholder="Select image"
                />

                <button className="submit--btn-fill active" type='submit'>Registrarse</button>
                <button className="submit--btn-border active"  onClick={routeLogin}>Iniciar sesión</button>
            </form>
        </div>
    </div>
    );
}

export default Register;