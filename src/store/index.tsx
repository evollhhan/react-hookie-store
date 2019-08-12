import React, { createContext, useContext } from 'react';

interface IProviderProps {
  index: number;
  children: any;
}

/**
 * Store Provider
 */
const Providers: Array<(props: IProviderProps) => JSX.Element> = [];

/**
 * Context Provider Iterator
 */
function NextProvider ({ index, children }: IProviderProps) {
  if (index < Providers.length) {
    const Pvd = Providers[index];
    return (
      <Pvd index={index}>
        <NextProvider index={index + 1}>{ children }</NextProvider>
      </Pvd>
    )
  } else {
    return children
  }
}

/**
 * Store
 */
export default function Store (props: { children: any }) {
  if (!props.children) {
    throw new Error(`Store has no children. You can wrap your app under Store:
    <Store>
      <App />
    </Store>
    `);
  }
  return (
    <NextProvider index={0}>{ props.children }</NextProvider>
  )
}

/**
 * use custom hook as a state module
 */
Store.use = function<T>(useModule: T) {
  const context = createContext(null);
  const getters = Object.create(null);
  // make provider
  const provider = (props: any) => {
    const store = (useModule as any)();
    // make getter
    Object.keys(store).forEach(k => {
      const child = store[k];
      if (typeof child === 'function') {
        getters[k] = child;
      } else if (!getters._init) {
        Object.defineProperty(getters, k, {
          get () {
            return getters._exporter
              ? getters._exporter()[k]
              : null
          }
        })
      }
    })
    getters._init = true;
    return (
      <context.Provider value={{...store}}>{ props.children }</context.Provider>
    )
  }
  Providers.push(provider);

  // make module
  const exporter: any = () => useContext(context);
  getters._exporter = exporter;

  const ExportFunction = () => {
    return getters;
  }

  ExportFunction.observe = () => {
    exporter();
  }

  return ExportFunction as unknown as (T & {
    observe: () => void;
  });
}
