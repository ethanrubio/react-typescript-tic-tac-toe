import * as React from "react";

interface IHelloProps { compiler: string; framework: string; }

const Hello: React.StatelessComponent<IHelloProps> = ({compiler, framework}) => (
  <h1>Hello from {compiler} and {framework}!</h1>
);

Hello.propTypes = {
  compiler: React.PropTypes.string.isRequired,
  framework: React.PropTypes.string.isRequired,
};

export default Hello;
