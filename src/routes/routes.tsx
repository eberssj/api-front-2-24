import { Route, BrowserRouter, Routes as Switch } from 'react-router-dom';
import Adm from '../pages/Adm';
import PageNotFounded from '../pages/PageNotFounded';
import { PrivateRoutes } from './privateRoutes';
import Login from '../pages/login';
import CadastrarProjeto from '../pages/CadastrarProjeto';
import Projetos from '../pages/Projetos';
import PortalTransparencia from '../pages/PortalTransparencia';
import InformacoesProjeto from '../pages/InformacoesProjeto';
import EditarProjeto from '../pages/EditarProjeto';
import Dashboard from '../pages/Dashboard';
import { Administradores } from '../pages/Administradores';
import GerenciarAdms from '../pages/GerenciarAdms'; // Importando a nova página
import Footer from '../components/Footer/Footer';
import Notificacoes from '../pages/Notificacoes';
import CriacaoAdmin from '../pages/CriacaoAdmin';
import VerAdministrador from '../pages/VerAdministrador';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/adm/dashboard"
          element={
            <PrivateRoutes tiposAllowed={[1]}>
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
            <PrivateRoutes tiposAllowed={[1]}>
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

        <Route
          path="/adm/projetos"
          element={
            <PrivateRoutes tiposAllowed={[1, 2]}>
              <Projetos />
            </PrivateRoutes>
          }
        />

        <Route path="/projeto/:id" element={<InformacoesProjeto />} />

        <Route
          path="/projeto/editar/:id"
          element={
            <PrivateRoutes tiposAllowed={[1]}>
              <EditarProjeto />
                  </PrivateRoutes>
                } />

                <Route path="/adm/administradores" element={
                  <PrivateRoutes tiposAllowed={[1]}>
                    <Administradores />
            </PrivateRoutes>
          }
        />
      </Switch>

      <Footer />

    </BrowserRouter>
  );
}
