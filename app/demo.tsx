import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Demo } from './view/Demo';

document.onreadystatechange = () => {
  ReactDOM.render(
    <MuiThemeProvider>
      <Demo />
    </MuiThemeProvider>,
    document.getElementById('root')
  );
};
