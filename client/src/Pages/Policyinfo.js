import React from 'react';
import Layout from '../Components/Layouts/Layout';

const Policyinfo = () => {
  return (
    <Layout title={'Privacy Policy - ecommrce app'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/privacy-policy.jpg"
            alt="contactus"
            style={{width: '100%'}}
          />
        </div>
        <div className="col-md-4">
          <h3 className="text-justify ">
            Updated December 23, 2023 Ecommerce Privacy Policy describes how Apple collects, uses, and shares your personal data.
          </h3>
          <p className="text-justify ">
            In addition to this Privacy Policy, we provide data and
            privacy information embedded in our products and certain
            features that ask to use your personal data. This product-specific
            information is accompanied by our Data & Privacy Icon.
          </p>

        </div>
      </div>
    </Layout>
  );
};

export default Policyinfo;
