import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import axios from 'axios';
import '../styles/InformacoesProjeto.css';

// Define types for your entities
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
    valor: number;
    dataInicio: number[];
    dataTermino: number[];
}

const InformacoesProjeto = () => {
    const location = useLocation();
    const projeto: Projeto = location.state; // Use the correct type here
    const navigate = useNavigate();
    const [arquivos, setArquivos] = useState<Arquivo[]>([]); // Define the type of arquivos

    useEffect(() => {
        axios.get(`http://localhost:8080/arquivos/projeto/${projeto.id}`)
            .then(response => setArquivos(response.data))
            .catch(error => console.error(error));
    }, [projeto.id]);

    // Define the correct types for arquivoId and nomeArquivo
    const downloadArquivo = (arquivoId: number, nomeArquivo: string) => {
        axios.get(`http://localhost:8080/arquivos/download/${arquivoId}`, {
            responseType: 'blob',
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

    // Define the correct type for dataArray as number[]
    const formatarData = (dataArray: number[]): string => {
        if (Array.isArray(dataArray) && dataArray.length === 3) {
            return new Date(dataArray[0], dataArray[1] - 1, dataArray[2]).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
        }
        return 'Data inválida';
    };

    return (
        <div className="container-principal">
            <Sidebar />
            <div className="formulario">
                <div className="cabecalho">
                    <strong onClick={() => navigate(-1)} className="link-voltar">
                        <i className="bi bi-arrow-left text-3xl text-blue-900"></i>
                    </strong>
                    <h1 className="texto-titulo">Informações do Projeto</h1>
                </div>
                <div className="container-informacoes">
                    <div>
                        <p className="titulo">Referência do projeto</p>
                        <p className="texto">{projeto.referenciaProjeto}</p>
                    </div>
                    <div>
                        <p className="titulo">Empresa</p>
                        <p className="texto">{projeto.empresa}</p>
                    </div>
                    <div>
                        <p className="titulo">Objeto</p>
                        <p className="texto">{projeto.objeto}</p>
                    </div>
                    <div>
                        <p className="titulo">Descrição</p>
                        <p className="texto">{projeto.descricao}</p>
                    </div>

                    <div>
                        <p className="titulo">Coordenador</p>
                        <p className="texto">{projeto.coordenador}</p>
                    </div>

                    <div>
                        <p className="titulo">Valor do Projeto</p>
                        <p className="texto">R${projeto.valor}</p>
                    </div>
                    <div>
                        <p className="titulo">Data de início</p>
                        <p className="texto">{formatarData(projeto.dataInicio)}</p>
                    </div>
                    <div>
                        <p className="titulo">Data de término</p>
                        <p className="texto">{formatarData(projeto.dataTermino)}</p>
                    </div>

                    <div>
                        <p className="titulo">Arquivos do projeto</p>
                        {arquivos.length > 0 ? (
                            <div className="arquivos-container">
                                {arquivos.map(arquivo => (
                                    <div className="arquivo-item" key={arquivo.id}>
                                        <p className="arquivo-tipo">{arquivo.tipoDocumento}</p>
                                        <button className="arquivo-botao" onClick={() => downloadArquivo(arquivo.id, arquivo.nomeArquivo)}>
                                            {arquivo.nomeArquivo}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum arquivo disponível.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformacoesProjeto;
