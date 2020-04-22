import { Button } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { RouteComponentProps } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import useRootStore from '../../models/index';

const Login: FC<RouteComponentProps> = ({ history }) => {
  const rootStore = useRootStore();
  const store = useLocalStore(() => ({
    login() {
      // rootStore.fetchCurrentUser();
      window.localStorage.currenUser = 'admin';
      history.push('/');
    },
  }));
  return useObserver(() => (
    <div>
      <p>登录界面</p>
      <Button type="primary" block onClick={store.login} htmlType="submit" size="large">
        登录
      </Button>
    </div>
  ));
};

export default hot(Login);
