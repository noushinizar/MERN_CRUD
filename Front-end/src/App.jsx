import React from 'react';
import Home from './Pages/Home';
import View from './Pages/View';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Router>
    </>
  );
}
