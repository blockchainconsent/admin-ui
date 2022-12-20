/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import styled from 'styled-components';
import { g100 } from '@carbon/themes';

const { support01, ui05, ui01 } = g100;

const ForgotPasswordPage = styled.div`
   /* background-color: ${ui01}; */
   display: flex;
   flex: 1 1 auto;
   justify-content: space-between;
   align-items: flex-start;
   /* color: ${ui05}; */
   height: 100%;
 
   .idSection+.passwordSection {
     margin-top: 2rem;
   }
 
   .bx--label {
     /* color: ${ui05}; */
   }
 
   .forgot_password_btn {
     margin-top: 2rem;
     /* width: 100%; */
   }
 
   @media only screen and (max-width: 1000px) {
   .login-sideform {
     margin: 0;
     .login-form {
       margin: auto;
     }
   }
 }
 `;

const ForgotPasswordSideForm = styled.div`
   display: flex;
   flex: 1 1 auto;
   flex-direction: column;
   height:inherit;
   flex: 20%;
   margin-left: 2rem;
   margin-top: 2rem;
   z-index: 1;
 
   button {
     max-width: none;
   }
 
   .forgotpw {
     justify-content: flex-end;
     &:hover{
       color: #0f62fe;
       background-color: #0000;
       outline: none;
     }
     &:focus {
       border: none;
       box-shadow: none;
     }
   }
 `;

const ForgotPasswordForm = styled.form`
   max-width: 300px;
   min-width: 300px;
 `;

const PageTitle = styled.h2`
   font-weight: 400;
   letter-spacing: 0;
   margin-bottom: 2rem;
   /* margin-bottom: 4rem; */
 `;

const ErrorMessageSection = styled.div`
     height: ${(props) => (props.show === true ? '3rem' : '0rem')};
     max-height: ${(props) => (props.show === true ? '3rem' : '0rem')};
     transition: ${(props) => (props.show === true ? 'max-height 0.3s ease-in' : 'max-height 0.3s ease-out')};
     margin-bottom: 1rem;
     
 `;

const ErrorMessage = styled.div`
   display: ${(props) => (props.show === true ? 'block' : 'none')};
   color: ${support01};
   background-color: #f1a7a7;
   height: ${(props) => (props.show === true ? '3rem' : '0rem')};
   max-height: ${(props) => (props.show === true ? '3rem' : '0rem')};
   padding: 15px;
   color: black;
 `;

const SuccessMessageSection = styled.div`
     height: ${(props) => (props.show === true ? '3rem' : '0rem')};
     max-height: ${(props) => (props.show === true ? '3rem' : '0rem')};
     transition: ${(props) => (props.show === true ? 'max-height 0.3s ease-in' : 'max-height 0.3s ease-out')};
     margin-bottom: 1rem;
     
 `;

const SuccessMessage = styled.div`
   display: ${(props) => (props.show === true ? 'block' : 'none')};
   color: #00695c;
   background-color: #69cc79;
   height: ${(props) => (props.show === true ? '3.5rem' : '0rem')};
   max-height: ${(props) => (props.show === true ? '3.5rem' : '0rem')};
   padding: 15px;
   color: black;
 `;

const LoginLink = styled.div`
  padding-top: 10px;
  .login_link {
    margin-top: 2em;
  }
`;

const S = {
  ForgotPasswordPage,
  ForgotPasswordSideForm,
  ForgotPasswordForm,
  PageTitle,
  ErrorMessage,
  ErrorMessageSection,
  SuccessMessageSection,
  SuccessMessage,
  LoginLink,
};

export default S;
