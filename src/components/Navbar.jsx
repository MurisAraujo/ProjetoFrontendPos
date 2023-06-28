import { Link } from 'react-router-dom';

const Navbar = (page) => {
    return(
        <>
            <div className="container-fluid">
                <ul className="nav nav-underline bg-primary pt-1 pb-1 pe-5 ps-5">
                    <li className='nav-item'>
                        {page.page == 'produto' 
                            ? <Link className='nav-link active text-light' to="/">Produtos</Link>
                            : <Link className='nav-link text-light' to="/">Produtos</Link>
                        } 
                    </li>
                    <li className='nav-item'>
                        {page.page == 'estoque' 
                            ? <Link className='nav-link active text-light' to="/estoques">Entrada/Saida de Estoque</Link>
                            : <Link className='nav-link text-light' to="/estoques">Entrada/Saida de Estoque</Link>
                        } 
                    </li>

                    <li className='nav-item'>
                        {page.page == 'estoqueGeral' 
                            ? <Link className='nav-link active text-light' to="/estoque-geral">Estoque Geral</Link>
                            : <Link className='nav-link text-light' to="/estoque-geral">Estoque Geral</Link>
                        } 
                    </li>

                    <li className='nav-item'>
                        {page.page == 'estoqueDeposito' 
                            ? <Link className='nav-link active text-light' to="/estoque-deposito">Estoque deposito</Link>
                            : <Link className='nav-link text-light' to="/estoque-deposito">Estoque deposito</Link>
                        } 
                    </li>

                    <li className='nav-item'>
                        {page.page == 'reposicaoDeposito' 
                            ? <Link className='nav-link active text-light' to="/reposicao-deposito">Reposição Deposito</Link>
                            : <Link className='nav-link text-light' to="/reposicao-deposito">Reposição Deposito</Link>
                        } 
                    </li>

                    <li className='nav-item'>
                        {page.page == 'compraProduto' 
                            ? <Link className='nav-link active text-light' to="/compra-produto">Reposição de Produtos</Link>
                            : <Link className='nav-link text-light' to="/compra-produto">Reposição de Produtos</Link>
                        } 
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar;