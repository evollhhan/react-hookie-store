import { useState } from 'react';
import Store from '../../store';

function useUserInfo() {
  const [userInfo, setUserInfo] = useState({ name: 'Alice', age: 12 });
  return {
    userInfo,
    setUserInfo
  }
}

export default Store.use(useUserInfo);