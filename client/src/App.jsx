/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React from 'react';

import {
  HashRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import { Loading } from 'carbon-components-react';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage/AdminPage.component';
import LogoutPage from './pages/LogoutPage/LogoutPage.component';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage.component';
import { UserRole } from './constants/roles';

import { StyledMainContent, StyledHeader } from './App.styles';
import AppHeader from './components/Header/Header';

import { ProvideAuth } from './hooks/useAuth';

import './App.scss';
import './i18n';

function App() {
  useBeforeunload((event) => {
    event.preventDefault();
  });

  return (
    <ProvideAuth>
      <Loading />
      <Router>
        <StyledHeader>
          <AppHeader />
        </StyledHeader>

        <StyledMainContent>
          <Switch>
            <ProtectedRoute
              path="/admin"
              component={AdminPage}
              role={UserRole.CONSENT_READ}
            />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <Route path="/">
              <Redirect to="/admin" />
            </Route>

          </Switch>
        </StyledMainContent>
      </Router>
    </ProvideAuth>
  );
}

export default App;
