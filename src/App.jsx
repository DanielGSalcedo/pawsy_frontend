import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PetEdit from './components/pet-edit/PetEdit'; // Asegúrate que el path sea correcto
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PetEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;