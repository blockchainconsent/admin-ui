/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage.component';
import { useAuth } from '../hooks/useAuth';
import UnauthorizedPage from '../pages/UnauthorizedPage/UnauthorizedPage.component';

function ProtectedRoute({ component: Component, role, ...rest }) {
  const auth = useAuth();
  const { user, login, setUser } = auth;
  const { authenticated, roles, userName } = user;
  const userIsAuthorized = roles && roles.indexOf(role) >= 0;

  const [success, setSuccess] = useState();

  useEffect(() => {
    setUser({
      authenticated,
      userName,
      roles
    });
  }, [setUser]);

  const handleLogin = async (email, password) => {
    setSuccess(await login({ email, password }));
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {!authenticated && (
            <LoginPage
              onLoginCallback={handleLogin}
              // onForgotPWCallback={forgotPW}
              error={success === false}
            />
          )}

          {authenticated && userIsAuthorized && <Component {...props} />}
          {authenticated && !userIsAuthorized && <UnauthorizedPage />}
        </>
      )}
    />
  );
}

export default ProtectedRoute;
