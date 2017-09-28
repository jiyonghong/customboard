import React from 'react';

import { Switch, Route } from 'react-router-dom';

import routes from 'app/routes';


class AppContainer extends React.Component {
  render() {
    return (
      <Switch>
        {routes.map(route => (
          <Route key={route.name} {...route} />
        ))}
      </Switch>
    );
  }
}

export default AppContainer;
