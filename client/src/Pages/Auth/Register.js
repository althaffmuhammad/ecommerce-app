import React, {useState} from 'react';
import Layout from '../../Components/Layouts/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [phone, setPhone] = useState ('');
  const [address, setAddress] = useState ('');
  const navigate = useNavigate ();

  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      const res = await axios.post (
        'https://ecommerce-app-f61n.onrender.com/api/v1/auth/register',
        {
          name,
          email,
          password,
          phone,
          address,
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
    <Layout title={'Register - ecommerce app'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Register</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              value={name}
              onChange={e => setName (e.target.value)}
            />
          </div>
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
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              value={password}
              onChange={e => setPassword (e.target.value)}
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
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              value={address}
              onChange={e => setAddress (e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-dark ">Register</button>
        </form>

      </div>
    </Layout>
  );
};

export default Register;
