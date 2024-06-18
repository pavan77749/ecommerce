import React from "react";
import Layout from "../components/Layout/Layout";

function About() {
  return (
    <Layout title={"About - Ecommerce Shop"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/aboutus.jpg"
            alt="contactus"
            style={{ width: "90%", marginTop: "20px" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            <h2 style={{ color: "#ff5f00" }}>About Us</h2>

            <li>
              At <strong>[Ecommerce shop]</strong>, we are passionate about
              bringing you the best products and an exceptional shopping
              experience. Founded in [Year], our mission is to provide
              high-quality items at competitive prices, with a commitment to
              outstanding customer service.
            </li>

            <h3 style={{ color: "#ff5f00" }}>Our Story</h3>
            <li>
              Our journey began with a simple idea: to create a shopping
              destination where customers can find a curated selection of unique
              and everyday products. Over the years, we have grown and evolved,
              but our dedication to our customers remains the same. We are
              driven by our love for innovation, quality, and style, and we
              strive to offer products that enhance your lifestyle.
            </li>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
