import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from '../imports/ui/App.js';
import StudentCourseMap from '../imports/ui/StudentCourseMap.js';
const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/student/course/map" component={StudentCourseMap}/>
    </Switch>
  </Router>
);
