import React, {useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import "../styles/CategoryProductStyles.css"

const CategoryProduct = () => {
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(params?.slug) getProductsByCat()
    },[params?.slug])

    const getProductsByCat = async () => {
        try {
            const {data} = await axios.get(`/api/v1/products/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)

        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <Layout>
        <div className="container mt-3 category">
            <h2 className='text-center'>{category?.name}</h2>
            <h6 className='text-center'>{products?.length} results found</h6>
            <div className="col-md-12 offset-1">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-title">{p.description.substring(0, 30)}...</p>
                  <p className="card-title card-price">$ {p.price}</p>

                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-success ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct