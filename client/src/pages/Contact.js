import React from 'react'
import Layout from '../components/Layout/Layout'
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";

function Contact() {
  return (
    <Layout title={"Contact Us - Ecommerce Shop"}>
        <div className="row contactus">
          <div className="col-md-6">
            <img src="/images/contactus.jpeg" alt="contact us" style={{width:"100%"}} />
          </div>
          <div className="col-md-4">
            <h1 className='p-2 text-white text-center ' style={{backgroundColor:"#ff5f00"}} >CONTACT US</h1>
            <p className='text-justify mt-2'>Any query and info about product feel free to call anytime we 24x7 avaialible</p>
            <p className='mt-3'>
            <MdEmail /> :www.help@ecommerceshop.com
            </p>
            <p className='mt-3'>
            <FaPhone /> :045-784566-9878
            </p>
            <p className='mt-3'>
            <MdSupportAgent /> :1800-000-0000 (Toll Free)
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact