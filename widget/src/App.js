import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StreamChatProvider } from 'stream-chat-hooks';

// Styles //
import { ThemeProvider } from 'styled-components';
import { light as theme } from '@comba.se/ui/styles/theme';
import GlobalStyles from '@comba.se/ui/styles/global';

// Screens //
import Home from 'screens/Home';

const apiKey = "pyst6tqux4vf";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWU1NTUyOTYxZTdmNzAwYWJkMGRmZjIzIn0.Z1WIshH9NZ54eVbcGeNOcfVSNGjUEOtLJ2FDuTfbtVI";
const user = {
  id: '5e5552961e7f700abd0dff23',
  name: 'Josh Tilton'
};

function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <StreamChatProvider {...{ apiKey, token, user }}>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
        <GlobalStyles />
      </StreamChatProvider>
    </ThemeProvider>
  );
}

export default App;
