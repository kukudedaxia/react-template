// @ts-nocheck
/* eslint-disable no-continue */
import React, { ComponentType, lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

export interface ProMenuType {
  /**
   * 页面组件，当拥有子路由时，子页面以children传入
   * 由于react-hot-loader的bug，暂时无法使用() => import()方式，只能使用require()
   */
  component?:
    | (() => Promise<{ default: React.ComponentType<RouteComponentProps> }>)
    | { default: React.ComponentType<RouteComponentProps> };
  /**
   * 菜单跳转路径，如果未设置routePath，则同时也为路由路径
   */
  path: string;
  /**
   * 路由路径，当路径包含变量时使用
   */
  routePath?: string;
  /**
   * 菜单项名称，同时影响页面标题和面包屑
   */
  name: string;
  /**
   * 菜单图表，ant design icon组件
   */
  icon?: string;
  /**
   * 子菜单
   */
  routes?: ProMenuType[];
  /**
   * 路径是否精确匹配
   */
  exact?: boolean;
  /**
   * 在菜单中隐藏该项
   */
  hideInMenu?: boolean;
  /**
   * 在面包屑中隐藏
   */
  hideInBreadcrumb?: boolean;
}

export type ProMenuExport = ProMenuType | ProMenuType[];

const menu: ProMenuType[] = [];

const context = require.context('../pages', true, /\.\/[^/]+\/index\.tsx?$/);
// 通过文件路径获取
context.keys().forEach(item => {
  try {
    const menuItem = context(item).default;
    if (item === './Home/index.tsx') menu.unshift(menuItem);
    else if (menuItem instanceof Array) {
      menu.push(...menuItem);
    } else {
      menu.push(menuItem);
    }
  } catch (error) {
    // f
    console.log(error);
  }
});

const processMenuItem = (menuItem: ProMenuType) => {
  let Component: ComponentType<RouteComponentProps> = ({ children }) => <>{children}</>;
  if (menuItem.component) {
    if ('default' in menuItem.component) {
      Component = menuItem.component.default;
    } else {
      Component = lazy(menuItem.component);
    }
  }
  const children = menuItem.routes ? (
    <Switch>
      {menuItem.routes.map(processMenuItem)}
      {/* ? */}
      <Redirect to={menuItem.routes[0].path} />
    </Switch>
  ) : (
    undefined
  );
  return (
    <Route
      path={menuItem.routePath || menuItem.path}
      key={menuItem.routePath || menuItem.path}
      render={props => (
        <Suspense fallback={null}>
          <Component {...props}>{children}</Component>
        </Suspense>
      )}
      exact={menuItem.exact}
    />
  );
};

export const Routes = hot(() => {
  return <Switch>{menu.map(processMenuItem)}</Switch>;
});

export default menu;
