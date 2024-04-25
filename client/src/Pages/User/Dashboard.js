import React from 'react';
import Layout from './../../Components/Layouts/Layout';
import UserMenu from '../../Components/Layouts/UserMenu';
import { useAuth } from '../../Context/Auth';

const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={'Dashboard - ecommerce app'}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className='card w-75 p-3'>
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              </div>
               </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
