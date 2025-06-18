import 'react-router-dom';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'react-router-dom' {
  import * as H from 'history';

  export function Link<S = H.LocationState>(
    ...params: Parameters<Link<S>>
  ): JSX.Element;
}
