import { useLocation } from 'react-router-dom'
import '../ReferralProfile/ReferralProfile.css'
import api from '../../Services/api'
import {useEffect, useState} from 'react'

function ReferralProfile() {
  const [users,setUsers] = useState([])
  const location = useLocation()
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        const usersFromApi = await api.get('/usuarios')
        setUsers(usersFromApi.data)
      } catch (err) {
        console.error('Erro ao buscar usuários:', err)
      }
    }

    getUsers()
  }, [])

  const userId = location.state?.usuario?.id
  const usuario = users.find(user => user.id === userId)
  const baseUrl = window.location.origin
  
  const referralLink = usuario
    ? `${baseUrl}/cadastro?ref=${usuario.codigoRef}`
    : ''

  if (!usuario) {
    return <p>Carregando perfil...</p>
  }
  
  const copyLink = () => {
  navigator.clipboard.writeText(referralLink)
    .then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Volta para "Copy Link" após 2 segundos
    })
    .catch(err => {
      console.error('Erro ao copiar:', err);
    });
  };

   const fecharModal = () => {
    setShowModalError(false);
  };

  return (
    <>
        <div id='conteinerProfile'>
          <div id='baseProfile'>
            <header id='header'>
                <p>Referal System</p>
                <div id='userHeader'>
                    <i class="fa-solid fa-user"></i>
                </div>              
            </header>
            <div id='infoUser'>
                <div>
                    <h1>Profile</h1>
                </div>
                <div id='containerPoints'>
                    <h2>Hello, {usuario.name}</h2>
                    <div id='infoPoints'>
                      <p>Your Points</p>
                      <div id='points'>
                        <p>{usuario.pontos}</p>
                      </div>
                    </div>
                    
                </div>
                <div id="cardLink">
                  <p id="ReferralLink">Your Referral Link</p>
                  <div>
                    <p id="textReferralLink">{referralLink}</p>
                  </div>
                  <div id="containerBtn">
                    <button id="btnLink" onClick={copyLink}>
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ReferralProfile
