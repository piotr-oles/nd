import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Demo } from './view/Demo';

document.onreadystatechange = () => {
  ReactDOM.render(
    <Demo />,
    document.getElementById('root')
  );
};
