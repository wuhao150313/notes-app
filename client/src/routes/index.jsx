import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Categories from '../pages/Categories';
import CategoryNotes from '../pages/CategoryNotes';
import Notes from '@/pages/Notes';
import Note from '@/pages/Note';
import CreateNote from '@/pages/CreateNote';
import EditNote from '@/pages/EditNote';
import DeleteNote from '@/pages/DeleteNote';
import Statistics from '@/pages/Statistics';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/notes/categories/:categoryId" element={<CategoryNotes />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/:id" element={<Note />} />
      <Route path="/notes/create" element={<CreateNote />} />
      <Route path="/notes/edit/:id" element={<EditNote />} />
      <Route path="/notes/delete" element={<DeleteNote />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
  );
};

export default AppRoutes;
