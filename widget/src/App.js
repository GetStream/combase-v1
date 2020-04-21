import 'whatwg-fetch';

import React from 'react';

// Router //
import { MemoryRouter as Router, Route } from 'react-router-dom';

// Styles //
import { ThemeProvider } from 'styled-components';
import { light as theme } from '@comba.se/ui/styles/theme';
import GlobalStyles from '@comba.se/ui/styles/global';

// Contexts //
import { AuthProvider } from 'contexts/Auth';
import { SnackbarProvider } from "@comba.se/ui/Snackbar";
import { StoreProvider } from 'contexts/Store';

import Root from './Root';

const renderRoot = (props) => <Root {...props} />

function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <SnackbarProvider>
        <AuthProvider>
          <StoreProvider>
            <Router>
              <Route path="/" children={renderRoot} />
            </Router>
            <GlobalStyles />
          </StoreProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
