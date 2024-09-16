import { Sidebar } from '../components/Sidebar';
import '../styles/Projetos.css';
import { useNavigate } from 'react-router-dom';

const Projetos = () => {
  const navigate = useNavigate();

  return (
    <div className="container-principal">
      <Sidebar />
        <div className="conteudo-projetos">
          <div className="sem-projetos">
            <p>Ainda não há projetos cadastrados</p>
            <button
              onClick={() => navigate('/cadastrar-projeto')}
              className="botao-novo-projeto">
              Novo projeto
            </button>
          </div>
        </div>
    </div>
  );
};

export default Projetos;