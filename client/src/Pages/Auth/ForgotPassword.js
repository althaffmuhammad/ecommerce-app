import React, {useState} from 'react';
import Layout from '../../Components/Layouts/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState ('');
  const [newPassword, setNewPassword] = useState ('');
  const [phone, setPhone] = useState ('');
  const navigate = useNavigate ();

  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      const res = await axios.post (
        'http://localhost:3030/api/v1/auth/forgot-password',
        {
          email,
          newPassword,
          phone,
        }
      );
      if (res && res.data.success) {
        toast.success (res.data && res.data.message);

        navigate ('/login');
      } else {
        toast.error (res.data.message);
      }
    } catch (error) {
      console.log (error);
      toast.error ('something went wrong');
    }
  };
  return (
    <Layout title={'Forgot Password - ecommerce app'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">FORGOT</h2>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              value={email}
              onChange={e => setEmail (e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              value={phone}
              onChange={e => setPhone (e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your NewPassword"
              value={newPassword}
              onChange={e => setNewPassword (e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark ">Reset</button>
        </form>

      </div>
    </Layout>
  );
};

export default ForgotPassword;
