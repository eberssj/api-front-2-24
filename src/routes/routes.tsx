import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import '../App.css';
import { Sidebar } from '../components/Sidebar';
import CadastrarProjeto from '../pages/CadastrarProjeto';
import Projetos from '../pages/Projetos';
import Adm from '../pages/Adm';
import Login from "../pages/login";
import PageNotFounded from "../pages/PageNotFounded";
import { PrivateRoutes } from "./privateRoutes";

function AppContent() {
  const location = useLocation(); // Hook para acessar a rota atual

  const isLoginPage = location.pathname === "/login"; // Verifica se a rota atual é "/login"

  return (
    <div className={!isLoginPage ? "app-root" : ""}> {/* Remove o ID root se for a página de login */}
      {!isLoginPage && ( 
        <div>
          <Sidebar />
        </div>
      )}
      {!isLoginPage ? (  // Condicional para adicionar "main-content" em todas, exceto na página de login
        <div className="main-content">
          <Routes>
            <Route path="/adm" element={
              <PrivateRoutes tiposAllowed={[1]}>
                <Adm />
              </PrivateRoutes>
            }/>
            <Route path="*" element={<PageNotFounded />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar-projeto" element={<CadastrarProjeto />} />
            <Route path="/" element={<Projetos />} />
          </Routes>
        </div>
      ) : ( // Renderiza as rotas sem "main-content" para a página de login
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent /> {/* Renderiza o conteúdo do aplicativo dentro do Router */}
    </Router>
  );
}
