import React from 'react';
import Layout from '../Components/Layouts/Layout';

const About = () => {
  return (
    <Layout title={'About us - ecommrce app'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{width: '100%'}}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            You will be given an opportunity to review this product-specific information before using these features. You also can view this information at any time, either in settings related to those features and
            {' '}
            You can familiarize yourself with our privacy practices, accessible via the headings below, and contact us if you have any questions.
            {' '}
            Your California Privacy Disclosures
            Information Regarding Commercial Electronic Messages in Canada
            Health Study Apps{' '}
          </p>

        </div>
      </div>
    </Layout>
  );
};

export default About;
