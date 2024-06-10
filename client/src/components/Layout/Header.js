import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import toast from "react-hot-toast"

function Header() {
  const [auth,setAuth] = useAuth()
  const handleLogout = () =>{
    setAuth({
      ...auth, user:null, token:""
    })
    localStorage.removeItem('auth')
    toast.success("Logout successfully")
  }
  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
<Link className="navbar-brand" to='/' >  <img src="https://cdn-icons-png.freepik.com/256/13429/13429013.png?ga=GA1.1.2135091468.1717868355&semt=ais_hybrid" alt="logo" height="50px" width="auto"/> Ecommerce Shop</Link>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link "  to='/'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link "  to='/category'>Category</NavLink>
        </li>
        {
          !auth.user ? (
            <>  <li className="nav-item">
            <NavLink className="nav-link" to='/register'>Register</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/login'>Login</NavLink>
          </li>
            </>) : (
              <>
               
        <li className="nav-item">
          <NavLink className="nav-link" onClick={handleLogout} to='/login'>Logout</NavLink>
        </li>
              </>
            )
        }
        <li className="nav-item">
          <NavLink className="nav-link" to='/cart'>Cart(0)</NavLink>
        </li>
      

      </ul>
     
    </div>
  </div>
</nav>

    </>
  )
}

export default Header