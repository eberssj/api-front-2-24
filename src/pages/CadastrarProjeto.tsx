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

  const [errors, setErrors] = useState({
    referencia: false,
    empresa: false,
    coordenador: false,
    valor: false,
    dataInicio: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setProject(prev => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const validateForm = () => {
    const newErrors = {
      referencia: project.referencia.trim() === '',
      empresa: project.empresa.trim() === '',
      coordenador: project.coordenador.trim() === '',
      valor: project.valor.trim() === '',
      dataInicio: project.dataInicio === '',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Projeto adicionado:', project);
      // Lógica de envio para API aqui
    } else {
      console.log('Existem erros no formulário.');
    }
  };

  return (
    <div className="container-principal">
      <Sidebar />
        <div className="formulario">
        <div className="cabecalho">
            <Link to="/adm/projetos" className="link-voltar">
              <strong><i className="bi bi-arrow-left text-3xl text-blue-900"></i></strong>
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
                className={`input-padrao ${errors.referencia ? 'input-erro' : ''}`} 
              />
              {errors.referencia && <span className="erro-texto">* Este campo é obrigatório.</span>}
            </div>

            {/* Empresa */}
            <div>
              <label className="texto-label">Empresa*</label>
              <input 
                type="text" 
                name="empresa" 
                value={project.empresa} 
                onChange={handleChange}
                className={`input-padrao ${errors.empresa ? 'input-erro' : ''}`} 
              />
              {errors.empresa && <span className="erro-texto">* Este campo é obrigatório.</span>}
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
                className={`input-padrao ${errors.coordenador ? 'input-erro' : ''}`} 
              />
              {errors.coordenador && <span className="erro-texto">* Este campo é obrigatório.</span>}
            </div>

            {/* Valor do Projeto */}
            <div>
              <label className="texto-label">Valor do projeto*</label>
              <input 
                type="text" 
                name="valor" 
                value={project.valor} 
                onChange={handleChange}
                className={`input-padrao ${errors.valor ? 'input-erro' : ''}`} 
              />
              {errors.valor && <span className="erro-texto">* Este campo é obrigatório.</span>}
            </div>

            {/* Data de Início */}
            <div className="alinhado-esquerda">
              <label className="texto-label">Data de início*</label>
              <input 
                type="date" 
                name="dataInicio" 
                value={project.dataInicio} 
                onChange={handleChange}
                className={`input-flexivel ${errors.dataInicio ? 'input-erro' : ''}`} 
              />
              {errors.dataInicio && <span className="erro-texto">* Este campo é obrigatório.</span>}
            </div>

            {/* Data de Término */}
            <div className="alinhado-esquerda">
              <label className="texto-label">Data de término</label>
              <input 
                type="date" 
                name="dataTermino" 
                value={project.dataTermino} 
                onChange={handleChange}
                className="input-flexivel" 
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