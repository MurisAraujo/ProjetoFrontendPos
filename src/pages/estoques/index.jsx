import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const EstoquesMovimentação = () => {
  const [produtos, setProdutos] = useState([]);
  const [deposito, setDeposito] = useState(0);
  const [selectProd, setSelectProd] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);
  const [tipoM, setTipoM] = useState("");
  const [numFiscal, setNumFiscal] = useState("");

  const [depositoOrigem, setDepositoOrigem] = useState(0);
  const [depositoDestino, setDepositoDestino] = useState(0);
  const [prodMovimentado, setProdMovimentado] = useState(0);
  const [quantidadeMovimentada, setQuantidadeMovimentada] = useState(0);

  const [movimentações, setMovimentações] = useState([]);

  async function getMovimentação() {
    try {
      await api
        .get("relatorios/movimentacao_estoque_geral")
        .then((response) => {
          setMovimentações(response.data);
        });
    } catch (error) {
      alert("Erro ao consultar produtos.");
    }
  }

  async function getProduto() {
    try {
      await api.get("produtos").then((response) => {
        setProdutos(response.data);
      });
    } catch (error) {
      alert("Erro ao consultar produtos.");
    }
  }

  async function movimentaDeposito() {
    if (
      depositoOrigem == 0 ||
      depositoDestino == 0 ||
      prodMovimentado == 0 ||
      quantidadeMovimentada == 0
    ) {
      document.querySelector("#alert-box").style.display = "block";
      document.querySelector("#sc-alert").style.display = "none";
    } else {
      await api
        .post("estoque/movimenta_estoque_deposito", {
          depositoOrigem: parseInt(depositoOrigem),
          depositoDestino: parseInt(depositoDestino),
          idProduto: parseInt(prodMovimentado),
          quantidade: parseInt(quantidadeMovimentada),
        })
        .then(
          (document.querySelector("#alert-box").style.display = "none"),
          (document.querySelector("#sc-alert").style.display = "block"),
          getMovimentação()
        );
    }
  }

  async function movimentaEstoque() {
    if (
      deposito == 0 ||
      selectProd == 0 ||
      quantidade == 0 ||
      valor == 0 ||
      tipoM.length == 0 ||
      numFiscal == 0
    ) {
      document.querySelector("#alert-box").style.display = "block";
      document.querySelector("#sc-alert").style.display = "none";
    } else {
      await api
        .post("estoque", {
          identificadorDeposito: parseInt(deposito),
          identificadorProduto: parseInt(selectProd),
          quantidade: parseInt(quantidade),
          tipoMovimentacaoEstoque: tipoM,
          numeroNotaFiscal: parseInt(numFiscal),
          valor: parseInt(valor),
        })
        .then(
          (document.querySelector("#alert-box").style.display = "none"),
          (document.querySelector("#sc-alert").style.display = "block"),
          getMovimentação()
        );
    }
  }

  useEffect(() => {
    getProduto();
  }, []);

  useEffect(() => {
    getMovimentação();
  }, [movimentações]);

  return (
    <>
      <Navbar page={"estoque"} />
      <div className="container mt-5">
        <div className="alert alert-success" id="sc-alert" role="alert">
          Operação realizada com sucesso
        </div>
        <div className="alert alert-danger" id="alert-box" role="alert">
          Preencha todos os campos com {"'*'"}, ou preencha os campos
          corretamente
        </div>

        <h1 className="mt-5 mb-4">Entrada e Saida de Estoque</h1>

        <form>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Depósito *
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  onChange={(e) => {
                    setDeposito(e.target.value);
                  }}
                >
                  <option value={0} selected>
                    Escolha um Depósito...
                  </option>
                  <option value="1">Deposito A</option>
                  <option value="2">Deposito B</option>
                  <option value="3">Deposito C</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Produto *
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  onChange={(e) => {
                    setSelectProd(e.target.value);
                  }}
                >
                  <option value={0} selected>
                    Escolha um Produto...
                  </option>
                  {produtos.map((produto) => (
                    <option key={produto.idProduto} value={produto.idProduto}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Quantidade *
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setQuantidade(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Valor *
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setValor(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Tipo de Movimentação *
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  onChange={(e) => {
                    setTipoM(e.target.value);
                  }}
                >
                  <option value={0} selected>
                    Tipo de movimentação...
                  </option>
                  <option value="Entrada por Nota Fiscal">
                    Entrada Por Nota Fiscal
                  </option>
                  <option value="Entrada por Doacao">Entrada Por Doacao</option>
                  <option value="Saida por Nota Fiscal">
                    Saida Por Nota Fiscal
                  </option>
                  <option value="Saida por Doacao">Saida Por Doacao</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Numero Nota Fiscal*
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setNumFiscal(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              movimentaEstoque();
            }}
            className="btn btn-primary"
          >
            Movimentar
          </button>
        </form>

        <h1 className="mt-5 mb-4">Tranferencia de Produto</h1>

        <form>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Depósito de Origem *
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  onChange={(e) => {
                    setDepositoOrigem(e.target.value);
                  }}
                >
                  <option value={0} selected>
                    Escolha um Depósito...
                  </option>
                  <option value="1">Deposito A</option>
                  <option value="2">Deposito B</option>
                  <option value="3">Deposito C</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Depósito de Destino*
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  onChange={(e) => {
                    setDepositoDestino(e.target.value);
                  }}
                >
                  <option value={0} selected>
                    Escolha um Depósito...
                  </option>
                  <option value="1">Deposito A</option>
                  <option value="2">Deposito B</option>
                  <option value="3">Deposito C</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Quantidade *
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setQuantidadeMovimentada(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col">
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Produto *
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  onChange={(e) => {
                    setProdMovimentado(e.target.value);
                  }}
                >
                  <option value={0} selected>
                    Escolha um Produto...
                  </option>
                  {produtos.map((produto) => (
                    <option key={produto.idProduto} value={produto.idProduto}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              movimentaDeposito();
            }}
            className="btn btn-primary"
          >
            Transferir
          </button>
        </form>

        <h1 className="mt-5 mb-4">Movimentações de Estoque</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Deposito</th>
              <th scope="col">Produto</th>
              <th scope="col">Quantidade Movimentada</th>
              <th scope="col">Tipo</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            {movimentações.map((movimentacao) => (
              <tr key={movimentacao.identificadorMovimentacao}>
                <td>{movimentacao.deposito}</td>
                <td>{movimentacao.nomeProduto}</td>
                <td>{movimentacao.quantidadeMovimentacaoEstoque}</td>
                <td>{movimentacao.tipoMovimentacaoEstoque}</td>
                <td>{movimentacao.dataMovimentacaoEstoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EstoquesMovimentação;
