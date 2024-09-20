import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CadastrarProjeto.css';
import { Sidebar } from '../components/Sidebar/Sidebar';

const CadastrarProjeto = () => {
  const [project, setProject] = useState({
    referencia: '',
    empresa: '',
    objeto: '',
    descricao: '',
    coordenador: '',
    valor: '',
    dataInicio: '',
    dataTermino: '',
    propostas: null,
    contratos: null,
    artigos: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setProject(prev => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(project);
  };

  return (
    <div className="container-principal">
      <Sidebar />
        <div className="formulario">
        <div className="cabecalho">
            <Link to="/adm/projetos" className="link-voltar">
              <i className="bi bi-arrow-left"></i>
            </Link>
            <h1 className="texto-titulo">Novo Projeto</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Referência do Projeto */}
            <div>
              <label className="texto-label">Referência do projeto*</label>
              <input 
                type="text" 
                name="referencia" 
                value={project.referencia} 
                onChange={handleChange}
                className="input-padrao" 
                required 
              />
            </div>

            {/* Empresa */}
            <div>
              <label className="texto-label">Empresa*</label>
              <input 
                type="text" 
                name="empresa" 
                value={project.empresa} 
                onChange={handleChange}
                className="input-padrao" 
                required 
              />
            </div>

            {/* Objeto */}
            <div>
              <label className="texto-label">Objeto</label>
              <input 
                type="text" 
                name="objeto" 
                value={project.objeto} 
                onChange={handleChange}
                className="input-padrao" 
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="texto-label">Descrição</label>
              <textarea
                name="descricao" 
                value={project.descricao} 
                onChange={handleChange}
                className="input-padrao"
              />
            </div>

            {/* Coordenador */}
            <div>
              <label className="texto-label">Coordenador*</label>
              <input 
                type="text" 
                name="coordenador" 
                value={project.coordenador} 
                onChange={handleChange}
                className="input-padrao" 
                required 
              />
            </div>

            {/* Valor do Projeto */}
            <div>
              <label className="texto-label">Valor do projeto*</label>
              <input 
                type="text" 
                name="valor" 
                value={project.valor} 
                onChange={handleChange}
                className="input-padrao" 
                required 
              />
            </div>

            {/* Data de Início */}
            <div className="alinhado-esquerda">
              <label className="texto-label">Data de início*</label>
              <input 
                type="date" 
                name="dataInicio" 
                value={project.dataInicio} 
                onChange={handleChange}
                className="input-flexivel" 
                required 
              />
            </div>

            {/* Data de Término */}
            <div className="alinhado-esquerda">
              <label className="texto-label">Data de término*</label>
              <input 
                type="date" 
                name="dataTermino" 
                value={project.dataTermino} 
                onChange={handleChange}
                className="input-flexivel" 
                required 
              />
            </div>

            {/* Propostas/Relatórios Técnicos */}
            <div className="alinhado-esquerda">
              <label className="texto-label">Propostas/Relatórios Técnicos</label>
              <input 
                type="file" 
                name="propostas"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="input-flexivel" 
              />
            </div>

            {/* Contratos */}
            <div className="alinhado-esquerda">
              <label className="texto-label">Contratos</label>
              <input 
                type="file" 
                name="contratos" 
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="input-flexivel" 
              />
            </div>

            {/* Artigos */}
            <div className="alinhado-esquerda">
              <label className="texto-label">Artigos</label>
              <input 
                type="file" 
                name="artigos"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="input-flexivel" 
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button 
                type="submit" 
                className="botao-submit"
              >
                Adicionar projeto
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default CadastrarProjeto;