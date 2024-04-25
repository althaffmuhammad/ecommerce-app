import React, {useState} from 'react';
import Layout from '../../Components/Layouts/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import {useAuth} from '../../Context/Auth';

const Login = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate ();
  const [auth, setAuth] = useAuth ();
  const location = useLocation ();

  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      const res = await axios.post ('http://localhost:3030/api/v1/auth/login', {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success (res.data && res.data.message);
        setAuth ({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem ('auth', JSON.stringify (res.data));
        navigate (location.state || '/');
      } else {
        toast.error (res.data.message);
      }
    } catch (error) {
      console.log (error);
      toast.error ('something went wrong');
    }
  };
  return (
    <Layout title={'Login - ecommerce app'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Login</h2>
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
            <button
              type="button"
              className="btn btn-dark "
              onClick={() => {
                navigate ('/forgot-password');
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-dark ">Login</button>
        </form>

      </div>
    </Layout>
  );
};

export default Login;
