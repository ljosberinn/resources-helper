import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, UserProvider, RateProvider } from './context';
import './i18n';
import { IdentityContextProvider } from 'react-netlify-identity';
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { BrowserRouter as Router } from 'react-router-dom';
import env from './constants/env';

const isLive = process.env.NODE_ENV !== 'development';

if (isLive) {
  Sentry.init({ dsn: env.SENTRY_DSN });
  LogRocket.init(env.LOGROCKET_ID);
  setupLogRocketReact(LogRocket);

  LogRocket.getSessionURL(sessionURL => {
    Sentry.configureScope(scope => {
      scope.setExtra('sessionURL', sessionURL);
    });
  });
}

/**
 *
 * @param {import('react-netlify-identity').User} user
 */
function identifyUser(user) {
  if (!isLive) {
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
        <IdentityContextProvider url={env.SITE_URL} onAuthChange={identifyUser}>
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
