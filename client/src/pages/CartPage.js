import React from "react";
import Layout from "./../components/Layout/Layout.js";
import { useCart } from "../context/cart.js";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

// total price
  const totalPrice = () => {
    try {
        let total=0
        cart?.map((item) => {total = total + item.price})
        return total
    } catch (error) {
        console.log(error)  
    }

  }

  //delete item
  const removeCartController = (pid) => {
    try {
        let myCart = [...cart]
        let index = myCart.findIndex((item) => item._id === pid)
        myCart.splice(index,1)
        setCart(myCart)
        localStorage.setItem('cart',JSON.stringify(myCart))
    } catch (error) {
        console.log(error)
        
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length 
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to Checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row flex-row card mb-2 mt-2">
                <div className="col-md-4" >
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ maxWidth: '200px', height: 'auto' }}
                  />
                </div>
                <div className="col-md-8 mt-2 ">
                    <h6>{p.name}</h6>
                    <p>{p.description.substring(0,40)}...</p>
                    <h6 style={{color:"green"}}>Price : ₹ {p.price}</h6>
                   
                    <button className="btn btn-danger mt-3 " onClick={()=> removeCartController(p._id)}>Remove</button>
                  
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>CheckOut || Payment</h2>
            <p>Total | Checkout | Payment</p>
            <hr/>
            <h4>Total : ₹ {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button className="btn btn-outline-warning" onClick={()=> navigate('/dashboard/profile')}>Update Address</button>
              </div>
              </>
            ):(
              <div className="mb-3">
                {auth?.token ? (
                 <button className="btn btn-outline-warning" onClick={()=> navigate('/dashboard/profile',{
                  state:'/cart'
                 })}>Update Address</button>
              
                ):(
                  <button className="btn btn-outline-warning" onClick={()=> navigate('/login',{ state:'/cart'})} >Please Login to Checkout</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
