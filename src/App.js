import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes6 from './Routes';

function App() {
  return (
    <>
      <React.Suspense fallback={null}>
        <Router basename='/'>
          <Routes6 />
        </Router>
      </React.Suspense>
    </>
  );
}

export default App;
