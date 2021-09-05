import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {GitSearchProvider} from './context/user-context'
import {Auth0Provider} from '@auth0/auth0-react'

ReactDOM.render(
  <React.StrictMode>
      <Auth0Provider
        domain="dev-yaduveer.us.auth0.com"
        clientId="OmXggUIREAaVV6bk24nayArzf3lCsp0h"
        redirectUri={window.location.origin}
        >
        <GitSearchProvider>
          <App />
        </GitSearchProvider>
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
