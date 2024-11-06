// AppRoutes.js
import { Route, BrowserRouter, Routes as Switch, useLocation } from 'react-router-dom';
import Adm from '../pages/Adm';
import PageNotFounded from '../pages/PageNotFounded';
import { PrivateRoutes } from './privateRoutes';
import Login from '../pages/login';
import CadastrarProjeto from '../pages/CadastrarProjeto';
import PortalTransparencia from '../pages/PortalTransparencia';
import InformacoesProjeto from '../pages/InformacoesProjeto';
import EditarProjeto from '../pages/EditarProjeto';
import Dashboard from '../pages/Dashboard';
import { Administradores } from '../pages/Administradores';
import GerenciarAdms from '../pages/GerenciarAdms';
import Footer from '../components/Footer/Footer';
import Notificacoes from '../pages/Notificacoes';
import CriacaoAdmin from '../pages/CriacaoAdmin';
import VerAdministrador from '../pages/VerAdministrador';
import { RedefinirSenha } from '../pages/RedefinirSenha';
import InformacoesProjetoPendente from '../pages/InformacoesProjetoPendente';

function Layout({ children }) {
  const location = useLocation();

  return (
    <>
      {children}
      {location.pathname !== "/login" && <Footer />}
    </>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route
            path="/adm/dashboard"
            element={
              <PrivateRoutes tiposAllowed={[1, 2]}>
                <Dashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path="/editarAdmin/:id"
            element={
              <PrivateRoutes tiposAllowed={[1]}>
                <CriacaoAdmin />
              </PrivateRoutes>
            }
          />
          <Route
            path="/adm/informacoes/:id"
            element={
              <PrivateRoutes tiposAllowed={[1]}>
                <VerAdministrador />
              </PrivateRoutes>
            }
          />
          <Route
            path="/adm/notificacoes"
            element={
              <PrivateRoutes tiposAllowed={[1, 2]}>
                <Notificacoes />
              </PrivateRoutes>
            }
          />
          <Route
            path="/adm"
            element={
              <PrivateRoutes tiposAllowed={[1, 2]}>
                <Adm />
              </PrivateRoutes>
            }
          />
          <Route
            path="/adm/cadastrar-administrador"
            element={
              <PrivateRoutes tiposAllowed={[1]}>
                <CriacaoAdmin />
              </PrivateRoutes>
            }
          />
          <Route
            path="/adm/gerenciar-adms"
            element={
              <PrivateRoutes tiposAllowed={[1]}>
                <GerenciarAdms />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<PageNotFounded />} />
          <Route path="/" element={<PortalTransparencia />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/adm/cadastrar-projeto"
            element={
              <PrivateRoutes tiposAllowed={[1, 2]}>
                <CadastrarProjeto />
              </PrivateRoutes>
            }
          />
          <Route path="/projeto/:id" element={<InformacoesProjeto />} />
          <Route path="/projeto/aceitar" element={<InformacoesProjetoPendente />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route
            path="/projeto/editar/:id"
            element={
              <PrivateRoutes tiposAllowed={[1, 2]}>
                <EditarProjeto />
              </PrivateRoutes>
            }
          />
          <Route
            path="/adm/administradores"
            element={
              <PrivateRoutes tiposAllowed={[1]}>
                <Administradores />
              </PrivateRoutes>
            }
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
