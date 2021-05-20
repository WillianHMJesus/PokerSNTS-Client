import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../components/account/auth';
import Home from '../components/home';
import SignIn from '../components/account';
import Regulation from "../components/regulation";
import RoundPoint from "../components/roundPoint";
import Ranking from "../components/ranking";
import Round from "../components/round";
import Player from "../components/player";

const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route path="/signin" component={SignIn} />
    <Route path="/regulation" component={Regulation} />
    <PrivateRoute path="/round-point" component={RoundPoint} />
    <PrivateRoute path="/ranking" component={Ranking} />
    <PrivateRoute path="/round" component={Round} />
    <PrivateRoute path="/player" component={Player} />
  </BrowserRouter>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ?
      <Component {...props} />
      : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
  )} />
);

export default Routes;