import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import {  useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";

const Search = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart();
  const [values] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products found"
              : `Found ${values?.results.length} `}
          </h6>
        </div>
        <div className="d-flex flex-wrap">
          {values.results?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/products/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}</p>
                <p className="card-text">₹ {p.price}</p>

                <button className="btn btn-primary ms-1"   onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                <button className="btn btn-success ms-1"  onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart',JSON.stringify([...cart,p]))
                        toast.success("Item Added to Cart");
                      }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
