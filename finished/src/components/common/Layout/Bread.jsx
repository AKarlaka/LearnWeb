import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import styles from './Bread.less';
import { queryArray } from '../../../utils';

const Bread = ({ menu, location }) => {
  // 匹配当前路由
  const pathArray = [];
  let current;
  menu.map((item) => {
    if (item.route && pathToRegexp(item.route).exec(location.pathname)) {
      current = item;
    }
    return null;
  });

  const getPathArray = (item) => {
    pathArray.unshift(item);
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, 'id'));
    }
  };

  if (!current) {
    pathArray.push(menu[0] || {
      id: 1,
      icon: 'laptop',
      name: 'Dashboard',
    });
    pathArray.push({
      id: 404,
      name: 'Not Found',
    });
  } else {
    getPathArray(current);
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.icon
        ? <Icon type={item.icon} style={{ marginRight: 4 }} />
        : ''}{item.name}</span>
    );
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key)
          ? <Link to={item.route}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  );
};

Bread.propTypes = {
  menu: PropTypes.array,
  location: PropTypes.object,
};

export default Bread;
