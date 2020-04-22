import { observable, action } from 'mobx';
import { createContext, useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { history } from '../App';

// 定义全局变量
export class RootStore {
  @observable
  name = '';

  @observable
  loadingCurrentUser = false;

  @observable
  currentUser = null;

  @action
  fetchCurrentUser = () => {
    const storage = window.localStorage;
    this.currentUser = storage.currenUser;
    this.loadingCurrentUser = true;
    if (this.currentUser) {
      this.loadingCurrentUser = false;
      console.log('已登录');
    } else {
      // @ts-ignore
      history.push('/login');
      console.log('未登录');
    }
  };

  constructor() {
    this.name = '全局变量1';
    this.currentUser = window.localStorage.currenUser;
    // this.fetchCurrentUser();
  }
}

// ?
export const rootStoreContext = createContext<RootStore | null>(null);

const useRootStore = () => {
  const rootStore = useContext(rootStoreContext);
  if (rootStore === null) throw new Error('You forgot to use RootStore Provider!');
  return rootStore;
};

export default useRootStore;
