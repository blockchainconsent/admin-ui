/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, { useState, useContext, createContext } from 'react';
import { login as appLogin, logout as appLogout } from '../services/dataServices';

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const initialState = {
    authenticated: false,
    userName: '',
    roles: '',
  };

  const [user, setUser] = useState(initialState);

  const login = async ({ email, password }) => {
    try {
      const { status, data } = await appLogin(email, password);

      if (status === 200) {
        setUser({
          authenticated: true,
          userName: email,
          roles: data.scope,

          // TODO: store any other information about the user from AppID login as properties here
        });

        return true;
      }
    } catch (error) {
      const status = error?.response;

      switch (status) {
        // TODO: Do something
      }
      return false;
    }
  };

  const logout = async () => {
    const response = await appLogout();

    if (response.status === 200) {
      setUser(initialState);
    }
  };

  return {
    user,
    login,
    logout,
    setUser,
  };
}

export default useProvideAuth;

// create a context
const authContext = createContext();

// Provider a wrapper component for the app so auth context is available to all children
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Provide a convenience hook for childrent that uses the authContext
export const useAuth = () => useContext(authContext);
