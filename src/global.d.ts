import * as H from 'history';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module 'react-router-dom' {
  export function Link<S = H.LocationState>(
    ...params: Parameters<Link<S>>
  ): JSX.Element;
}
