# React State

> A simple way to make your custom hook to a public state.

## Usage

### step 1

wrap your app with Store.

```typescript
import Store from './store.ts';

ReactDOM.render( <Store> <App /> </Store>, document.getElementById('app'));
```

### step 2

use Store when exporting your custom hook.

```typescript
import Store from './store.ts';

function UserInfo () {
  const [userinfo, update] = useState({ name: 'Alice' });
  return {
    userinfo,
    update
  };
}
// use here.
export default Store.use(UserInfo);
```

### Everything is Done!

### example

Just use your custom hook in normal way. Only one state instance will be created when it is used in two different components.

```typescript
// A.tsx
function Userpanel () {
  const { userinfo } = useUserInfo();
  return (
    <div>{userinfo.name}</div>
  }
}

// B.tsx
function Avatar () {
  const { userinfo } = useUserInfo();
  return (
    <div>{userinfo.name}</div>
  }
}
```

### other features

1. If your component only use its exported function, your component will not be rendered when the state changes.
```typescript
// A.tsx
// Only use the update method. Because the component doesn't watch the change of userinfo state, it should not be re-rendered when state state changes.
function Userpanel () {
  const { update } = useUserInfo();
  useEffect(() => update({ name: 'Ben' }))
  return (
    <div>Hello World</div>
  }
}

// B.tsx
// Use the userinfo state. Component will re-render when the state changes.
function Avatar () {
  const { userinfo } = useUserInfo();
  return (
    <div>{userinfo.name}</div>
  }
}
```

2. If your component does not need any state or method of the custom hook, it just want to be re-rendered when the state is changed. Just observe it.
```typescript
// C.tsx
// Component will re-render when the userinfo state changes.
function SomebodyWillTakeCareOfMe () {
  useUserInfo.observe();
  return (
    <div>Yeah！</div>
  }
}
```
