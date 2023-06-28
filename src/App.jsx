import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Produtos from './pages/produtos';
import EstoquesMovimentação from './pages/estoques';
import EstoqueGeral from './pages/estoqueGeral';
import EstoqueDeposito from './pages/estoqueDeposito';
import ReposicaoDeposito from './pages/reposicaoDeposito';
import CompraProduto from './pages/compraProdutos';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Produtos/>}/>
      <Route path='/estoques' element={<EstoquesMovimentação/>}/>
      <Route path='/estoque-geral' element={<EstoqueGeral/>}/>
      <Route path='/estoque-deposito' element={<EstoqueDeposito/>}/>
      <Route path='/reposicao-deposito' element={<ReposicaoDeposito/>}/>
      <Route path='/compra-produto' element={<CompraProduto/>}/>
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
