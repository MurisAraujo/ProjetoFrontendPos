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
                        {page.page == 'relatorio' 
                            ? <Link className='nav-link active text-light' to="/relatorios">Relatorios</Link>
                            : <Link className='nav-link text-light' to="/relatorios">Relatorios</Link>
                        } 
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar;