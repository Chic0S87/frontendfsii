import Pagina from "../templates/Pagina";
import FormPessoa from "../formularios/Pessoas";
import TabelaPessoas from "../tabelas/TabelaPessoa";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function TelaCadPessoa(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [pessoas, setPessoas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editPessoa, setEditPessoa] = useState({
    nome: " ",
    cpf: "",
    nascimento: "",
    endereco: "",
    cidade: "",
    telefone: "",
    tipo: "",
    profissao1: "",
    email: "",
  });

  function preparaTela(pessoa) {
    setModoEdicao(true);
    setEditPessoa(pessoa);
    setExibirTabela(false);
  }

  function excluirPessoa(pessoa) {
    fetch(urlBackend + "/pessoas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pessoa),
    }).then((resposta) => {
      window.alert("Pessoa excluída com sucesso!");
      
      return resposta.json();
    });
  }

  useEffect(() => {
    fetch(urlBackend + "/pessoas", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setPessoas(dados);
        } else {
        }
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant={"secondary"}>Cadastro de Pessoas</Alert>
        {exibirTabela ? (
          <TabelaPessoas
            listaPessoas={pessoas}
            setPessoas={setPessoas}
            exibirTabela={setExibirTabela}
            editar={preparaTela}
            excluir={excluirPessoa}
          />
        ) : (
          <FormPessoa
            listaPessoas={pessoas}
            setPessoas={setPessoas}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            editar={preparaTela}
            pessoa={editPessoa}
          />
        )}
      </Container>
    </Pagina>
  );
}
