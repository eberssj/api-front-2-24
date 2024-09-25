import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/CadastrarProjeto.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { erroror, Toast } from "../components/Swal/Swal";
import { useNavigate } from 'react-router-dom'; // Para redirecionar

const CadastrarProjeto = () => {

  const navigate = useNavigate();

  const [project, setProject] = useState({
    referencia: '',
    empresa: '',
    objeto: '',
    descricao: '',
    coordenador: '',
    valor: '',
    dataInicio: '',
    dataTermino: '',
    situacao: '',
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
    situacao: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setProject((prev) => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const validateForm = () => {
    const newErrors = {
      referencia: project.referencia.trim() === '',
      empresa: project.empresa.trim() === '',
      coordenador: project.coordenador.trim() === '',
      valor: project.valor.trim() === '' || isNaN(Number(project.valor)),
      dataInicio: project.dataInicio === '',
      situacao: project.situacao.trim() === '' || isNaN(Number(project.situacao)), // Validação para situação
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (validateForm()) {
      const formData = new FormData();

      // Adiciona os campos de texto
      formData.append('projeto', JSON.stringify({
        referenciaProjeto: project.referencia,
        empresa: project.empresa,
        objeto: project.objeto,
        descricao: project.descricao,
        coordenador: project.coordenador,
        valor: parseFloat(project.valor),
        dataInicio: project.dataInicio,
        dataTermino: project.dataTermino,
        situacao: parseFloat(project.situacao),
      }));

      // Adiciona os arquivos (se existirem)
      if (project.propostas) {
        formData.append('propostas', project.propostas);
      }
      if (project.contratos) {
        formData.append('contratos', project.contratos);
      }
      if (project.artigos) {
        formData.append('artigos', project.artigos);
      }

      try {
        const response = await axios.post('http://localhost:8080/projeto/cadastrar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Projeto cadastrado com sucesso:', response.data);
        // Resetar o formulário após o envio, se necessário
        setProject({
          referencia: '',
          empresa: '',
          objeto: '',
          descricao: '',
          coordenador: '',
          valor: '',
          dataInicio: '',
          dataTermino: '',
          situacao: '',
          propostas: null,
          contratos: null,
          artigos: null,
        });
      } catch (error) {
        console.error('Erro ao cadastrar o projeto:', error);
      }
    } else {
      erroror('Não foi possível cadastrar o projeto.');
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
            {errors.valor && <span className="erro-texto">* Este campo é obrigatório e deve ser um número.</span>}
          </div>

          {/* Data de Início */}
          <div className="alinhado-esquerda">
            <label className="texto-label">Data de início*</label>
            <input
              type="date"
              name="dataInicio"
              value={project.dataInicio}
              onChange={handleChange}
              className={`input-padrao ${errors.dataInicio ? 'input-erro' : ''}`}
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
              className="input-padrao"
            />
          </div>

          {/* Situação */}
          <div>
            <label className="texto-label">Situação*</label>
            <input
              type="text"
              name="situacao"
              value={project.situacao}
              onChange={handleChange}
              className={`input-padrao ${errors.situacao ? 'input-erro' : ''}`}
            />
            {errors.situacao && <span className="erro-texto">* Este campo é obrigatório e deve ser um número.</span>}
          </div>

          {/* Anexar Propostas */}
          <div>
            <label className="texto-label">Anexar propostas</label>
            <input type="file" name="propostas" onChange={handleFileChange} className="input-padrao" />
          </div>

          {/* Anexar Contratos */}
          <div>
            <label className="texto-label">Anexar contratos</label>
            <input type="file" name="contratos" onChange={handleFileChange} className="input-padrao" />
          </div>

          {/* Anexar Artigos */}
          <div>
            <label className="texto-label">Anexar artigos</label>
            <input type="file" name="artigos" onChange={handleFileChange} className="input-padrao" />
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
