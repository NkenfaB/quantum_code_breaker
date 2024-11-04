import React from 'react';

const AuthPage = ({ navigateTo }) => {
  return (
    <div className="auth-page">
      <h2>Welcome to Quantum Code Breaker</h2>
      <button onClick={() => navigateTo("setup")}>Login</button>
    </div>
  );
};

export default AuthPage;
