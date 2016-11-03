import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HomePage from '../containers/home-page/home-page';
import ProjectPage from '../containers/project-page/project-page';
export default function configureRoutes() {
  return (
    <Route path="/">
      <IndexRoute component={HomePage}/>
      <Route path="/projects/:id" component={ProjectPage}/>
    </Route>
  );
}
