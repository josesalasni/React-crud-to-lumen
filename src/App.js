
import React, { useState,useEffect } from 'react';

import 'antd/dist/antd.css';

import './App.css';

import {message} from 'antd';
import {  useMutation, gql } from '@apollo/client';
import ClientTable from './Screens/ClientTable';
import LoginScreen from './Screens/LoginScreen';

//import { UIRouter, UIView, useSrefActive, pushStateLocationPlugin } from "@uirouter/react";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";

const loginScreenState = { name: "login", url: "/" , component : LoginScreen };

const clientTableState = { 
  name: "client", url: "/client"  , 
  component : ClientTable
};

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem('token') !== null
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function App() {

  const [authed, setAuthed] = useState(false);

  useEffect(() => {

    if (localStorage.getItem("token") !== null) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }

  }, [authed])

  return (
    <div>

    <Router>
      <div>
        <Switch>
        <Route exact path="/">
            <Redirect to="/login" />
        </Route>
          <Route path="/login">
            <LoginScreen /> 
          </Route>
          <PrivateRoute path='/clients' component={ClientTable} />

        </Switch>
      </div>
    </Router>

       {/*<UIRouter 
        plugins={[pushStateLocationPlugin]} 
        states={[ loginScreenState, clientTableState]}>
          <UIView />
        </UIRouter>
       */}
    </div>
   
  );
}

export default App;
