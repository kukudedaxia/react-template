import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import './App.css';
import useRootStore, { RootStore, rootStoreContext } from './models/index';
import { Routes } from './models/menu';
import Login from './pages/Login/Login';

export const history = createBrowserHistory();

const Main = observer(() => {
  const rootStore = useRootStore();
  useEffect(() => {
    rootStore.fetchCurrentUser();
  }, [rootStore]);
  return rootStore.currentUser ? <Routes /> : null;
});

const App = () => {
  const [rootStore] = useState(() => new RootStore()); // 传递下去的全局变量
  return (
    <Router history={history}>
      <rootStoreContext.Provider value={rootStore}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={() => <Main />} />
        </Switch>
      </rootStoreContext.Provider>
    </Router>
  );
};

export default App;
