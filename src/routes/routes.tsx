import { Route, BrowserRouter, Routes as Switch} from 'react-router-dom';
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


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
              
                <Route path="/adm" element={
                      <PrivateRoutes tiposAllowed={[1]}>
                        <Adm />
                      </PrivateRoutes>
                }/>

                <Route path="*" element={<PageNotFounded></PageNotFounded>} />

                <Route path="/" element={<PortalTransparencia></PortalTransparencia>} />

                <Route path="/login" element={<Login></Login>} />

                <Route path="/adm/cadastrar-projeto" element={
                  <PrivateRoutes tiposAllowed={[1]}>
                    <CadastrarProjeto />

                  </PrivateRoutes>
                } />

                <Route path="/adm/projetos" element={
                  <PrivateRoutes tiposAllowed={[1]}>
                    <Projetos />
                  </PrivateRoutes>
                } />

                <Route path="/projeto/:id" element={<InformacoesProjeto />} />

            </Switch>
        </BrowserRouter>
    )
}