import React, { useContext, useEffect } from 'react';
import { useAuth } from '../../hook/Auth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../hook/ContextAuth';
import { Toast } from '../Swal/Swal';
import "../../styles/Sidebar.css";

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { adm } = useContext(AuthContext);

  const isAtivoProjetos = location.pathname === "/adm/projetos";
  const isAtivoDashboard = location.pathname === "/adm/dashboard";
  const isAtivoAdministradores = location.pathname === "/adm/administradores";
  const isAtivoNotificacoes = location.pathname === "/adm/notificacoes";

  useEffect(() => {
    document.body.classList.toggle('no-margin', !adm);
    return () => {
      document.body.classList.remove('no-margin');
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
      <div className="sidebar">
        <div className="side_cima">
          <div className="side_logotipo">
            <img src="../src/img/logotipo_fapg.svg" alt="Logo" className="logo-img" />
          </div>

          <div className="items">

            <div className={`side_botao ${isAtivoProjetos ? "ativo" : ""}`} onClick={() => navigate('/adm/projetos')}>
              <img src={isAtivoProjetos ? "../src/img/pasta_active.svg" : "../src/img/pasta.svg"} alt="Projetos" />
              <p>Projetos</p>
            </div>

            <div className={`side_botao ${isAtivoDashboard ? "ativo" : ""}`} onClick={() => navigate('/adm/dashboard')}>
              <img src={isAtivoDashboard ? "../src/img/dashboard_active.svg" : "../src/img/dashboard.svg"} alt="Dashboard" />
              <p>Dashboard</p>
            </div>

            <div className={`side_botao ${isAtivoAdministradores ? "ativo" : ""}`} onClick={() => navigate('/adm/administradores')}>
              <img src={isAtivoAdministradores ? "../src/img/user_active.svg" : "../src/img/user.svg"} alt="Administradores" />
              <p>Administradores</p>
            </div>

            <div className={`side_botao ${isAtivoNotificacoes ? "ativo" : ""}`} onClick={() => navigate('/adm/notificacoes')}>
              <img src={isAtivoNotificacoes ? "../src/img/notificacao_active.svg" : "../src/img/notificacao.svg"} />
              <p>Notificações</p>
            </div>

          </div>
          </div>

          {/* Admin Info */}

          <div className="side_baixo">
            <div className="side_baixo_logout">
              <img src="../src/img/logado_user.svg" />
              <div className="side_info">
                <p className="side_nome">{adm?.nome}</p>
                <p className="side_email">{adm?.email}</p>
              </div>
            </div>

          {/* Logout */}

            <div className="side_logout" onClick={handleSignout}>
              <img src="../src/img/logout.svg" />
              <p>Logout</p> 
            </div>
          </div>
      </div>
    );
  };

  if (adm) {
    return (
      <div>
        {renderMenuAdm()}
      </div>
    );
  }

  return null;
  
};