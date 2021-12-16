import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ClientSide from './ClientSide';
import Admin from './views/admin/Admin';
import { AuthProvider } from './Context/AuthAppContext';
import { AuthAdminProvider } from './Context/AuthAdminContext';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin">
        <AuthAdminProvider>
          <Admin></Admin>
        </AuthAdminProvider>
      </Route>
      <Route path={["/"]}>
        <AuthProvider>
          <ClientSide />
        </AuthProvider>
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);