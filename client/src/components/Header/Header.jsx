/**
 * Open Blockchain Consent Manager 
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HeaderMenu,
  HeaderMenuItem,
  HeaderName,
  HeaderGlobalBar,
} from 'carbon-components-react/lib/components/UIShell';
import { useAuth } from '../../hooks/useAuth';

import S from './Header.styles';

const openLicense = () => {};

const AppHeader = () => {
  const history = useHistory();

  const { t } = useTranslation();
  const HEADERSTRING = t('nls.HEADER.app_name');
  const LOGOUT = t('nls.HEADER.logout');
  const HELP = t('nls.HEADER.help');
  const PRIVACY = t('nls.HEADER.privacy');

  const { user, logout } = useAuth();
  const { authenticated, userName } = user;

  const handleLogout = async () => {
    logout();
    history.push('/');
  };

  return (
    <S.HeaderWrapper className="__auto_header" aria-label={HEADERSTRING}>
      <HeaderName prefix="">{HEADERSTRING}</HeaderName>

      <HeaderGlobalBar>
        {
          // Don't show the logout link with the userName until we have the userName
          authenticated && (
            <HeaderMenu
              className="_auto_logoutMenu"
              menuLinkName={userName}
              aria-haspopup="false"
              aria-label={LOGOUT}
            >
              <HeaderMenuItem className="_auto_logout" onClick={handleLogout}>
                {LOGOUT}
              </HeaderMenuItem>
            </HeaderMenu>
          )
        }

        <HeaderMenu
          className="_auto_licenseMenu"
          menuLinkName={HELP}
          aria-label={HELP}
        >
          <HeaderMenuItem className="_auto_license" onClick={openLicense}>
            {PRIVACY}
          </HeaderMenuItem>
        </HeaderMenu>
      </HeaderGlobalBar>
    </S.HeaderWrapper>
  );
};

export default AppHeader;
