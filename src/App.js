import React from 'react';

import {BrowserRouter , Switch, Route} from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import SearchComponent from './components/SearchComponent';

function App() {
  return (
    <BrowserRouter> 
      <Switch> 
          <Route path="/" exact component={LoginComponent} />
          <Route path="/search_page/:username" component={SearchComponent} />
          <Route path="/logout" exact component={LoginComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
