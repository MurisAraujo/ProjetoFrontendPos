import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const EstoquesMovimentação = () => {
    const [produtos, setProdutos] = useState([]);

    const [deposito, setDeposito] = useState(0);
    const [selectProd, setSelectProd] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [valor, setValor] = useState(0);
    const [tipoM, setTipoM] = useState('');
    const [numFiscal, setNumFiscal] = useState('');

    async function getProduto(){
        try{
            await api.get('produtos').then( response => {
                setProdutos(response.data);
            })
        }catch (error){
            alert('Erro ao consultar produtos.')
        }
    }

    async function movimentaEstoque(){
        console.log(deposito, selectProd, quantidade, valor, tipoM)
        if(deposito == 0 || selectProd == 0 || quantidade == 0 || valor == 0 || tipoM.length == 0 || numFiscal == 0){
            document.querySelector('#alert-box').style.display = 'block';
            document.querySelector('#sc-alert').style.display = 'none';
        }else{
            await api.post('estoque',{
                "identificadorDeposito": parseInt(deposito),
                "identificadorProduto": parseInt(selectProd),
                "quantidade": parseInt(quantidade),
                "tipoMovimentacaoEstoque": tipoM,
                "numeroNotaFiscal": parseInt(numFiscal),
                "valor": parseInt(valor)
            }).then(
                document.querySelector('#alert-box').style.display = 'none',
                document.querySelector('#sc-alert').style.display = 'block'
            )
        }
    }

    useEffect(() => {
        getProduto()
    }, []);

  return (
    <>
      <Navbar page={"estoque"} />
      <div className="container mt-5">
        <div className="alert alert-success" id="sc-alert" role="alert">
            Movimentação realizada com sucesso
        </div>
        <div className="alert alert-danger" id="alert-box" role="alert">
           Preencha todos os campos com {"'*'"}, ou preencha os campos corretamente
        </div>

        <form>
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">
                        Depósito *
                        </label>
                        <select className="form-select" id="inputGroupSelect01" onChange={e => {setDeposito(e.target.value)}}>
                            <option value={0} selected>Escolha um Depósito...</option>
                            <option value="1">Deposito A</option>
                            <option value="2">Deposito B</option>
                            <option value="3">Deposito C</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">
                        Produto *
                        </label>
                        <select className="form-select" id="inputGroupSelect01" onChange={e => {setSelectProd(e.target.value)}}>
                            <option value={0} selected>Escolha um Produto...</option>
                            {produtos.map( (produto) => 
                                <option key={produto.idProduto} value={produto.idProduto}>{produto.nome}</option>
                            )}

                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Quantidade *</span>
                        <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={e => {setQuantidade(e.target.value)}}/>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Valor *</span>
                        <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={e => {setValor(e.target.value)}}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Tipo de Movimentação *</span>
                        <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={e => {setTipoM(e.target.value)}}/>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Numero Nota Fiscal*</span>
                        <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={e => {setNumFiscal(e.target.value)}}/>
                    </div>
                </div>
            </div>
          <button type="button" onClick={() => {movimentaEstoque()}} className="btn btn-primary">
            Movimentar
          </button>
        </form>
      </div>
    </>
  );
};

export default EstoquesMovimentação;