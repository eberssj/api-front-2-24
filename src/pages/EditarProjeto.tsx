import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/EditarProjeto.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AuthContext } from '../hook/ContextAuth';
import BotaoCTA from '../components/BotaoCTA/BotaoCTA';
import criarProjeto from '../img/criar_projeto.svg';
import Lixeira from "../img/lixeira.svg";

interface Arquivo {
    id: number;
    nomeArquivo: string;
    tipoDocumento: string;
}

interface Projeto {
    referenciaProjeto: string;
    empresa: string;
    objeto: string;
    descricao: string;
    coordenador: string;
    ocultarValor: boolean;
    ocultarEmpresa: boolean;
    valor: number;
    dataInicio: string;
    dataTermino: string;
    situacao: string;
}

const EditarProjeto = () => {
    const { adm } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Projeto | null>(null);
    const [arquivosExistentes, setArquivosExistentes] = useState<Arquivo[]>([]);
    const [arquivosNovos, setArquivosNovos] = useState<{
        propostas: File | null;
        contratos: File | null;
        artigos: File | null;
    }>({ propostas: null, contratos: null, artigos: null });
    const [arquivosParaExcluir, setArquivosParaExcluir] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjeto = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/projeto/${id}`, {
                    headers: { Authorization: `Bearer ${adm?.token}` },
                });
                setFormData(response.data || null);
            } catch (error) {
                console.error('Erro ao carregar o projeto:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchArquivos = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/arquivos/projeto/${id}`, {
                    headers: { Authorization: `Bearer ${adm?.token}` },
                });
                setArquivosExistentes(response.data);
            } catch (error) {
                console.error('Erro ao carregar arquivos:', error);
            }
        };

        if (adm && id) {
            fetchProjeto();
            fetchArquivos();
        }
    }, [adm, id]);

    const [fileName, setFileName] = useState({
        propostas: 'Nenhum arquivo foi subido ainda.',
        contratos: 'Nenhum arquivo foi subido ainda.',
        artigos: 'Nenhum arquivo foi subido ainda.',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => (prevData ? { ...prevData, [name]: value } : prevData));
    };

    const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setArquivosNovos((prev) => ({ ...prev, [name]: files[0] }));
        }
        setFileName((prev) => ({ ...prev, [name]: files ? files[0].name : 'Nenhum arquivo foi subido ainda.' }));
    };

    const handleExcluirArquivo = (arquivoId: number) => {
        setArquivosParaExcluir((prev) => [...prev, arquivoId]);
        setArquivosExistentes((prev) => prev.filter((arquivo) => arquivo.id !== arquivoId));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = new FormData();
            if (formData) {
                const projeto = {
                    ...formData,
                    adm: adm?.id,
                };
                data.append('projeto', new Blob([JSON.stringify(projeto)], { type: 'application/json' }));
            }

            Object.entries(arquivosNovos).forEach(([tipo, file]) => {
                if (file) data.append(tipo, file);
            });

            arquivosParaExcluir.forEach((id) => data.append('arquivosExcluidos', id.toString()));

            await axios.put(`http://localhost:8080/projeto/editar/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${adm?.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Projeto atualizado com sucesso!');
            navigate("/");
        } catch (error) {
            console.error('Erro ao atualizar o projeto:', error);
            alert('Erro ao atualizar o projeto.');
        }
    };

    if (isLoading) return <div>Carregando...</div>;

    if (!formData) return <div>Erro: Projeto não encontrado.</div>;

    return (
        <div className="cadpro_container">
          <Sidebar />
          <div className="formulario">
            <div className="infopro_cima">
                    <h1 className="infopro_titulo">Editar Projeto</h1>
                    <div className="infopro_cima_dir">
                        <BotaoCTA img="/src/img/voltar.svg" escrito="Voltar" aparencia="primario" onClick={() => navigate(-1)} />
                    </div>
                </div>
            <form onSubmit={handleSubmit} className="cadpro_form">
              <div>
                <label className="cadpro_label">Referência do Projeto</label>
                <input
                  type="text"
                  className="input-padrao cadpro_correcao"
                  name="referenciaProjeto"
                  value={formData.referenciaProjeto}
                  onChange={handleInputChange}
                />
              </div>
      
              <div className="cadpro_secao_dois">
                <div className="cadpro_secao_esq">
                  <label className="cadpro_label">Empresa</label>
                  <input
                    type="text"
                    className="input-padrao"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                  />
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      name="ocultarEmpresa"
                      checked={formData.ocultarEmpresa}
                      onChange={(e) =>
                        setFormData((prevData) =>
                          prevData ? { ...prevData, ocultarEmpresa: e.target.checked } : prevData
                        )
                      }
                      className="checkbox-input"
                    />
                    <label>Ocultar Empresa Para o Público</label>
                  </div>
                </div>
      
                <div className="cadpro_secao_dir">
                  <label className="cadpro_label">Valor</label>
                  <input
                    type="number"
                    className="input-padrao"
                    name="valor"
                    value={formData.valor}
                    onChange={handleInputChange}
                  />
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      name="ocultarValor"
                      checked={formData.ocultarValor}
                      onChange={(e) =>
                        setFormData((prevData) =>
                          prevData ? { ...prevData, ocultarValor: e.target.checked } : prevData
                        )
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
                  className="input-padrao cadpro_descricao cadpro_correcao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                />
              </div>
      
              <div className="cadpro_secao_dois">
                <div className="cadpro_secao_dir">
                  <label className="cadpro_label">Coordenador</label>
                  <input
                    type="text"
                    className="input-padrao"
                    name="coordenador"
                    value={formData.coordenador}
                    onChange={handleInputChange}
                  />
                </div>
      
                <div className="cadpro_secao_dir">
                  <label className="cadpro_label">Objeto</label>
                  <input
                    type="text"
                    className="input-padrao"
                    name="objeto"
                    value={formData.objeto}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
      
              <div className="cadpro_secao_dois">
                <div className="cadpro_secao_esq">
                  <label className="cadpro_label">Data de Início</label>
                  <input
                    type="date"
                    className="input-padrao"
                    name="dataInicio"
                    value={formData.dataInicio}
                    onChange={handleInputChange}
                  />
                </div>
      
                <div className="cadpro_secao_dir">
                  <label className="cadpro_label">Data de Término</label>
                  <input
                    type="date"
                    className="input-padrao"
                    name="dataTermino"
                    value={formData.dataTermino}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <p className="cadpro_label correcao cima">Arquivos Existentes</p>
              {arquivosExistentes.length > 0 ? (
                <div className="edipro_arquivos_existentes_container">
                  {arquivosExistentes.map((arquivo) => (
                    <div className="edipro_arquivo_existente" key={arquivo.id}>
                      <p className="edipro_arquivo_existente_titulo">{arquivo.tipoDocumento}</p>
                      <p className="edipro_arquivo_existente_nome">{arquivo.nomeArquivo}</p>
                      <BotaoCTA img={Lixeira} escrito="Excluir" aparencia="secundario" cor="vermelho" onClick={() => handleExcluirArquivo(arquivo.id)}/>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="cadpro_file_baixo bottom">Ainda não há arquivos existentes</p>
              )}
      
            <h3 className="cadpro_label">Adicionar Novo Arquivo</h3>

            <div className="cadpro_secao_dois">
            <div className="cadpro_parte_tres">
              <label className="cadpro_label">Propostas</label>
              <input
                type="file"
                name="propostas"
                onChange={handleArquivoChange}
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
                onChange={handleArquivoChange}
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
                onChange={handleArquivoChange}
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
      
              <div className="edipro_botoes">
                <BotaoCTA
                  img={criarProjeto}
                  escrito="Salvar Alterações"
                  aparencia="primario"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      );
    };

export default EditarProjeto;
