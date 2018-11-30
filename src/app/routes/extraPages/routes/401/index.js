import React from 'react';
import Button from 'material-ui/Button'

const Error401 = () => (
  <div className="page-error-container animated slideInUpTiny animation-duration-3">
    <div className="page-error-content">
      <div className="error-code mb-4 animated zoomInDown">401</div>
      <h2 className="text-center fw-regular title bounceIn animation-delay-10 animated">
        The request has not been applied because it lacks
        valid authentication credentials for the target resource.
      </h2>
      <p className="text-center zoomIn animation-delay-20 animated">
        <Button
          size="large"
          className="text-white bg-primary"
          href="http://vies.ninja/login.html"
          raised
        >
          Login
        </Button>
      </p>
    </div>
  </div>
);

export default Error401;