import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";


const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtoEdit, setProdutoEdit] = useState({});

    const [newNome, setNewNome] = useState('');
    const [newPonto, setNewPonto] = useState(0);
    const [newPreco, setNewPreco] = useState(0);

    async function getProduto(){
        try{
            await api.get('produtos').then( response => {
                setProdutos(response.data);
            })
        }catch (error){
            alert('Erro ao consultar produtos.')
        }
    }

    async function addProduto(){
        console.log(newNome.length)
        if(newNome.length == 0 || newPonto == 0, newPreco == 0){
            document.querySelector('#alert-box').style.display = 'block';
        }else{
            try{
                await api.post('produtos',{
                    "idProduto":0,
                    "nome": newNome,
                    "pontoReposicao": parseInt(newPonto),
                    "precoMedio": parseInt(newPreco)
                }).then(
                    setTimeout(() => {
                        getProduto()
                    }, 1500),
                    setNewNome(''),
                    setNewPonto(''),
                    setNewPreco(''),
                    document.querySelector('#clode-modal2').click(),
                    document.querySelector('#alert-box').style.display = 'none'
                )
            }catch(error){
                alert(error)
            }
        }
    }

    async function getUmProduto(id){
        try{
            await api.get(`produtos/${id}`).then( response => {
                setProdutoEdit(response.data);
                setNewNome(response.data.nome);
                setNewPonto(response.data.pontoReposicao);
                setNewPreco(response.data.precoMedio);
            })
        }catch (error){
            alert('Erro ao consultar produtos.')
        } 
    }

    async function editProduto(id){
        try{
            await api.put(`produtos`,{
                "idProduto": parseInt(id),
                "nome": newNome,
                "pontoReposicao": parseInt(newPonto),
                "precoMedio": parseInt(newPreco)
            }).then(
                setTimeout(() => {
                    getProduto()
                }, 1500),
                document.querySelector('#clode-modal2').click(),
                setNewNome(''),
                setNewPonto(''),
                setNewPreco('')
            )
        }catch (error){
            alert('Erro ao consultar produtos.')
        } 
    }

    async function removeProduto(id){
        try{
            await api.delete(`produtos/${id}`,{
                header: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                }
            }).then(
                document.querySelector(`#prod-${id}`).remove()
            )
        }catch (error){
            alert('Erro ao deletar produto, tente novamente.')
        }
    }

    useEffect(() => {
        getProduto()
    }, []);
  return (
    <>
      <Navbar page={"produto"} />
      <div className="container mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Ponto de Reposição</th>
              <th scope="col">Preço Médio</th>
              <th scope="col">Editar</th>
              <th scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map( (produto) => 
                <tr id={'prod-'+produto.idProduto} key={produto.idProduto}>
                    <th scope="row"> {produto.idProduto}</th>
                    <td>{produto.nome}</td>
                    <td>{produto.pontoReposicao}</td>
                    <td>{produto.precoMedio}</td>
                    <td><button id="edit-btn" type="button" onClick={() => { getUmProduto(produto.idProduto) }} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">Editar</button></td>
                    <td><button id="remove-btn" onClick={() => { removeProduto(produto.idProduto) }} className="btn btn-danger">Excluir</button></td>
                </tr>
            )}
          </tbody>
        </table>

        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" className="btn btn-success">Novo Produto</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Produto</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nome</span>
                        <input type="text" value={newNome} className="form-control" placeholder="Username" onChange = {e => setNewNome(e.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Ponto de Reposição</span>
                        <input type="text" value={newPonto} className="form-control" placeholder="Username" onChange = {e => setNewPonto(e.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Preço Médio</span>
                        <input type="text" value={newPreco} className="form-control" placeholder="Username" onChange = {e => setNewPreco(e.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" id="clode-modal" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={() => { editProduto(produtoEdit.idProduto) }}>Editar</button>
                </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel2">Adicionar Produto</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="alert alert-danger" role="alert" id="alert-box">
                        Preencha todos os campos
                    </div>
                    <form action="">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Nome</span>
                            <input type="text" className="form-control" placeholder="Nome" onChange = {e => setNewNome(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Ponto de Reposição</span>
                            <input type="text" className="form-control" placeholder="Ponto de Reposição"  onChange = {e => setNewPonto(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Preço Médio</span>
                            <input type="text" className="form-control" placeholder="Preço Médio" onChange = {e => setNewPreco(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" required/>
                        </div>
                    </form>

                </div>
                <div className="modal-footer">
                    <button type="button" id="clode-modal2" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button className="btn btn-primary" type="button" onClick={() => { addProduto() }}>Adicionar</button>
                </div>
                </div>
            </div>
        </div>

      </div>
    </>
  );
};

export default Produtos;
