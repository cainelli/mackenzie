import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ExampleComponent from './ExampleComponent';
import PageNotFound from './PageNotFound';
import Breadcrumbs from './Breadcrumbs';
import s from '../styles/app.style';
import Menu from './Shared/Menu';

export default function App() {
  return (
    <div style={s.root}>
      <Menu />
      <div style={s.content}>
        <nav style={s.breadcrumbs}>
          <Breadcrumbs />
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/example" component={ExampleComponent} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}
