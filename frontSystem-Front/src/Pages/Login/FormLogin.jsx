import api from '../../Services/api'
import '../Login/FormLogin.css'
import {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

function FormLogin() {
  
    const [users,setUsers] = useState([])
    const inputemail = useRef()
    const inputSenha = useRef()
    const navigate = useNavigate() 
    const [showModalError, setShowModalError] = useState(false);

    async function getUsers(){
        const usersFromApi = await api.get('/usuarios')
        setUsers(usersFromApi.data)
        console.log(users)
    }

    useEffect(() => {
        getUsers()
    }, [])

    async function verificarConta() {
        try {
            const response = await api.post("/login", {
            email: inputemail.current.value,
            senha: inputSenha.current.value
            });

            // Login bem-sucedido!
            const usuario = response.data.user;
            navigate('/referral-profile', { state: { usuario } });
            
        } catch (error) {
            // Email ou senha inválidos
            setShowModalError(true);
        }
    }

    const fecharModal = () => {
    setShowModalError(false);
    };

    return (
        <>
        <div id='conteinerLg'>
            <div id='baseFormLg'>
                <div id='formLg'>
                <div id='textSingUpLg'>
                    <h1>Sing In</h1>  
                </div>
                <div id='textContainerLg'>
                    <p id='textEmailLg'>Email*</p>
                    <input id='inputEmailLg' type="email" ref={inputemail} />
                </div>
                <div id='textContainerLg'>
                    <p id='textSenhaLg'>Senha*</p>
                    <input id='inputSenhaLg' type="password" ref={inputSenha}/>
                </div>
                
                    <button id='btnSingUpLg' onClick={verificarConta}>Sign In</button>
                    <p id='redirectSignInLg'>Não tem conta? <a href="/cadastro">Sing Up</a></p>
                </div>
                
            </div>
            {showModalError && (
                <div className="modal-overlayError" onClick={fecharModal}>
                <div
                    className="modal-contentError"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>Email ou senha incorretos</h2>
                    <button onClick={fecharModal}>X</button>
                </div>
                </div>
            )}
        </div>
        </>
    )
}

export default FormLogin
