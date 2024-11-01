import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CadastrarProjeto.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { erroror, Toast } from "../components/Swal/Swal";
import { AuthContext } from '../hook/ContextAuth';
import BotaoCTA from '../components/BotaoCTA/BotaoCTA';
import criarProjeto from '../img/criar_projeto.svg';

const SolicitarCadastro = () => {
  const navigate = useNavigate();
  const { adm } = useContext(AuthContext);
  const [project, setProject] = useState({
    referencia: '',
    empresa: '',
    objeto: '',
    descricao: '',
    coordenador: '',
    ocultarValor: false,
    ocultarEmpresa: false,
    valor: 'R$ 0,00',
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
    dataTermino: false,
    objeto: false,
    descricao: false,
  });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(parseFloat(numericValue) / 100);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'valor') {
      const formattedValue = formatCurrency(value);
      setProject((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setProject((prev) => ({ ...prev, [name]: value }));
    }
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
      valor: project.valor.trim() === '' || isNaN(Number(project.valor.replace(/\D/g, ''))) || Number(project.valor.replace(/\D/g, '')) <= 0,
      dataInicio: project.dataInicio === '',
      dataTermino: project.dataTermino === '' || project.dataTermino < project.dataInicio,
      objeto: project.objeto.trim() === '',
      descricao: project.descricao.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (validateForm()) {
      const situacao = new Date(project.dataTermino) >= new Date() ? "Em Andamento" : "Encerrado";
  
      const permissao = {
        adminSolicitanteId: adm?.id,
        statusSolicitado: "Pendente",
        dataSolicitacao: new Date().toISOString().split('T')[0], // Corrigido aqui
        informacaoProjeto: {
          referenciaProjeto: project.referencia,
          empresa: project.empresa,
          objeto: project.objeto,
          descricao: project.descricao,
          coordenador: project.coordenador,
          ocultarValor: project.ocultarValor,
          ocultarEmpresa: project.ocultarEmpresa,
          valor: parseFloat(project.valor.replace(/\D/g, '')) / 100,
          dataInicio: project.dataInicio,
          dataTermino: project.dataTermino,
          situacao: situacao,
        }
      };
  
      // Exibindo o JSON no console antes de enviar
      console.log("JSON da Permissão a ser enviado:", JSON.stringify(permissao, null, 2));
  
      try {
        const response = await axios.post('http://localhost:8080/permissao/solicitarCriacao', permissao, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adm?.token}`,
          },
        });
  
        console.log('Permissão solicitada com sucesso:', response.data);
        Toast.fire({
          icon: 'success',
          title: 'Solicitação de criação enviada com sucesso!',
        });
  
        // Reseta os campos do formulário
        setProject({
          referencia: '',
          empresa: '',
          objeto: '',
          descricao: '',
          coordenador: '',
          ocultarValor: false,
          ocultarEmpresa: false,
          valor: 'R$ 0,00',
          dataInicio: '',
          dataTermino: '',
          propostas: null,
          contratos: null,
          artigos: null,
        });
  
        navigate("/");
  
      } catch (error) {
        console.error('Erro ao solicitar criação de permissão:', error);
        erroror('Não foi possível solicitar a criação da permissão.');
      }
    } else {
      erroror('Não foi possível solicitar a criação da permissão.');
    }
  };
  
  

  return (
    <div className="container-principal-cadastrar">
      <Sidebar />
      <div className="formulario">
        <div className="cabecalho">
          <Link to="/" className="link-voltar">
            <strong><i className="bi bi-arrow-left text-3xl text-blue-900"></i></strong>
          </Link>
          <h1 className="texto-titulo">Novo Projeto</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="texto-label">Referência do projeto</label>
            <input
              type="text"
              name="referencia"
              value={project.referencia}
              onChange={handleChange}
              className={`input-padrao ${errors.referencia ? 'input-erro' : ''}`}
            />
            {errors.referencia && <span className="erro-texto">* Este campo é obrigatório.</span>}
          </div>

          <div>
            <label className="texto-label">Empresa</label>
            <input
              type="text"
              name="empresa"
              value={project.empresa}
              onChange={handleChange}
              className={`input-padrao ${errors.empresa ? 'input-erro' : ''}`}
            />
            {errors.empresa && <span className="erro-texto">* Este campo é obrigatório.</span>}
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              name="ocultar_empresa"
              checked={project.ocultarEmpresa}
              onChange={(e) => setProject((prev) => ({ ...prev, ocultarEmpresa: e.target.checked }))}
              className="checkbox-input"
            />
            <label>Ocultar Empresa Para o Público</label>
          </div>

          <div>
            <label className="texto-label">Objeto</label>
            <input
              type="text"
              name="objeto"
              value={project.objeto}
              onChange={handleChange}
              className="input-padrao"
            />
            {errors.objeto && <span className="erro-texto">* Este campo é obrigatório.</span>}
          </div>

          <div>
            <label className="texto-label">Descrição</label>
            <textarea
              name="descricao"
              value={project.descricao}
              onChange={handleChange}
              className="input-padrao"
            />
            {errors.descricao && <span className="erro-texto">* Este campo é obrigatório.</span>}
          </div>

          <div>
            <label className="texto-label">Coordenador</label>
            <input
              type="text"
              name="coordenador"
              value={project.coordenador}
              onChange={handleChange}
              className={`input-padrao ${errors.coordenador ? 'input-erro' : ''}`}
            />
            {errors.coordenador && <span className="erro-texto">* Este campo é obrigatório.</span>}
          </div>

          <div>
            <label className="texto-label">Valor do projeto</label>
            <input
              type="text"
              name="valor"
              value={project.valor}
              onChange={handleChange}
              className={`input-padrao ${errors.valor ? 'input-erro' : ''}`}
            />
            {errors.valor && <span className="erro-texto">* Este campo é obrigatório e deve ser um número.</span>}
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              name="ocultar_valor"
              checked={project.ocultarValor}
              onChange={(e) => setProject((prev) => ({ ...prev, ocultarValor: e.target.checked }))}
              className="checkbox-input"
            />
            <label>Ocultar Valor Para o Público</label>
          </div>

          <div className="alinhado-esquerda">
            <label className="texto-label">Data de início</label>
            <input
              type="date"
              name="dataInicio"
              value={project.dataInicio}
              onChange={handleChange}
              className={`input-padrao ${errors.dataInicio ? 'input-erro' : ''}`}
            />
            {errors.dataInicio && <span className="erro-texto">* Este campo é obrigatório, verifique suas informações.</span>}
          </div>

          <div className="alinhado-esquerda">
            <label className="texto-label">Data de término</label>
            <input
              type="date"
              name="dataTermino"
              value={project.dataTermino}
              onChange={handleChange}
              className={`input-padrao ${errors.dataTermino ? 'input-erro' : ''}`}
            />
            {errors.dataTermino && <span className="erro-texto">* Este campo é obrigatório e deve ser posterior à data de início.</span>}
          </div>

          <div>
            <label className="texto-label">Propostas</label>
            <input
              type="file"
              name="propostas"
              onChange={handleFileChange}
              className="input-padrao"
            />
          </div>

          <div>
            <label className="texto-label">Contratos</label>
            <input
              type="file"
              name="contratos"
              onChange={handleFileChange}
              className="input-padrao"
            />
          </div>

          <div>
            <label className="texto-label">Artigos</label>
            <input
              type="file"
              name="artigos"
              onChange={handleFileChange}
              className="input-padrao"
            />
          </div>

          <div className="cadpro_botao_cadastrar">
            <BotaoCTA img={criarProjeto} escrito="Cadastrar Projeto" aparencia="primario" type="submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolicitarCadastro;