import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

// Páginas
import FormCadastro from './Pages/Login/FormCadastro'
import FormLogin from './Pages/Login/FormLogin'
import ReferralProfile from './Pages/ReferralProfile/ReferralProfile'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota de Login (raiz) */}
        <Route path="/" element={<FormLogin />} />

        {/* Rota de Cadastro */}
        <Route path="/cadastro" element={<FormCadastro />} />

        {/* Rota de Perfil de Referência */}
        <Route path="/referral-profile" element={<ReferralProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
