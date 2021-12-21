import React from "react";
import { Provider } from "react-redux";
import AppNavigator from "./navigator";
import {store} from './configureStore';

const Main = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default Main;