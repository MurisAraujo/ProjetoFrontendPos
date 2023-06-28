import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const CompraProduto = () => {

    const [produtos, setProdutos] = useState([]);
    const [produtosCompra, setProdutosCompra] = useState([]);

    async function getEstoque(){
        try{
            await api.get('relatorios/ponto_reposicao_geral').then( response => {
                setProdutos(response.data);
            })
        }catch (error){
            alert('Erro ao consultar produtos.')
        }
    }

    async function getFornecedores(){
        try{
            await api.get('relatorios/ponto_reposicao_fornecedores_compra').then( response => {
                setProdutosCompra(response.data);
            })
        }catch (error){
            alert('Erro ao consultar produtos.')
        }
    }

    useEffect(() => {
        getEstoque();
        getFornecedores();
    }, []);
    return(
        <>
            <Navbar page={"compraProduto"}/>
            <div className="container">
                <h1 className="mt-5 mb-4">Produtos em Falta</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Ponto de Reposição Geral</th>
                        <th scope="col">Quantidade Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map( (produto) => 
                            <tr key={1} >
                                <td>{produto.nomeProduto}</td>
                                <td>{produto.pontoReposicaoProduto}</td>
                                <td>{produto.totalGeral}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <h1 className="mt-5 mb-4">Fornecedores</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Fornecedor</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Quantidade Atual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosCompra.map( (produto) => 
                            <tr key={1} >
                                <td>{produto.nomeFornecedor}</td>
                                <td>{produto.nomeProduto}</td>
                                <td>{produto.quantidadeTotalEstoque}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CompraProduto;