export = Store;

declare var Store: {
  (props: { children: any }): JSX.Element;
  use: <T>(useModule: T) => T & {
    observe: () => void;
  }
}