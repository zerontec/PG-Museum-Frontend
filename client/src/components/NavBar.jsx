import React from 'react'
import { MdHomeFilled, MdAddBox  } from 'react-icons/md'
import { RiShoppingBag3Fill, RiNotification4Fill, RiLogoutBoxRLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { Button, Avatar, } from 'antd';
import { NavLink } from 'react-router-dom';
import UserList from '../components/UserList'
import CustomLink from '../components/CustomLink'
import logo from '../images/Logo.svg'
import 'antd/dist/antd.min.css'
import './styles/NavBar.css'

const NavBar = () => {

  const user = JSON?.parse(localStorage.getItem("session"));

  const handleLogout = () => {
    localStorage.removeItem('session')
    window.location.href = '/'
  }

  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <div>
          {
            !localStorage.getItem('session') ?
            <img src={logo} alt="logo" className='navbar-logo' /> : 
            <div>
              <NavLink to='/profile'>
                {
  
                  user[0]?.image ? <Avatar src={user[0]?.image} size={38}/> : <Avatar icon={<CgProfile />} size={38} style={{marginBottom: '4rem'}}/>
                }
              </NavLink> 
            </div>
          }
          <div className='navigations'>
            <CustomLink to='/'><MdHomeFilled /></CustomLink>
            {
              user && user[0]?.roles.includes('ROLE_ADMIN') ? null : <CustomLink to='/store'><RiShoppingBag3Fill /></CustomLink> 
            }
            {/* IMPLEMENTACIONES */}
            {/* NOTIFICACIONES
            FAVORITOS
            IDIOMA
            TEMAS OSCURO */}
            {
              user && user[0]?.roles.includes('ROLE_ADMIN') ? 
              <>
                <Button type="link" icon={<MdAddBox style={{ fontSize: '24px' }} />} danger />
                <UserList/>
              </> : null
            }
          </div>
        </div>

        <div className='nav-logout'>
          {
            localStorage.getItem('session') ?
              <Button onClick={handleLogout} icon={<RiLogoutBoxRLine style={{ fontSize: '24px', color: 'rgb(80, 80, 80)'}} />} type="link" /> : null
          }
        </div>
      </div>
    </div>
  );
}

export default NavBar;

