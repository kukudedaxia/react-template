import { Button } from 'antd';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { RouteComponentProps } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import useRootStore from '../../models/index';

const Home: FC<RouteComponentProps> = ({ history }) => {
  const store = useLocalStore(() => ({
    exit() {
      window.localStorage.removeItem('currenUser');
      history.push('/login');
    },
  }));
  return useObserver(() => (
    <div>
      <p>主界面</p>
      <Button type="primary" block onClick={store.exit} htmlType="submit" size="large">
        登出
      </Button>
    </div>
  ));
};

export default hot(Home);
