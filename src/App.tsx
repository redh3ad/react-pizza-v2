import React, { lazy, Suspense } from 'react';
import Loadable from 'react-loadable';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

// const Cart = lazy(() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'));

const Cart = Loadable({
  loader: () => import('./pages/Cart'),
  loading: () => <div>Загрузка корзины...</div>,
});

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/pizza/:id' element={<FullPizza />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
