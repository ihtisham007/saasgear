import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import store from '@/config/store';
import App from './App';

import '@/config/i18n';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const render = () => {
  ReactDOM.render(
    <Sentry.ErrorBoundary fallback="An error has occurred">
      <Provider store={store}>
        <App />
      </Provider>
    </Sentry.ErrorBoundary>,
    document.getElementById('root'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}
