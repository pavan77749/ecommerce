import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import Policy from "./pages/Policy";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Layout/Routes/Private";
import  ForgotPassword  from "./pages/auth/ForgotPassword";
import AdminRoute from "./components/Layout/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/dashboard" element={<PrivateRoute/>}>
       <Route path="user" element={<Dashboard/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
       <Route path="admin" element={<AdminDashboard/>}/>
      </Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/policy" element={<Policy/>}></Route>
      <Route path="/*" element={<Pagenotfound/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}></Route>

    </Routes>
    </>
  )
}

export default App;