import React from 'react';
import Layout from '../Components/Layouts/Layout';
import {BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi';

const Contact = () => {
  return (
    <Layout title={'Contact us - ecommrce app'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{width: '100%'}}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info About product feel free to call anytime we 24X7 availible
          </p>
          <p className="mt-3">
            <BiMailSend />:althafmuhammad250@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall />:8086541633
          </p>
          <p className="mt-3">
            <BiSupport />:1800-0000-0000
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
