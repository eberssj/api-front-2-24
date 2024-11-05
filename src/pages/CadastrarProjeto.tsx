import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CadastrarProjeto.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { erroror, Toast } from "../components/Swal/Swal";
import { AuthContext } from '../hook/ContextAuth';
import BotaoCTA from '../components/BotaoCTA/BotaoCTA';
import criarProjeto from '../img/criar_projeto.svg';

const CadastrarProjeto = () => {
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
    adm: adm?.id
  });

  const [fileName, setFileName] = useState({
    propostas: 'Nenhum arquivo foi subido ainda.',
    contratos: 'Nenhum arquivo foi subido ainda.',
    artigos: 'Nenhum arquivo foi subido ainda.',
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

  // Formata o valor com máscara de dinheiro
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

    // Formata o valor para a máscara de dinheiro se for o campo de valor
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
    const file = files ? files[0] : null;
    setProject((prev) => ({ ...prev, [name]: file }));
    setFileName((prev) => ({ ...prev, [name]: file ? file.name : 'Nenhum arquivo foi subido ainda.' }));
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
      const formData = new FormData();
  
      const situacao = new Date(project.dataTermino) >= new Date() ? "Em Andamento" : "Encerrado";
  
      const projeto = {
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
        adm: adm?.id
      };
  
      // Adiciona os dados do projeto no FormData
      formData.append('projeto', new Blob([JSON.stringify(projeto)], {
        type: 'application/json',
      }));
  
      // Adiciona arquivos se existirem
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
            Authorization: `Bearer ${adm?.token}`,
          },
        });
  
        console.log('Projeto cadastrado com sucesso:', response.data);
        Toast.fire({
          icon: 'success',
          title: 'Projeto cadastrado com sucesso!',
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
          adm: adm?.id 
        });
  
        navigate("/");
  
      } catch (error) {
        console.error('Erro ao cadastrar o projeto:', error);
        erroror('Não foi possível cadastrar o projeto.');
      }
    } else {
      erroror('Não foi possível cadastrar o projeto.');
    }
  };
  

  return (
    <div className="cadpro_container">
      <Sidebar />
      <div className="formulario">
        <div className="cabecalho">
          <h1 className="cadpro_titulo">Novo Projeto</h1>
        </div>
        <form onSubmit={handleSubmit} className="cadpro_form">
          <div>
            <label className="cadpro_label">Referência do projeto</label>
            <input
              type="text"
              name="referencia"
              value={project.referencia}
              onChange={handleChange}
              className={`input-padrao cadpro_correcao ${errors.referencia ? 'input-erro' : ''}`}
            />
            {errors.referencia && <span className="erro-texto">Este campo é obrigatório.</span>}
          </div>

          <div className="cadpro_secao_dois">
            <div className="cadpro_secao_esq">
              <label className="cadpro_label">Empresa</label>
              <input
                type="text"
                name="empresa"
                value={project.empresa}
                onChange={handleChange}
                className={`input-padrao ${errors.empresa ? 'input-erro' : ''}`}
              />
              {errors.empresa && <span className="erro-texto">Este campo é obrigatório.</span>}
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="ocultar_empresa"
                  checked={project.ocultarEmpresa}
                  onChange={(e) =>
                    setProject((prev) => ({ ...prev, ocultarEmpresa: e.target.checked }))
                  }
                  className="checkbox-input"
                />
                <label>Ocultar Empresa Para o Público</label>
              </div>
            </div>

            <div className="cadpro_secao_dir">
              <label className="cadpro_label">Valor do projeto</label>
              <input
                type="text"
                name="valor"
                value={project.valor}
                onChange={handleChange}
                className={`input-padrao ${errors.valor ? 'input-erro' : ''}`}
              />
              {errors.valor && (
                <span className="erro-texto"> Este campo é obrigatório e deve ser um número. </span>
              )}
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="ocultar_valor"
                  checked={project.ocultarValor}
                  onChange={(e) =>
                    setProject((prev) => ({ ...prev, ocultarValor: e.target.checked }))
                  }
                  className="checkbox-input"
                />
                <label>Ocultar Valor Para o Público</label>
              </div>
            </div>
          </div>

          <div>
            <label className="cadpro_label">Descrição</label>
            <textarea
              name="descricao"
              value={project.descricao}
              onChange={handleChange}
              className="input-padrao cadpro_descricao cadpro_correcao"
            />
            {errors.descricao && <span className="erro-texto">Este campo é obrigatório.</span>}
          </div>
          
          <div className="cadpro_secao_dois">
          <div className="cadpro_secao_esq">
            <label className="cadpro_label">Coordenador</label>
            <input
              type="text"
              name="coordenador"
              value={project.coordenador}
              onChange={handleChange}
              className={`input-padrao ${errors.coordenador ? 'input-erro' : ''}`}
            />
            {errors.coordenador && <span className="erro-texto">Este campo é obrigatório.</span>}
          </div>
          <div className="cadpro_secao_dir">
            <label className="cadpro_label">Objeto</label>
            <input
              type="text"
              name="objeto"
              value={project.objeto}
              onChange={handleChange}
              className="input-padrao"
            />
            {errors.objeto && <span className="erro-texto">Este campo é obrigatório.</span>}
          </div>
          </div>

          <div className="cadpro_secao_dois">
          <div className="alinhado-esquerda cadpro_secao_esq">
            <label className="cadpro_label">Data de início</label>
            <input
              type="date"
              name="dataInicio"
              value={project.dataInicio}
              onChange={handleChange}
              className={`input-padrao ${errors.dataInicio ? 'input-erro' : ''}`}
            />
            {errors.dataInicio && <span className="erro-texto">Este campo é obrigatório, verifique suas informações.</span>}
          </div>
          <div className="alinhado-esquerda cadpro_secao_dir">
            <label className="cadpro_label">Data de término</label>
            <input
              type="date"
              name="dataTermino"
              value={project.dataTermino}
              onChange={handleChange}
              className={`input-padrao ${errors.dataTermino ? 'input-erro' : ''}`}
            />
            {errors.dataTermino && <span className="erro-texto">Este campo é obrigatório e deve ser posterior à data de início.</span>}
          </div>
          </div>
          
          <div className="cadpro_secao_dois">
            <div className="cadpro_parte_tres">
              <label className="cadpro_label">Propostas</label>
              <input
                type="file"
                name="propostas"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="filePropostas"
              />
              <BotaoCTA
                escrito="Selecionar Propostas"
                aparencia="primario"
                onClick={() => document.getElementById('filePropostas')?.click()}
              />
               <div className="cadpro_file_baixo">
                <p>{fileName.propostas}</p>
              </div>
            </div>

            <div className="cadpro_parte_tres">
              <label className="cadpro_label">Contratos</label>
              <input
                type="file"
                name="contratos"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileContratos"
              />
              <BotaoCTA
                escrito="Selecionar Contratos"
                aparencia="primario"
                onClick={() => document.getElementById('fileContratos')?.click()}
              />
               <div className="cadpro_file_baixo">
                <p>{fileName.contratos}</p>
              </div>
            </div>

            <div className="cadpro_parte_tres">
              <label className="cadpro_label">Artigos</label>
              <input
                type="file"
                name="artigos"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileArtigos"
              />
              <BotaoCTA
                escrito="Selecionar Artigos"
                aparencia="primario"
                onClick={() => document.getElementById('fileArtigos')?.click()}
              />
              <div className="cadpro_file_baixo">
                <p>{fileName.artigos}</p>
              </div>
            </div>
          </div>

          <div className="cadpro_botao_cadastrar">
            <BotaoCTA img={criarProjeto} escrito="Cadastrar Projeto" aparencia="primario" type="submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarProjeto;
