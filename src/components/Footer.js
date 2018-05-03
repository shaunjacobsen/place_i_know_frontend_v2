import React from 'react';
import moment from 'moment';

export default props => {
  return (
    <div className="footer">
      <div className="footer__content">
      <div className="footer__content-copyright">
        &copy; 2017 &mdash; {moment().year} Place I Know Travel Planning. Software custom
        built with &hearts; by Shaun Jacobsen. All Rights Reserved.
        </div>
        <div className="footer__content-links">Privacy Policy
        </div>
      </div>
    </div>
  );
};
