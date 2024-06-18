import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false); // State to track if no products are found
  const navigate = useNavigate();

  // Fetch categories and total count on initial load
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more products when page changes
  useEffect(() => {
    if (page === 1) return;
    loadMoreProducts();
  }, [page]);

  // Load more products
  const loadMoreProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch all products without filters
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle category filter change
  const handleFilter = (value, id) => {
    let updatedChecked = [...checked];
    if (value) {
      updatedChecked.push(id);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== id);
    }
    setChecked(updatedChecked);
  };

  // Apply filters and fetch filtered products
  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      filterProducts();
    }
  }, [checked, radio]);

  // Filter products based on checked categories and price range
  const filterProducts = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      if (data.products.length === 0) {
        setNoProductsFound(true);
      } else {
        setNoProductsFound(false);
      }
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Best Offers - Ecommerce Shop"}>
      <div className="row mt-3">
        <div className="col-md-2 ms-5">
          <h4 className="text-left ">Filter By Category</h4>
          <div className="d-flex flex-column mb-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price Filter */}
          <h4 className="text-left">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p.id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-3">
            <div
              className="btn"
              style={{
                backgroundColor: "#ff5f00",
                borderColor: "#ff5f00",
                color: "#ffffff",
              }}
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.length > 0 ? (
              products.map((p) => (
                <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}</p>
                    <p className="card-text">₹ {p.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-success ms-1">Add to Cart</button>
                  </div>
                </div>
              ))
            ) : (
              <h6>No products found</h6>
            )}
          </div>
          {products && products.length < total && !noProductsFound && (
            <div className="m-2 p-3">
              <button
                className="btn"
                style={{
                  backgroundColor: "#ff5f00",
                  borderColor: "#ff5f00",
                  color: "#ffffff",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading...." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
