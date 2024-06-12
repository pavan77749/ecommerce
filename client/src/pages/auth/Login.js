import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate , useLocation } from 'react-router-dom'
import '../../styles/AuthStyles.css'
import { useAuth } from '../../context/auth'


const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("") 
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate()
    const location = useLocation()

    //form function
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post("/api/v1/auth/login",{email,password})
            if(res.data.success){
                toast.success(res.data && res.data.message)
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token
                });
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state || "/")
            }
            else{
                toast.error(res.data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error('Something went Wrong')
        }
    }

  return (
    <Layout title="login - Ecommerce Shop">
        <div className="form-container" >
        <form onSubmit={handleSubmit}>
            <h1 style={{textAlign:"center"}}>Login Now</h1>
            
        <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control" id="exampleInputEmail1" placeholder='Enter your Email'  required/>    
        </div>
        <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="form-control" id="exampleInputEmail1"  placeholder='Enter your Password' required/>    
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <div className='mt-3'>
        <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forget Password ?</button>
        </div>
        </form>

        </div>
    </Layout>
  )
}

export default Login