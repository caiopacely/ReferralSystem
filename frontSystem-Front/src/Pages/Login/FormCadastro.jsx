import api from "../../Services/api";
import "../Login/FormCadastro.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function FormCadastro() {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const codigoRef = new URLSearchParams(window.location.search).get("ref");
  const navigate = useNavigate();

  // Estados
  const [email, setEmail] = useState("");
  const [emailValido, setEmailValido] = useState(false);

  const [senha, setSenha] = useState("");
  const [validacoes, setValidacoes] = useState({
    comprimento: false,
    numeros: false,
    letras: false,
  });

  const [showModalSucesso, setShowModalSucesso] = useState(false);
  const [showModalEmailExite, setShowModalEmailExite] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const [erroNavegacao, setErroNavegacao] = useState(""); // 🔑 mensagem de erro caso usuário não seja encontrado

  // -----------------------------
  // Funções de API
  // -----------------------------

  const getUsers = async () => {
    const response = await fetch("http://localhost:3000/usuarios");
    const data = await response.json();
    setUsers(data);
    return data; // retorna os dados também
  };

  useEffect(() => {
    getUsers();
  }, []);

  async function addPoint(id, pontosAtt) {
    await api.put(`/usuarios/${id}`, {
      pontos: pontosAtt,
    });
  }

  async function postUsers() {
    
    // Validações
    if (emailValido) {
      users.find((user) => user.email === email)
        ? setShowModalEmailExite(true)
        : setShowModalEmailExite(false);
    }

    if (!validacoes.comprimento || !validacoes.numeros || !validacoes.letras || !emailValido || inputName.current.value == "") {
      setShowModalError(true);
      return;
    }
    else{
      if(validarEmail && validarSenha && inputName.current.value!=""){
      await api.post("/usuarios", {
      email: email,
      name: inputName.current.value,
      senha: senha,
      });

      // Pontos de referência
    if (codigoRef) {
      const usuarioReferenciador = users.find(
        (user) => user.codigoRef === codigoRef
      );

      if (usuarioReferenciador) {
        addPoint(usuarioReferenciador.id, usuarioReferenciador.pontos + 10);
      }
    }

    // Exibir modal de sucesso
    setShowModalSucesso(true);
    }
  }

    
}
    
    

  // -----------------------------
  // Validações
  // -----------------------------
  const validarSenha = (valor) => {
    setSenha(valor);
    setValidacoes({
      comprimento: valor.length >= 8,
      numeros: /\d/.test(valor),
      letras: /[a-zA-Z]/.test(valor),
    });
  };

  const validarEmail = (valor) => {
    setEmail(valor);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    setEmailValido(regex.test(valor));
  };

  const fecharModal = () => {
    setShowModalEmailExite(false);
    setShowModalError(false);
  };

  const fecharModalSucesso = async () => {
    setShowModalSucesso(false);

    try {
      const usersAtualizados = await getUsers();
      const usuario = usersAtualizados.find((user) => user.email === email);

      if (usuario) {
        navigate("/referral-profile", { state: { usuario } });
      } else {
        setErroNavegacao("Não foi possível localizar seu usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErroNavegacao("Erro inesperado ao buscar dados. Tente novamente.");
    }
  };

  return (
    <div id="conteiner">
      <div id="baseForm">
        <div id="form">
          <div id="textSingUp">
            <h1>Sign Up</h1>
          </div>

          {/* Nome */}
          <div id="textContainer">
            <p>Nome*</p>
            <input id="inputName" type="text" ref={inputName} />
          </div>

          {/* Email */}
          <div id="textContainerEmail">
            <p>Email*</p>
            <input
              type="email"
              value={email}
              onChange={(e) => validarEmail(e.target.value)}
              className={
                email === "" ? "" : emailValido ? "inputValido" : "inputInvalido"
              }
              placeholder="exemplo@dominio.com"
            />
            <div id="validEmail">
              {email !== "" && (
                <div id="formatEmail">
                  <i
                    className={`fa-solid ${
                      emailValido ? "fa-check" : "fa-xmark"
                    }`}
                  ></i>
                  <span id="spanEmailValide">
                    {emailValido
                      ? "E-mail válido"
                      : "Digite um e-mail no formato correto"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Senha */}
          <div id="textContainer">
            <p>Senha*</p>
            <input
              id="inputSenha"
              type="password"
              value={senha}
              onChange={(e) => validarSenha(e.target.value)}
            />
            <div>
              <p>Sua senha deve ter:</p>
              <div id="formatPassword">
                <i
                  className={`fa-solid ${
                    validacoes.comprimento ? "fa-check" : "fa-xmark"
                  }`}
                ></i>
                <p>8 caracteres</p>
              </div>
              <div id="formatPassword">
                <i
                  className={`fa-solid ${
                    validacoes.numeros ? "fa-check" : "fa-xmark"
                  }`}
                ></i>
                <p>Números</p>
              </div>
              <div id="formatPassword">
                <i
                  className={`fa-solid ${
                    validacoes.letras ? "fa-check" : "fa-xmark"
                  }`}
                ></i>
                <p>Letras</p>
              </div>
            </div>
          </div>

          {/* Botão */}
          <button id="btnSingUp" onClick={postUsers}>
            Sign Up
          </button>

          <p id="redirectSignUp">
            Já tem uma conta? <a href="/">Sign In</a>
          </p>
        </div>
      </div>

      {/* MODAL DE SUCESSO */}
      {showModalSucesso && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Conta criada com sucesso!</h2>
            <p>Seja bem-vindo(a) à nossa plataforma.</p>
            {erroNavegacao && <p className="erro-navegacao">{erroNavegacao}</p>}
            <button onClick={fecharModalSucesso}>Ir para o Perfil</button>
          </div>
        </div>
      )}

      {showModalEmailExite && (
        <div className="modal-overlayEmail" onClick={fecharModal}>
          <div
            className="modal-contentEmail"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>O email já está cadastrado!</h2>
            <button onClick={fecharModal}>X</button>
          </div>
        </div>
      )}

      {showModalError && (
        <div className="modal-overlayError" onClick={fecharModal}>
          <div
            className="modal-contentError"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Preencha os campos corretamente</h2>
            <button onClick={fecharModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormCadastro;
