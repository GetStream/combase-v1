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

const apiKey = "pyst6tqux4vf";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWU1NTUyOTYxZTdmNzAwYWJkMGRmZjIzIn0.Z1WIshH9NZ54eVbcGeNOcfVSNGjUEOtLJ2FDuTfbtVI";
const user = {
  id: '5e5552961e7f700abd0dff23',
  name: 'Josh Tilton'
};

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
