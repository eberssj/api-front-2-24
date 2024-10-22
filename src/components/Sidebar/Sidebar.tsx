import React, { useContext, useState } from 'react';
import { useAuth } from '../../hook/Auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../hook/ContextAuth';
import { Toast } from '../Swal/Swal';
import "../../styles/Sidebar.css"

export const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState('Projetos');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { adm } = useContext(AuthContext);

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
  }

  const renderMenuAdm   = () => {
    return (
      <div className="sidebar">
        <div className='logo-items-container'>
          <div className="logo-container">
                <img 
                  src="../src/img/logo.jpeg"
                  alt="Logo"
                  className='logo-img'
                />
          </div>

          <div className='items'>
          <li>
              <a
                href="/adm/projetos"
                onClick={() => setSelected('Projetos')}
                className={`flex items-center px-4 py-2 ${selected === 'Projetos' ? 'bg-blue-800 text-white rounded-md' : 'rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900'} transition-all duration-300`}
              >
                <span className="mr-4">
                  <i className="bi bi-calendar mr-2"></i>
                  <p>Projetos</p>
                </span>
              </a>
            </li>
            <li>
              <a
                href="/adm/dashboard"
                onClick={() => setSelected('Dashboard')}
                className={`flex items-center px-4 py-2 ${selected === 'Projetos' ? 'bg-blue-800 text-white rounded-md' : 'rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900'} transition-all duration-300`}
              >
                <span className="mr-4">
                  <i className="bi bi-graph-up mr-2"></i>
                  <p>Dashboard</p>
                </span>
              </a>
            </li>
            <li>
            <a
                href="/adm/administradores"
                onClick={() => setSelected('Administradores')}
                className={`flex items-center px-4 py-2 ${selected === 'Projetos' ? 'bg-blue-800 text-white rounded-md' : 'rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900'} transition-all duration-300`}
              >
                <span className="mr-4">
                  <i className="bi bi-graph-up mr-2"></i>
                  <p>Administradores</p>
                </span>
              </a>
            </li>
          </div>        
        </div>
  
        {/* Logout */}
        <div>
          <p className='logout' onClick={handleSignout}>
            <i className="bi bi-box-arrow-right logout-icon"></i>
            <p>Logout</p> 
          </p>

        {/* Admin Info */}
        <div className="adm-container">
          <i className="bi bi-person-circle perfil-icon"></i>
            <div className='adm-info'>
              <p className='adm-nome'>Administrador: {adm?.nome}</p>
              <p className="adm-email">{adm?.email}</p>
            </div>
        </div>
      </div>
    </div>
    );
  }

  const renderMenuUser = () => {
    return (
      <div className="sidebar">
          <div className="logo-items-container">
              <div className="logo-container">
                <img 
                  src="../src/img/logo.jpeg"
                  alt="Logo"
                  className="logo-img" 
                />
              </div>
  
          <div className="items">
            <li>
              <a
                href="/"
                onClick={() => setSelected('Projetos')}
                className={`flex items-center px-4 py-2 ${selected === 'Projetos' ? 'bg-blue-800 text-white rounded-md' : 'rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900'} transition-all duration-300`}
              >
                <span className="mr-4">
                  <i className="bi bi-calendar mr-2"></i>
                  <p>Projetos</p>
                </span>
              </a>
            </li>
          </div>
        </div>
      </div>
    );
  }

  if (adm) {
    return (
      <div>
        {renderMenuAdm()}
      </div>
    );
  } else {
    return (
      <div>
        {renderMenuUser()}
      </div>
    );
  }
};