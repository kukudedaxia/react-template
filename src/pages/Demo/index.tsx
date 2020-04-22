const menu = {
  path: '/demo',
  name: '样例',
  icon: 'user',
  routes: [
    {
      path: '/demo/demo1',
      name: '样例1',
      component: require('./demo1'),
    },
    {
      path: '/demo/demo2',
      name: '样例2',
      component: require('./demo2'),
    },
  ],
};
export default menu;
