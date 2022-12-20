/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

describe('Admin UI E2E Test', () => {

  beforeEach(() => {
    sessionStorage.clear();
    cy.clearCookies();
    cy.clearLocalStorage();
  })
  it('Visit the Admin UI', () => {
    cy.visit('https://qa.cm-dev-1-226e64952a976153e1be4b395e756d61-0000.us-east.containers.appdomain.cloud/#/admin');
  });

  it('Check that Email and Password fields, Log in button, Forgot password link are present on the Login page', () => {
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
    cy.get('button.bx--btn--primary').should('have.text', 'Log in');
    cy.get('.forgotpwd_link').should('have.text', 'Forgot Password');
  });

  it('Check that Help dropdown is present on the Login page', () => {
    cy.get('a[aria-haspopup="menu"]').should('have.text', 'Help');
    cy.get('a[aria-haspopup="menu"]').click().get('.bx--text-truncate--end').should('have.text', 'Privacy');
  });

  it('Check that user is redirected to Search page', () => {
    cy.get('#email').type(Cypress.env('username2'), { delay:50 });
    cy.get('#password').type(Cypress.env('password2'), { delay:50 });
    cy.get('button.bx--btn--primary').click();
    cy.get('h1').should('have.text','Search');
    cy.get('a[aria-label="Logout"]').should('have.text', Cypress.env('username2'));
  });

  it('Check that user is able to log out', () => {
    cy.get('a[aria-label="Logout"]').should('have.text', Cypress.env('username2')).click().get('span.bx--text-truncate--end:first').should('have.text', 'Logout');
    cy.get('a[aria-label="Logout"]').click().click().get('span.bx--text-truncate--end:first').click();
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
  });

  it('Check that user is not able to login with blank email and password', () => {
    cy.get('button.bx--btn--primary').click();
    cy.get('.IEhuA').should('have.text','Invalid email address or password.')
  });

  it('Check that user is redirected to Forgot Password page', () => {
    cy.get('.forgotpwd_link').click();
    cy.get('h2').should('have.text','Forgot Password');
    cy.get('input#email').should('have.text','');
    cy.get('button.bx--btn--primary').should('have.text','Reset Password');
    cy.get('a.forgotpwd_link').should('have.text','Back to Login');
  });

  it('Check that reset password functionality works', () => {
    cy.get('input#email').type('wqewqsdas', { delay:50 }).should('have.value', 'wqewqsdas');
    cy.get('button.bx--btn--primary').click();
    cy.get('.fVaoNM').should('have.text','Invalid email address.');
    cy.get('input#email').type('{selectall}{del}test@mail.com', { delay:50 }).should('have.value', 'test@mail.com');
    cy.get('button.bx--btn--primary').click();
    cy.get('.bqxOpu').should('have.text','Email sent successfully. Please check your email');
    cy.get('a.forgotpwd_link').click();
  });

  it('Check No matches found and patient-1 right after that by qa2@test.org', () => {
    cy.get('#email').type(Cypress.env('username2'), { delay:50 });
    cy.get('#password').type(Cypress.env('password2'), { delay:50 });
    cy.get('button.bx--btn--primary').click();
    cy.get('input.bx--search-input').should('have.text','');
    cy.get('input.bx--search-input').type('{selectall}{del}dasdasdaad', { delay:50 }).should('have.value', 'dasdasdaad');
    cy.get('div.XavQL').should('have.text','No matches found');
    cy.get('input.bx--search-input').type('{selectall}{del}patient-1', { delay:50 }).should('have.value', 'patient-1');
    cy.get('h3.ehfErK', { timeout:20000 }).should('have.text','Results');
    cy.get('div.cQZIoF').should('have.text','Mrs. Lee268 Daniel959 ');
    cy.get('div.iDhzRL').should('have.text',' Patient ID: patient-1 ');
    cy.get('div.hSaKRS').should('have.text',' Email: Lee268@thisisfake.com ');
  });

  it('log out', () => {
    cy.get('a[aria-label="Logout"]').click().get('span.bx--text-truncate--end:first').click();
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
  });

  // check that search is still working after user logs in again
  it('Check that user is able to search patient data with email', () => {
    cy.get('#email').type(Cypress.env('username2'), { delay:50 });
    cy.get('#password').type(Cypress.env('password2'), { delay:50 });
    cy.get('button.bx--btn--primary').click();
    cy.get('input.bx--search-input').should('have.text','');
    cy.get('input.bx--search-input').type('{selectall}{del}patient-1', { delay:50 }).should('have.value', 'patient-1');
    cy.get('h3.ehfErK', { timeout:20000 }).should('have.text','Results');
    cy.get('div.cQZIoF').should('have.text','Mrs. Lee268 Daniel959 ');
    cy.get('div.iDhzRL').should('have.text',' Patient ID: patient-1 ');
    cy.get('div.hSaKRS').should('have.text',' Email: Lee268@thisisfake.com ');
  });

  it('log out', () => {
    cy.get('a[aria-label="Logout"]').click().get('span.bx--text-truncate--end:first').click();
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
  });

  it('Check that user is able to search patient data without email', () => {
    cy.get('#email').type(Cypress.env('username2'), { delay:50 });
    cy.get('#password').type(Cypress.env('password2'), { delay:50 });
    cy.get('button.bx--btn--primary').click();
    cy.get('input.bx--search-input').should('have.text','');
    cy.get('input.bx--search-input').type('{selectall}{del}patient-3', { delay:50 }).should('have.value', 'patient-3');
    cy.get('h3.ehfErK', { timeout:20000 }).should('have.text','Results');
    cy.get('div.cQZIoF').should('have.text','Mr. Claudio955 Contreras711 ');
    cy.get('div.iDhzRL').should('have.text',' Patient ID: patient-3 ');
  });

  it('log out', () => {
    cy.get('a[aria-label="Logout"]').click().get('span.bx--text-truncate--end:first').click();
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
  });

  it('Check patient-2 and some random patient id after that', () => {
    cy.get('#email').type(Cypress.env('username2'), { delay:50 });
    cy.get('#password').type(Cypress.env('password2'), { delay:50 });
    cy.get('button.bx--btn--primary').click();
    cy.get('input.bx--search-input').should('have.text','');
    cy.get('input.bx--search-input').type('{selectall}{del}patient-2', { delay:50 }).should('have.value', 'patient-2');
    cy.get('h3.ehfErK', { timeout:20000 }).should('have.text','Results');
    cy.get('div.cQZIoF').should('have.text','Hye44 Turner526 ');
    cy.get('div.iDhzRL').should('have.text',' Patient ID: patient-2 ');
    cy.get('div.hSaKRS').should('have.text',' Email: Hye44@thisisfake.com ');
    cy.get('input.bx--search-input').type('{selectall}{del}ddsfsdfsfsfd', { delay:50 }).should('have.value', 'ddsfsdfsfsfd');
    cy.wait(10000);
    cy.get('div.XavQL').should('have.text','No matches found');
  });

  it('log out', () => {
    cy.get('a[aria-label="Logout"]').click().get('span.bx--text-truncate--end:first').click();
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
  });

  it('Check patient-4 and Consent history by qa@test.org', () => {
    cy.get('#email').type(Cypress.env('username1'), { delay:50 });
    cy.get('#password').type(Cypress.env('password1'), { delay:50 });
    cy.get('button.bx--btn--primary').click();
    cy.get('input.bx--search-input').should('have.text','');
    cy.get('input.bx--search-input').type('{selectall}{del}patient-4', { delay:50 }).should('have.value', 'patient-4');
    cy.get('h3.ehfErK', { timeout:20000 }).should('have.text','Results');
    cy.get('div.cQZIoF').should('have.text','Mrs. Annemarie794 Heidenreich818 ');
    cy.get('div.iDhzRL').should('have.text',' Patient ID: patient-4 ');
    cy.get('h4.bx--data-table-header__title').should('have.text','Consent history');
    cy.get('table.bx--data-table--no-border > thead > tr > th:nth-of-type(1) > button').should('have.text','Target');
    cy.get('table.bx--data-table--no-border > thead > tr > th:nth-of-type(2) > button').should('have.text','Permissions Granted');
    cy.get('table.bx--data-table--no-border > thead > tr > th:nth-of-type(3) > button').should('have.text','Consent Start');
    cy.get('table.bx--data-table--no-border > thead > tr > th:nth-of-type(4) > button').should('have.text','Consent End');
    cy.get('tr > td:nth-of-type(1)').should('have.text','test11111');
    cy.get('tr > td:nth-of-type(2)').should('have.text','write access to datatype1, datatype2');
    cy.get('tr > td:nth-of-type(3)').should('have.text','03-09-2021');
    cy.get('tr > td:nth-of-type(4)').should('have.text','23-10-2021');
  });
});