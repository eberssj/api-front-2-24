import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../hook/Auth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../hook/ContextAuth';
import { Toast } from '../Swal/Swal';
import "../../styles/Sidebar.css";
import Navbar from '../Navbar/Navbar';

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { adm } = useContext(AuthContext);

  const [isTelaPequena1400, TelaPequena1400] = useState(window.innerWidth < 1400);
  const [isTelaPequena1200, TelaPequena1200] = useState(window.innerWidth < 1200);

  const [hasTransition, setHasTransition] = useState(false);

  const [isAbriuSidebar, AbriuSidebar] = useState(window.innerWidth < 1400);

  const ToggleAbrirSidebar = () => {
    if (!isTelaPequena1200) return;
    AbriuSidebar(!isAbriuSidebar);
    setHasTransition(true);
  };
  

  const isAtivoProjetos = location.pathname === "/adm/projetos";
  const isAtivoDashboard = location.pathname === "/adm/dashboard";
  const isAtivoAdministradores = location.pathname === "/adm/administradores";
  const isAtivoNotificacoes = location.pathname === "/adm/notificacoes";

  useEffect(() => {

    document.body.classList.toggle('no-margin', !adm);

    const handleResize = () => {
      TelaPequena1400(window.innerWidth < 1400);
      TelaPequena1200(window.innerWidth < 1200);
    };

    window.addEventListener('resize', handleResize);

    AbriuSidebar(false);
    setHasTransition(false);

    return () => {
      document.body.classList.remove('no-margin');
      window.removeEventListener('resize', handleResize);
    };
  }, [adm]);

  const handleSignout = () => {
    Swal.fire({
      title: "Deseja realmente sair?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: "Não",
      width: 410,
      confirmButtonColor: 'rgb(255, 0, 53)',
      denyButtonColor: 'rgb(0,114,187)',
      heightAuto: false,
      backdrop: false, 
      customClass: { 
        confirmButton: 'cButton',
        denyButton: 'dButton',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: 'success',
          title: 'Logout realizado com sucesso!'
        });
        logout();
        navigate("/login");
      }
    });
  };

  const renderMenuAdm = () => {
    return (
      <div className={`sidebar ${isAbriuSidebar ? 'aberto' : ''} ${hasTransition ? 'transicao' : ''}`}>
        <div className="side_cima">
          <div className={`side_logotipo ${isTelaPequena1200 ? 'centralizar' : ''}`} onClick={ToggleAbrirSidebar}>
            <img src="../src/img/logotipo_Fapg.svg" alt="Logo" className={`logo-img ${!isAbriuSidebar && isTelaPequena1200 ? "none" : ""}`} />
            <img src="../src/img/abrir_sidebar.svg" className={`${isTelaPequena1200 ? "side_abrir" : "none"} ${isAbriuSidebar ? "rodar" : ""}`} />

          </div>

          <div className={`items ${isTelaPequena1200 ? 'fechado' : ''}`}>

            <div className={`side_botao ${isAtivoProjetos ? "ativo" : ""} ${isTelaPequena1200 && !isAbriuSidebar ? "side_centralizar" : ""}`} 
            onClick={() => navigate('/adm/projetos')}>
              <img src={isAtivoProjetos ? "../src/img/pasta_active.svg" : "../src/img/pasta.svg"} alt="Projetos" />
              <p className={isAbriuSidebar || !isTelaPequena1200 ? "" : "none"}>Projetos</p>
            </div>

            <div className={`side_botao ${isAtivoDashboard ? "ativo" : ""} ${isTelaPequena1200 && !isAbriuSidebar ? "side_centralizar" : ""}`} 
            onClick={() => navigate('/adm/dashboard')}>
              <img src={isAtivoDashboard ? "../src/img/dashboard_active.svg" : "../src/img/dashboard.svg"} alt="Dashboard" />
              <p className={isAbriuSidebar || !isTelaPequena1200 ? "" : "none"}>Dashboard</p>
            </div>

            <div className={`side_botao ${isAtivoAdministradores ? "ativo" : ""} ${isTelaPequena1200 && !isAbriuSidebar ? "side_centralizar" : ""}`}
            onClick={() => navigate('/adm/administradores')}>
              <img src={isAtivoAdministradores ? "../src/img/user_active.svg" : "../src/img/user.svg"} alt="Administradores" />
              <p className={!isAbriuSidebar && isTelaPequena1200 ? "none" : ""}>
                {isTelaPequena1400 && !isAbriuSidebar ? 'Admin.' : 'Administradores'}
              </p>

            </div>

            <div className={`side_botao ${isAtivoNotificacoes ? "ativo" : ""} ${isTelaPequena1200 && !isAbriuSidebar ? "side_centralizar" : ""}`} 
            onClick={() => navigate('/adm/notificacoes')}>
              <img src={isAtivoNotificacoes ? "../src/img/notificacao_active.svg" : "../src/img/notificacao.svg"} />
              <p className={!isAbriuSidebar && isTelaPequena1200 ? "none" : ""}>
                {isTelaPequena1400 && !isAbriuSidebar ? 'Notif.' : 'Notificações'}
              </p>
            </div>

          </div>
          </div>

          {/* Admin Info */}

          <div className="side_baixo">
            <div className={`side_baixo_logout ${!isAbriuSidebar && isTelaPequena1200 ? "none" : ""}`}>
              <img src="../src/img/logado_user.svg" />
              <div className="side_info">
                <p className="side_nome">{adm?.nome}</p>
                <p className="side_email">{adm?.email}</p>
              </div>
            </div>

          {/* Logout */}

            <div className="side_logout" onClick={handleSignout}>
              <img src="../src/img/logout.svg" />
              <p>{isTelaPequena1200 && !isAbriuSidebar ? "" : 'Logout'}</p> 
            </div>
          </div>
      </div>
    );
  };

  return (
    <div>
      {adm ? renderMenuAdm() : <Navbar />}
    </div>
  );  
};