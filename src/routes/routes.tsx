import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css';
import { Sidebar } from '../components/Sidebar';
import CadastrarProjeto from '../pages/CadastrarProjeto';
import Projetos from '../pages/Projetos';
import Adm from '../pages/Adm';
import Login from "../pages/login";
import PageNotFounded from "../pages/PageNotFounded";
import { PrivateRoutes } from "./privateRoutes";

export default function App() {
  return (
    <Router>
      <div id="root">
        <div>
          <Sidebar />
        </div>
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
      </div>
    </Router>
  );
}