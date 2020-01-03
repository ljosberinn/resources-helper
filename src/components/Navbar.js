import React, { useState } from 'react';
import { Navbar as RBXNavbar, Button } from 'rbx';
import LanguageSwitch from './LanguageSwitch';
import Icon from './Icon';
import Loader from './Loader';
import ThemeSwitch from './ThemeSwitch';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as ROUTES from '../constants/routes';
import { useIdentityContext } from 'react-netlify-identity';
import env from '../constants/env';

/**
 * @returns {React.FC} LogoIpsumSvg
 */
const LogoIpsumSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 39" height="32">
    <g fill="currentColor">
      <path d="M44.51 12.26h3.21v13h-3.21zM49 20.37c0-3.22 2-5.15 5-5.15s5 1.93 5 5.15-1.93 5.17-5 5.17-5-1.88-5-5.17zm6.82 0c0-1.77-.69-2.81-1.79-2.81s-1.78 1-1.78 2.81.68 2.8 1.78 2.8 1.81-.99 1.81-2.79zm4.46 5.56h3.1a1.664 1.664 0 0 0 1.74 1c1.23 0 1.87-.66 1.87-1.64v-1.8H67a3.074 3.074 0 0 1-3 1.75c-2.35 0-3.91-1.79-3.91-4.87s1.49-5 4-5a3.077 3.077 0 0 1 3 1.89H67v-1.81h3.18v9.74c0 2.35-2.08 3.82-5.14 3.82-2.78-.01-4.56-1.28-4.74-3.07zM67 20.37c0-1.57-.72-2.56-1.86-2.56s-1.84 1-1.84 2.56.69 2.48 1.84 2.48S67 22 67 20.37zm4.45 0c0-3.22 2-5.15 5-5.15s5 1.93 5 5.15-1.94 5.17-5 5.17-4.98-1.88-4.98-5.17zm6.82 0c0-1.77-.7-2.81-1.79-2.81s-1.78 1-1.78 2.81.68 2.8 1.78 2.8 1.81-.99 1.81-2.79zm4.48-7.29l-.001-.07c0-.9.74-1.64 1.64-1.64.899 0 1.64.74 1.64 1.64 0 .899-.74 1.639-1.639 1.64l-.04.001c-.86 0-1.569-.702-1.58-1.561zm0 2.36H86v9.86h-3.2zm14.94 4.93c0 3.21-1.44 5.07-3.89 5.07a3.075 3.075 0 0 1-3-1.83h-.06v4.86h-3.21v-13h3.19v1.76h.06a3.097 3.097 0 0 1 3-1.9c2.52-.02 3.97 1.83 3.97 5.05zm-3.27 0c0-1.56-.73-2.57-1.86-2.57s-1.84 1-1.85 2.57.72 2.56 1.85 2.56 1.92-.93 1.92-2.55zm8.75-5.16c2.69 0 4.36 1.27 4.38 3.31h-2.93c0-.71-.59-1.15-1.47-1.15s-1.3.34-1.3.85.37.67 1.11.82l2.06.42c2 .42 2.8 1.22 2.8 2.71 0 2-1.85 3.36-4.6 3.36s-4.54-1.32-4.67-3.33h3.11c.09.73.67 1.16 1.61 1.16s1.38-.3 1.38-.83-.3-.62-1.07-.78l-1.86-.39c-1.93-.41-2.94-1.42-2.94-2.93.06-1.96 1.74-3.21 4.45-3.21zm15.4 10.08h-3.11v-1.85h-.06a2.827 2.827 0 0 1-2.87 2.05l-.112.002A3.447 3.447 0 0 1 109 21.78v-6.33h3.21v5.64c0 1.16.61 1.79 1.61 1.79a1.648 1.648 0 0 0 1.61-1.88v-5.55h3.2zm1.55-9.85h3.12v1.9h.07a2.867 2.867 0 0 1 2.81-2.08 2.57 2.57 0 0 1 2.74 2.09h.14a3.008 3.008 0 0 1 3-2.09c.04-.002.079-.002.119-.002a3.135 3.135 0 0 1 3.111 3.352v6.69H132v-5.87c0-1-.47-1.56-1.38-1.56h-.023a1.407 1.407 0 0 0-1.387 1.59v5.84h-3.06v-5.9c0-1-.49-1.53-1.37-1.53h-.011a1.436 1.436 0 0 0-1.419 1.61v5.82h-3.21zM38.16 13.11c0-5.42-4.46-9.88-9.88-9.88A9.884 9.884 0 0 0 21 6.43H8.52v26.34h26.35V20.46a9.874 9.874 0 0 0 3.29-7.35zm-5.07 0v.01c0 2.644-2.176 4.82-4.82 4.82s-4.82-2.176-4.82-4.82 2.176-4.82 4.82-4.82c2.64 0 4.815 2.17 4.82 4.81zM29.8 27.7H13.59V11.5h4.94a9.548 9.548 0 0 0-.15 1.61c.005 5.423 4.467 9.885 9.89 9.89a9.682 9.682 0 0 0 1.53-.13z" />
    </g>
  </svg>
);

