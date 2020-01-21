import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, UserProvider, RateProvider } from './context';
import './i18n';
import { IdentityContextProvider } from 'react-netlify-identity';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LOGROCKET_ID, SITE_URL, IS_LIVE } from './constants/env';
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
