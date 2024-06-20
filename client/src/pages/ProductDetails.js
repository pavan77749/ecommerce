import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Function to fetch similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/products/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error("Error fetching similar products:", error);
      // Optionally, set an error state or handle the error
    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Set loading state to true
        const { data } = await axios.get(`/api/v1/products/get-product/${params.slug}`);
        setProduct(data?.product);
        if (data?.product) {
          await getSimilarProducts(data?.product._id, data?.product.category?._id);
        }
        setLoading(false); // Set loading state to false after successful fetch
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product details.");
        setLoading(false); // Set loading state to false on error
      }
    };

    if (params?.slug) {
      fetchProduct();
    }
  }, [params?.slug]);

  // Render loading state while fetching data
  if (loading) {
    return (
      <Layout>
        <h1 className="text-center mt-3">Loading...</h1>
      </Layout>
    );
  }

  // Render error state if there's an error
  if (error) {
    return (
      <Layout>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Layout>
    );
  }

  // Render product details once loaded
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center mt-3">Product Details</h1>
        <div className="row mt-2">
          <div className="col-md-6">
            <img
              src={`/api/v1/products/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              style={{ maxHeight: "300px", maxWidth: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">{product.name} Details</h1>
            <h5>Name: {product.name}</h5>
            <h5>Description: {product.description}</h5>
            <h5 style={{color:"green"}}>Price: ${product.price}</h5>
            <h5>Category: {product.category?.name}</h5>
            <button className="btn btn-success ms-1"  onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem('cart',JSON.stringify([...cart,product]))
                        toast.success("Item Added to Cart");
                      }}>Add to Cart</button>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <h1 className="text-center">Similar Products</h1>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="col-md-3">
                <div className="card m-2">
                  <img
                    src={`/api/v1/products/product-photo/${relatedProduct._id}`}
                    className="card-img-top"
                    alt={relatedProduct.name}
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{relatedProduct.name}</h5>
                    <p className="card-text">
                      {relatedProduct.description.substring(0,30)}...
                    </p>
                    <p className="card-text">Price: ${relatedProduct.price}</p>
                    <button className="btn btn-success ms-1"  onClick={() => {
                        setCart([...cart, relatedProduct]);
                        localStorage.setItem('cart',JSON.stringify([...cart,relatedProduct]))
                        toast.success("Item Added to Cart");
                      }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No similar products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
