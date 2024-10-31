import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import axios from 'axios';
import '../styles/InformacoesProjeto.css';
import { AuthContext } from '../hook/ContextAuth'; // Importando o contexto de autenticação
import { Toast } from '../components/Swal/Swal';
import Swal from 'sweetalert2';
import BotaoCTA from '../components/BotaoCTA/BotaoCTA';

interface Arquivo {
    id: number;
    nomeArquivo: string;
    tipoDocumento: string;
}

interface Projeto {
    id: number;
    referenciaProjeto: string;
    empresa: string;
    objeto: string;
    descricao: string;
    coordenador: string;
    ocultarValor: boolean;
    ocultarEmpresa: boolean;
    valor: number;
    dataInicio: number[];
    dataTermino: number[];
}

const InformacoesProjeto = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const projeto: Projeto = location.state; // Obtem o projeto da navegação
    const [arquivos, setArquivos] = useState<Arquivo[]>([]); // Estado para armazenar os arquivos
    const { adm } = useContext(AuthContext); // Utilizando o contexto de autenticação para pegar o token do admin

    useEffect(() => {
        // Requisição para obter os arquivos do projeto
        axios.get(`http://localhost:8080/arquivos/projeto/${projeto.id}`, {
            headers: {
                Authorization: `Bearer ${adm?.token}` // Passando o token do administrador no cabeçalho da requisição
            }
        })
            .then(response => setArquivos(response.data))
            .catch(error => console.error(error));
    }, [projeto.id, adm]);

    const downloadArquivo = (arquivoId: number, nomeArquivo: string) => {
        // Requisição para download de arquivo
        axios.get(`http://localhost:8080/arquivos/download/${arquivoId}`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${adm?.token}` // Passando o token para autenticação
            }
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nomeArquivo);
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {
            console.error('Error downloading file:', error);
        });
    };

    const formatarData = (dataArray: number[]): string => {
        // Função para formatar a data no formato dd/mm/yyyy
        if (Array.isArray(dataArray) && dataArray.length === 3) {
            return new Date(dataArray[0], dataArray[1] - 1, dataArray[2]).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
        }
        return 'Data inválida';
    };

    const formatarValor = (valor: number | string) => {
        const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor;
        return valorNumerico.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).replace(/\s/g, ''); // Remove espaços
    };    


    const deletarProjeto = () => {

        Swal.fire({
            title: 'Deseja deletar o projeto?',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
            width: 410,
            confirmButtonColor: 'rgb(255, 0, 53)',
            denyButtonColor: 'rgb(0,114,187)',
            heightAuto: false,
            backdrop: true,
            customClass: {
            confirmButton: 'cButton',
            denyButton: 'dButton',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/projeto/excluir/${projeto.id}`, {
                    headers: {
                    Authorization: `Bearer ${adm?.token}`
                    }
            })
            .then(() => {
                Toast.fire({
                icon: 'success',
                title: 'Projeto deletado com sucesso!'
                });
                navigate("/");
            })
            .catch(error => console.error('Erro ao deletar o projeto:', error));
            }
        });
    };
    
    

    const editarProjeto = () => {
        // Navegação para a página de edição do projeto
        navigate(`/projeto/editar/${projeto.id}`);
    };

    return (
        <>
        <Sidebar />

        <div className="infopro_container">
            <div className="infopro_cima">
                <h1 className="infopro_titulo">Informações do Projeto</h1>
                <div className="infopro_cima_dir">
                { adm && (
                    <>
                    <BotaoCTA img="/src/img/lixeira.svg" escrito="Deletar" aparencia="secundario" cor="vermelho" onClick={deletarProjeto} />
                    <BotaoCTA img="/src/img/editar_projeto.svg" escrito="Editar" aparencia="secundario" cor="cor_primario"  onClick={editarProjeto} />
                    </>
                )}
                <BotaoCTA img="/src/img/voltar.svg" escrito="Voltar" aparencia="primario" onClick={() => navigate(-1)} />
                </div>
            </div>

                <div className="infopro_info">
                    <div>
                        <p className="infopro_info_titulo">Referência do projeto</p>
                        <p className="infopro_info_texto">{projeto.referenciaProjeto}</p>
                    </div>

                    { adm ? (
                        <div>
                            <p className="infopro_info_titulo">Empresa</p>
                            <p className="infopro_info_texto">{projeto.empresa}</p>
                        </div>
                    ) : (
                        <div>
                            <p className="infopro_info_titulo">Empresa</p>
                            <p className="infopro_info_texto">{projeto.ocultarEmpresa ? 'EMPRESA OCULTADA PARA O PÚBLICO' : projeto.empresa}</p>
                        </div>
                    )}

                    <div>
                        <p className="infopro_info_titulo">Objeto</p>
                        <p className="infopro_info_texto">{projeto.objeto}</p>
                    </div>
                    <div>
                        <p className="infopro_info_titulo">Descrição</p>
                        <p className="infopro_info_texto">{projeto.descricao}</p>
                    </div>

                    <div>
                        <p className="infopro_info_titulo">Coordenador</p>
                        <p className="infopro_info_texto">{projeto.coordenador}</p>
                    </div>

                    { adm ? (
                        <div>
                            <p className="infopro_info_titulo">Valor do Projeto</p>
                            <p className="infopro_info_texto">{formatarValor(projeto.valor)}</p>
                        </div>
                    ) : (
                        <div>
                            <p className="infopro_info_titulo">Valor do Projeto</p>
                            <p className="infopro_info_texto">{projeto.ocultarValor ? 'VALOR OCULTADO PARA O PÚBLICO' : formatarValor(projeto.valor)}</p>
                        </div>
                    )}

                    <div>
                        <p className="infopro_info_titulo">Data de início</p>
                        <p className="infopro_info_texto">{formatarData(projeto.dataInicio)}</p>
                    </div>
                    <div>
                        <p className="infopro_info_titulo">Data de término</p>
                        <p className="infopro_info_texto">{formatarData(projeto.dataTermino)}</p>
                    </div>

                    {/* Lista de arquivos */}
                    <div>
                        <p className="infopro_info_titulo cima">Arquivos do projeto</p>
                        {arquivos.length > 0 ? (
                            <div className="infopro_arquivos_container">
                                {arquivos.map(arquivo => (
                                    <div className="infopro_arquivo_item" key={arquivo.id} onClick={() => downloadArquivo(arquivo.id, arquivo.nomeArquivo)}>
                                        <h2>{arquivo.tipoDocumento}</h2>
                                        <p>{arquivo.nomeArquivo}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="infopro_nenhum">Nenhum arquivo disponível.</p>
                        )}
                    </div>
            </div>
        </div>
        </>
    );
};

export default InformacoesProjeto;