/**
 * @returns {React.FC} Navbar
 */
export default function Navbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { isLoggedIn, logoutUser, isConfirmedUser } = useIdentityContext();
  const { push } = useHistory();
  const { t } = useTranslation(['navigation', 'routes']);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutUser();
    setIsLoggingOut(false);

    push('/');
  };

  return (
    <>
      <RBXNavbar>
        <RBXNavbar.Brand>
          <RBXNavbar.Item as={Link} to="/">
            <LogoIpsumSvg />
          </RBXNavbar.Item>
          <RBXNavbar.Burger />
        </RBXNavbar.Brand>
        <RBXNavbar.Menu>
          <RBXNavbar.Segment align="end">
            <LanguageSwitch from="nav" />

            <ThemeSwitch from="nav" />

            {env.DISCORD_LINK && (
              <RBXNavbar.Item
                href={env.DISCORD_LINK}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon icon={faDiscord} /> <span>Discord</span>
              </RBXNavbar.Item>
            )}

            {env.REPO_LINK && (
              <RBXNavbar.Item
                href={env.REPO_LINK}
                rel="noreferrer noopener"
                target="_blank"
              >
                <Icon icon={faGithub} /> <span>{t('contribute')}</span>
              </RBXNavbar.Item>
            )}

            {!isConfirmedUser || !isLoggedIn ? (
              <Button.Group>
                <NavButton color="primary" to={ROUTES.REGISTER.clientPath}>
                  <Icon icon={ROUTES.REGISTER.icon} />
                  <span>{t('routes:register')}</span>
                </NavButton>

                <NavButton color="light" to={ROUTES.LOGIN.clientPath}>
                  <Icon icon={ROUTES.LOGIN.icon} />
                  <span>{t('routes:login')}</span>
                </NavButton>
              </Button.Group>
            ) : (
              <AuthenticatedNavButtons
                isLoggingOut={isLoggingOut}
                isConfirmedUser={isConfirmedUser}
                handleLogout={handleLogout}
                t={t}
              />
            )}
          </RBXNavbar.Segment>
        </RBXNavbar.Menu>
      </RBXNavbar>
      {isLoggingOut && <Loader isFullPage />}
    </>
  );
}

/**
 *
 * @returns {React.FC<{
 * children: React.ReactChildren
 * }>} NavButton
 */
function NavButton({ children, ...rest }) {
  return (
    <Button as={NavLink} {...rest}>
      {children}
    </Button>
  );
}

/**
 *
 * @returns {React.FC<{
 * isLoggingOut: boolean,
 * isConfirmedUser: boolean,
 * handleLogout: () => Promise<void>,
 * t: import('react-i18next').UseTranslationResponse['t']
 * }>} AuthenticatedNavButtons
 */
function AuthenticatedNavButtons({
  isLoggingOut,
  isConfirmedUser,
  handleLogout,
  t,
}) {
  const { pathname } = useLocation();

  if (!isConfirmedUser) {
    return null;
  }

  return (
    <Button.Group>
      <NavButton
        color="primary"
        to={ROUTES.SETTINGS.clientPath}
        disabled={isLoggingOut}
      >
        <Icon
          icon={ROUTES.SETTINGS.icon}
          className={[
            'is-spinning',
            pathname.includes('/settings/') && 'active',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        <span>{t('routes:settings')}</span>
      </NavButton>

      <Button color="danger" onClick={handleLogout} disabled={isLoggingOut}>
        <Icon icon={faSignOutAlt} />
        <span>{t('logout')}</span>
      </Button>
    </Button.Group>
  );
}
