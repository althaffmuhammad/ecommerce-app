
import React from 'react'
import { useSearch } from '../Context/Search';
import Layout from './../Components/Layouts/Layout';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cart';
import toast from 'react-hot-toast';

const Search = () => {
      //eslint-disable-next-line
    const [values, setValues] = useSearch();
    const navigate =useNavigate()
    const [cart, setCart] = useCart ();

  return (
    <Layout title={"Search results"}>
    <div className="container ">
      <div className="text-center">
        <h1>Search Resuts</h1>
        <h6>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </h6>
        <div className="d-flex flex-wrap mt-4 home-page">
          {values?.results.map((p) => (
            <div className="card m-2" key={p._id}>
            <img
              src={`https://ecommerce-app-f61n.onrender.com/api/v1/product/product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
            <div className="card-body">
              <div className="card-name-price">
                <h5 className="card-title">{p.name}</h5>
                <h5 className="card-title card-price">
                  {p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h5>
              </div>
              <p className="card-text ">
                {p.description.substring(0, 60)}...
              </p>
              <div className="card-name-price">
                <button
                  className="btn btn-info ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Search