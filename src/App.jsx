import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PetProfile from './components/pet-profile/PetProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PetProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;