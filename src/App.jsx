// App.jsx or index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import ResultsScreen from './components/ResultsScreen';
import SearchScreen from './components/SearchScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/search" element={<SearchScreen />} />
      </Routes>
    </Router>
  );
};

export default App;