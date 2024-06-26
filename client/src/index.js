import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Styles/Authstyle.css';
import './Styles/CartStyle.css';
import './Styles/CategoryProductStyle.css';
import './Styles/HomePage.css';
import './Styles/ProductDetailesStyle.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './Context/Auth';
import {SearchProvider} from './Context/Search';
import 'antd/dist/reset.css';
import {CartProvider} from './Context/Cart';

const root = ReactDOM.createRoot (document.getElementById ('root'));
root.render (
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

reportWebVitals ();
