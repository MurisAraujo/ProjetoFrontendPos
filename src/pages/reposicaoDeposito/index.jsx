import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const ReposicaoDeposito = () => {

    const [produtos, setProdutos] = useState([]);

    async function getEstoque(){
        try{
            await api.get('relatorios/ponto_reposicao_deposito').then( response => {
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
            <Navbar page={"reposicaoDeposito"}/>
            <div className="container">
            <h1 className="mt-5 mb-4">Depositos que precisam de reposição/tranferencia</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Deposito</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Ponto de Reposição</th>
                        <th scope="col">Quantidade no Deposito</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map( (produto) => 
                            <tr key={1} >
                                <td>{produto.nomeDeposito}</td>
                                <td>{produto.nomeProduto}</td>
                                <td>{produto.pontoReposicaoDeposito}</td>
                                <td>{produto.totalDeposito}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ReposicaoDeposito;