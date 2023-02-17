import React, { lazy, Suspense } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

const Cart = lazy(() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'));

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route
          path='/cart'
          element={
            <Suspense fallback={<div>Загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route path='/pizza/:id' element={<FullPizza />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
