import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { IdentityContextProvider } from 'react-netlify-identity';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { LOGROCKET_ID, SITE_URL, IS_LIVE } from './constants/env';
import { ThemeProvider, UserProvider, RateProvider } from './context';
import * as serviceWorker from './serviceWorker';

import './i18n';

import './utils/errors';

if (IS_LIVE) {
  LogRocket.init(LOGROCKET_ID);
  setupLogRocketReact(LogRocket);
}

/**
 *
 * @param {import('react-netlify-identity').User} user
 */
function identifyUser(user) {
  if (!IS_LIVE) {
    return;
  }

  if (user) {
    const {
      id,
      confirmed_at,
      created_at,
      app_metadata: { provider },
    } = user;
    LogRocket.identify(id, {
      provider,
      created_at,
      confirmed_at,
    });

    return;
  }

  LogRocket.identify(null);
}

render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <IdentityContextProvider url={SITE_URL} onAuthChange={identifyUser}>
          <UserProvider>
            <RateProvider>
              <App />
            </RateProvider>
          </UserProvider>
        </IdentityContextProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
