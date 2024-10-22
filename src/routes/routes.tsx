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
import GerenciarAdms from '../pages/GerenciarAdms'; // Importando a nova página

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
          path="/adm"
          element={
            <PrivateRoutes tiposAllowed={[1]}>
              <Adm />
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
            <PrivateRoutes tiposAllowed={[1]}>
              <CadastrarProjeto />
            </PrivateRoutes>
          }
        />

        <Route
          path="/adm/projetos"
          element={
            <PrivateRoutes tiposAllowed={[1]}>
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
          }
        />
      </Switch>
    </BrowserRouter>
  );
}
