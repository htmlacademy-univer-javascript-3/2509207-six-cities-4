import React from 'react';
import { Link } from 'react-router-dom';


export default function NotFound(): JSX.Element {
  return (
    <React.Fragment>
      <h1>404 error</h1>
      <Link to='/' >To home page</Link>
    </React.Fragment>
  );
}

