import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/EditarProjeto.css'; // Importando o CSS
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AuthContext } from '../hook/ContextAuth'; // Importando o contexto de autenticação

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => (prevData ? { ...prevData, [name]: value } : prevData));
    };

    const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setArquivosNovos((prev) => ({ ...prev, [name]: files[0] }));
        }
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
                    adm: adm?.id, // Enviando o ID do administrador
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
            navigate('/adm/projetos');
        } catch (error) {
            console.error('Erro ao atualizar o projeto:', error);
            alert('Erro ao atualizar o projeto.');
        }
    };

    if (isLoading) return <div>Carregando...</div>;

    if (!formData) return <div>Erro: Projeto não encontrado.</div>;

    return (
        <div className="container-principal-editar">
            <Sidebar />
            <div className="formulario">
                <div className="cabecalho">
                    <div className="link-voltar" onClick={() => navigate(-1)}>
                        <strong><i className="bi bi-arrow-left text-3xl text-blue-900"></i></strong>
                    </div>
                    <h1 className="texto-titulo">Editar Projeto</h1>
                 </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className='texto-label'>Referência do Projeto</label>
                        <input
                            type="text"
                            className="input-padrao"
                            name="referenciaProjeto"
                            value={formData.referenciaProjeto}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='texto-label'>Empresa</label>
                        <input
                            type="text"
                            className="input-padrao"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='texto-label'>Objeto</label>
                        <textarea
                            className="input-padrao"
                            name="objeto"
                            value={formData.objeto}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='texto-label'>Descrição</label>
                        <textarea
                            className="input-padrao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='texto-label'>Coordenador</label>
                        <input
                            type="text"
                            className="input-padrao"
                            name="coordenador"
                            value={formData.coordenador}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='texto-label'>Valor</label>
                        <input
                            type="number"
                            className="input-padrao"
                            name="valor"
                            value={formData.valor}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='texto-label'>Data de Início</label>
                        <input
                            type="date"
                            className="input-padrao"
                            name="dataInicio"
                            value={formData.dataInicio}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='texto-label'>Data de Término</label>
                        <input
                            type="date"
                            className="input-padrao"
                            name="dataTermino"
                            value={formData.dataTermino}
                            onChange={handleInputChange}
                        />
                    </div>

                    {arquivosExistentes.length > 0 ? (
                        <div className="arquivos-container">
                            <p className='texto-label'>Arquivos Existentes</p>
                            {arquivosExistentes.map((arquivo) => (
                                <div className="arquivo-item" key={arquivo.id}>
                                    <p>{arquivo.nomeArquivo} ({arquivo.tipoDocumento})</p>
                                    <button
                                        type="button"
                                        className="botao-excluir"
                                        onClick={() => handleExcluirArquivo(arquivo.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='texto-label'>Ainda não há arquivos existentes</p>
                    )}

                    <h1 className='texto-titulo'>Adicionar Novo Arquivo</h1>
                    <div>
                        <label className='texto-label'>Propostas</label>
                        <input type="file" name="propostas" className='input-padrao' onChange={handleArquivoChange} />
                    </div>

                    <div>
                        <label className='texto-label'>Contratos</label>
                        <input type="file" name="contratos" className='input-padrao' onChange={handleArquivoChange} />
                    </div>
                    
                    <div>
                        <label className='texto-label'>Artigos</label>
                        <input type="file" name="artigos" className='input-padrao' onChange={handleArquivoChange} />
                    </div>

                    <div className="botoes-editar">
                        <button type="submit" className="botao-salvar">Salvar Alterações</button>
                        <button type="button" className="botao-cancelar" onClick={() => navigate(-1)}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarProjeto;
