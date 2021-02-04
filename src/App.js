
import React from "react";

import 'antd/dist/antd.css';

import './App.css';

import {message} from 'antd';

import ClientTable from './Screens/ClientTable';
import LoginScreen from './Screens/LoginScreen';

import { UIRouter, UIView, useSrefActive, pushStateLocationPlugin } from "@uirouter/react";

import { Transition } from '@uirouter/react';


const loginScreenState = { name: "login", url: "/" , component : LoginScreen };


const clientTableState = { 
  name: "client", url: "/client"  , 
  component : ClientTable
};

Transition.router.stateService.go('login');

function App() {
  return (
    <div>
       <UIRouter 
        plugins={[pushStateLocationPlugin]} 
        states={[ loginScreenState, clientTableState]}>
          <UIView />
      </UIRouter>
    </div>
   
  );
}

export default App;
