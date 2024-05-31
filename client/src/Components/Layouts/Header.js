import React, {Fragment} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {useAuth} from '../../Context/Auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import { useCart } from '../../Context/Cart';
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth ();
  const [cart, setCart] = useCart ();
  const handleLogout = () => {
    setAuth ({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem ('auth');
    toast.success ('Logout Successfully');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand nav-brand">🛒Ecommerce App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  navbar-900px">
              <li className="nav-item me-3">
              <SearchInput/>
                
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">Home</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/orderse" className="nav-link">Oreders</NavLink>
              </li> */}
              {!auth.user
                ? <Fragment>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link ">Login</NavLink>
                    </li>
                  </Fragment>
                : <Fragment>

                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link nonactive dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth.user.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : 'user'}`}>
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item "
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </Fragment>}
              <li className="nav-item">
                <Badge count={cart?.length} showZero><NavLink to="/cart" className="nav-link "><img src="/images/icons8-cart-50.png" alt="" width={'20px'}/></NavLink></Badge>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  );
};

export default Header;
