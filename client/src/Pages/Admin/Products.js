import React, {useEffect, useState} from 'react';
import AdminMenu from '../../Components/Layouts/AdminMenu';
import Layout from './../../Components/Layouts/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState ([]);
  //getProduct
  const getAllProducts = async () => {
    try {
      const {data} = await axios.get (
        'https://ecommerce-app-f61n.onrender.com/api/v1/product/get-product'
      );
      setProducts (data.products);
    } catch (error) {
      console.log (error);
      toast.error ('Somthung Went Wrong');
    }
  };
  //lifeCyclemethod
  useEffect (() => {
    getAllProducts ();
  }, []);
  return (
    <Layout title={'Dashboard - Products'}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Product List</h1>
            <div className='d-flex flex-wrap'>
            {products?.map(p =>(
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                <div className='card m-2' style={{width:"18rem"}}>
                  <img src={`https://ecommerce-app-f61n.onrender.com/api/v1/product/product-photo/${p._id}`} height={"350px"} className='card-img-top' alt={p.name} />
                  <div className='card-body'>
                    <h5 className='card-title'>{p.name}</h5>
                    <p className='card-text'>{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
