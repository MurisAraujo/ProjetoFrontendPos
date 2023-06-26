import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
    return(
        <div className='container'>
            <h1 className='text-center fw-bold text-decoration-underline'>
                Sistema de estoques
            </h1>
            <div className="d-flex flex-wrap justify-content-center ps-5 pe-5 mt-5">
                
                <Link to="/produtos" className='w-40 me-2 text-light'>
                    <button className='w-100 btn btn-success'> 
                        Produtos 
                    </button>
                </Link>

                <Link to="/estoques" className='w-40 me-2 text-light'>
                    <button className='w-100 btn btn-success'> 
                        Estoques 
                    </button>
                </Link>

                <Link to="/relatorios" className='w-90 mt-3 '>
                    <button className='w-100 btn btn-info text-light'> 
                        Relatórios 
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Inicio;