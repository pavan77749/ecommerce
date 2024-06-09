import React from 'react'
import Layout from '../components/Layout/Layout'

function Policy() {
  return (
    <Layout title={" Privacy Policy - Ecommerce Shop"}>
         <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/policy.jpg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <h4 style={{color:"#ff5f00"}}>Privacy Policy</h4>
          <p>Data Collection: Personal info and usage data. <br />
            Use: Order processing, communication, and service improvement. <br />
            Sharing: No selling of data; shared with trusted partners and for legal reasons. <br />
            Security: Various measures to protect your data. <br />
            Consent: Using our site means you agree to our policy.</p>
          <h4 style={{color:"#ff5f00"}}>Return Policy</h4>
          <p>Returns: Within 30 days in original condition for refund/exchange. <br />
          Refunds: Processed in 5-7 business days to the original payment method. <br />
          Exchanges: Contact customer service. <br />
            Shipping Costs: Customer pays unless our error.</p>
          
        </div>
      </div>
    </Layout>
  )
}

export default Policy