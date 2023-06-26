import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Produtos from './pages/produtos';
import Relatorios from './pages/relatorios';
import EstoquesMovimentação from './pages/estoques';
import Transferencia from './pages/transferencia';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Produtos/>}/>
      <Route path='/estoques' element={<EstoquesMovimentação/>}/>
      <Route path='/relatorios' element={<Relatorios/>}/>
      <Route path='/transferencia' element={<Transferencia/>}/>
    </>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
