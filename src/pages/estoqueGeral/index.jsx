import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const EstoqueGeral = () => {

    const [produtos, setProdutos] = useState([]);

    async function getEstoque(){
        try{
            await api.get('relatorios/estoque_geral').then( response => {
                setProdutos(response.data);
            })
        }catch (error){
            alert('Erro ao consultar produtos.')
        }
    }

    useEffect(() => {
        getEstoque()
    }, []);
    return(
        <>
            <Navbar page={"estoqueGeral"}/>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Quantidade Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map( (produto) => 
                            <tr key={1} >
                                <td>{produto.nomeProduto}</td>
                                <td>{produto.quantidadeProdutoDepositoGeral}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EstoqueGeral;