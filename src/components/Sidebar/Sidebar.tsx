import React, { useState } from 'react';
import { useAuth } from '../../hook/Auth';
import Swal from 'sweetalert2';

export const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState('Projetos');
  const { logout } = useAuth();

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
            logout();
        }
    });
  }

  return (
    <div className="flex flex-col justify-between h-full bg-white border-r-2 border-blue-800 w-54 px-4 transition-width duration-300 fixed left-0 top-0 bottom-0 py-5">
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center h-20">
            <div className="flex items-center justify-center w-full h-full">
              <img 
                src="src/img/logo.jpeg" 
                alt="Logo" 
                className="object-contain max-h-full max-w-full" 
              />
            </div>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col mt-10 space-y-4">
          {['Projetos'].map((item) => (
            <li key={item}>
              <a
                href="#"
                onClick={() => setSelected(item)}
                className={`flex items-center px-4 py-2 ${selected === item ? 'bg-blue-800 text-white rounded-md' : 'rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900'} transition-all duration-300`}
              >
                <span className="mr-4">
                  <i className="bi bi-calendar mr-2"></i>
                  {item}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-start">
        {/* Logout */}
        <div>
          <p className='mb-4' onClick={handleSignout}>
            <i className="bi bi-box-arrow-right ml-1 mr-2"></i>
            Logout
          </p>
        </div>

        {/* Admin Info */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div className='flex flex-col items-start'>
              <p className="text-gray-900">Administrador</p>
              <p className="text-gray-600 text-sm">administrador@gmail.com</p>
            </div>
        </div>
      </div>
    </div>
  );
};