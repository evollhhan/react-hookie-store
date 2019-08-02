export = Store;

interface Store {
  (props: { children: any }): JSX.Element;
  use: <T>(useModule: T) => T & {
    observe: () => void;
  }
}