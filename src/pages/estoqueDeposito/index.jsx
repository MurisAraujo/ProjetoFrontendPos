import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const EstoqueDeposito = () => {

    const [produtos, setProdutos] = useState([]);

    async function getEstoque(){
        try{
            await api.get('relatorios/estoque_deposito').then( response => {
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
            <Navbar page={"estoqueDeposito"}/>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Deposito</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Ponto de Reposição</th>
                        <th scope="col">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map( (produto) => 
                            <tr key={1} >
                                <td>{produto.nomeDeposito}</td>
                                <td>{produto.nomeProduto}</td>
                                <td>{produto.pontoReposicaoDeposito}</td>
                                <td>{produto.quantidadeProdutoEstoque}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EstoqueDeposito;