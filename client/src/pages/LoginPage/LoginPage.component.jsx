/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React, {
  useState, useCallback, useRef, memo,
} from 'react';
import PropTypes from 'prop-types';
import { Button, TextInput } from 'carbon-components-react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import S from './LoginPage.styles';

function LoginPage({ error, onLoginCallback, t }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const btnRef = useRef();

  const LOGIN = t('nls.LOGIN.login');
  const EMAIL = t('nls.LOGIN.email');
  const EMAIL_PLACEHOLDER = t('nls.LOGIN.email_placeholder');
  const PASSWORD_PLACEHOLDER = t('nls.LOGIN.password_placeholder');
  const PASSWORD = t('nls.LOGIN.password');
  const LOG_IN = t('nls.LOGIN.log_in');
  const INVALID_LOGIN = t('nls.LOGIN.invalid_auth');
  const FORGOT_PASSWORD = t('nls.LOGIN.forgot_password');

  const onSubmitHandler = async () => {
    if (btnRef.current) {
      btnRef.current.setAttribute('disabled', 'disabled');
    }
    onLoginCallback(email, password);
  };

  const onEmailChange = useCallback((event) => {
    event.preventDefault();
    btnRef.current.removeAttribute('disabled');
    setEmail(event.target.value.trim());
  }, []);

  const onPasswordChange = useCallback((event) => {
    event.preventDefault();
    btnRef.current.removeAttribute('disabled');
    setPassword(event.target.value.trim());
  }, []);

  /* const onForgotPW = useCallback(() => {
    if (email) {
      onForgotPWCallback(email);
    } else {

    }
  }, [email, onForgotPWCallback]) */

  return (
    <S.LoginPage className="login-page login-page-dark">
      <S.LoginSideForm className="login-sideform">

        <S.LoginForm className="login-form">
          <div>
            <S.PageTitle>{LOGIN}</S.PageTitle>
          </div>

          <S.ErrorMessageSection show={error}>
            <S.ErrorMessage show={error}>{INVALID_LOGIN}</S.ErrorMessage>
          </S.ErrorMessageSection>

          <div className="idSection">
            <TextInput
              id="email"
              className="__auto_email email"
              labelText={EMAIL}
              placeholder={EMAIL_PLACEHOLDER}
              value={email}
              autoComplete="username"
              onChange={onEmailChange}
            />
          </div>
          <div className="passwordSection">
            <TextInput.ControlledPasswordInput
              id="password"
              className="__auto_password password"
              labelText={PASSWORD}
              placeholder={PASSWORD_PLACEHOLDER}
              type={passwordType}
              togglePasswordVisibility={() => {
                setPasswordType(passwordType === 'password' ? 'text' : 'password');
              }}
              value={password}
              autoComplete="current-password"
              onChange={onPasswordChange}
            />
          </div>

          <Button className="__auto_login_btn login_btn" ref={btnRef} type="button" onClick={onSubmitHandler}>
            {LOG_IN}
          </Button>

          <S.ForgotPasswordLink>
            <Link to="/forgot-password" className="forgotpwd_link">{FORGOT_PASSWORD}</Link>
          </S.ForgotPasswordLink>

        </S.LoginForm>

      </S.LoginSideForm>

    </S.LoginPage>
  );
}

LoginPage.propTypes = {
  error: PropTypes.bool.isRequired,
  onLoginCallback: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(memo(LoginPage));
