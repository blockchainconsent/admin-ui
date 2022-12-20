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
import { Button, TextInput } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { forgotPW } from '../../services/dataServices';
import S from './ForgotPasswordPage.styles';
import emailRegex from '../../helpers/regex';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const btnRef = useRef();

  const { t } = useTranslation();
  const FORGOT_PASSWORD = t('nls.FORGOT_PASSWORD.forgot_password');
  const EMAIL = t('nls.FORGOT_PASSWORD.email');
  const EMAIL_PLACEHOLDER = t('nls.FORGOT_PASSWORD.email_placeholder');
  const RESET_PASSWORD = t('nls.FORGOT_PASSWORD.reset_password');
  const INVALID_EMAIL = t('nls.FORGOT_PASSWORD.invalid_email');
  const EMAIL_REQUIRED = t('nls.FORGOT_PASSWORD.email_required');
  const EMAIL_SENT_ERR_MSG = t('nls.FORGOT_PASSWORD.email_sent_err_msg');
  const TOO_MANY_REQ_ERR_MSG = t('nls.FORGOT_PASSWORD.too_many_req_err_msg');

  const onSubmitHandler = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.setAttribute('disabled', 'disabled');
    }
    if (email !== '') {
      if (!emailRegex.test(email)) {
        setError(true);
        setSuccess(false);
        setMessage(INVALID_EMAIL);
      } else {
        forgotPW(email).then(
          (response) => {
            const { message } = response.data;
            setSuccess(true);
            setError(false);
            setMessage(message);
            btnRef.current.removeAttribute('disabled');
            setEmail('');
          },
          (error) => {
            if (error.response.status === 400) {
              setSuccess(false);
              setError(true);
              setMessage(EMAIL_SENT_ERR_MSG);
            }else if(error.response.status === 429) { //Too many request error handler
              setSuccess(false);
              setError(true);
              setMessage(TOO_MANY_REQ_ERR_MSG);
            }
            btnRef.current.removeAttribute('disabled');
            setEmail('');
          },
        );
      }
    } else {
      setError(true);
      setSuccess(false);
      setMessage(EMAIL_REQUIRED);
    }
  }, [EMAIL_REQUIRED, EMAIL_SENT_ERR_MSG, INVALID_EMAIL, email]);

  const onEmailChange = useCallback((event) => {
    event.preventDefault();
    btnRef.current.removeAttribute('disabled');
    setEmail(event.target.value.trim());
  }, []);

  return (
    <S.ForgotPasswordPage className="login-page login-page-dark">
      <S.ForgotPasswordSideForm className="login-sideform">

        <S.ForgotPasswordForm className="login-form">
          <div>
            <S.PageTitle>{FORGOT_PASSWORD}</S.PageTitle>
          </div>

          <S.SuccessMessageSection show={success}>
            <S.SuccessMessage show={success}>{message}</S.SuccessMessage>
          </S.SuccessMessageSection>

          <S.ErrorMessageSection show={error}>
            <S.ErrorMessage show={error}>{message}</S.ErrorMessage>
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

          <Button className="__auto_login_btn forgot_password_btn" ref={btnRef} type="button" onClick={onSubmitHandler}>
            {RESET_PASSWORD}
          </Button>

          <S.LoginLink>
            <Link to="/login" className="forgotpwd_link">Back to Login</Link>
          </S.LoginLink>

        </S.ForgotPasswordForm>

      </S.ForgotPasswordSideForm>

    </S.ForgotPasswordPage>
  );
};

export default memo(ForgotPasswordPage);
