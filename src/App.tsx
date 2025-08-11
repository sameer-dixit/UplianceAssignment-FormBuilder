// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import PreviewForm from './pages/PreviewForm';
import SavedForms from './pages/SavedForms';

export default function App() {
  return (
    <Routes>
      <Route path="/create" element={<CreateForm />} />
      <Route path="/preview" element={<PreviewForm />} />
      <Route path="/myforms" element={<SavedForms />} />
      <Route path="/myforms/:id" element={<PreviewForm />} />
    </Routes>
  );
}
