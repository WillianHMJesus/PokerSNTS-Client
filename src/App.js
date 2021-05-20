import React from 'react';
import Header from './components/header';
import Route from './route'

const App = () => (
  <div className="App">
    <Header />
    <div className="container">
      <Route />
    </div>
  </div>
);

export default App;
