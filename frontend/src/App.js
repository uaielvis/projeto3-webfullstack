import React, { useState } from 'react';
import Login from './components/Login';
import Search from './components/Search';
import Insert from './components/Insert';

require('dotenv').config();

function App() {
  const [isAuth, setAuth] = useState(false);

  return (
    <div className="App">
      {isAuth ? (
        <>
          <Search />
          <Insert />
        </>
      ) : (
        <Login setAuth={setAuth} />
      )}
    </div>
  );
}

export default App;

