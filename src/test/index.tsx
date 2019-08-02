import Store from '../index';
import React, { Fragment, useCallback } from 'react';
import ReactDOM from 'react-dom';
import useUserInfo from './your-public-store/use-user-info';

function UserPanel () {
  const { userInfo } = useUserInfo();
  console.log('exec UserPanel.');
  return (
    <Fragment>
      <div>Name: {userInfo.name}</div>
      <div>Age: {userInfo.age}</div>
    </Fragment>
  )
}

function ActionButton () {
  const { setUserInfo } = useUserInfo();
  console.log('exec ActionButton.');
  const change = useCallback(() => setUserInfo({ name: 'Ben', age: 22}), []);
  return (
    <div>
      <button onClick={change}>Change</button>
    </div>
  )
}

function WatchUserInfoComponent () {
  useUserInfo.observe();
  console.log('exec WatchUserInfoComponent.');
  return null;
}

ReactDOM.render(
  <Store>
    <UserPanel />
    <ActionButton />
    <WatchUserInfoComponent />
  </Store>,
  document.getElementById('app')
);
