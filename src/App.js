import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './Routes';

function App() {
  return (
    <>
      <React.Suspense fallback={null}>
        <Router basename='/'>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Router>
      </React.Suspense>
    </>
  );
}

export default App;
