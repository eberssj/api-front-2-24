import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import '../styles/Projetos.css';
import { useNavigate } from 'react-router-dom';
import { Projeto } from '../Type/Projeto';
import axios from 'axios';

const Projetos = () => {
    const navigate = useNavigate();
    const [projetos, setProjetos] = useState<Projeto[]>([]);

    const formatarData = (dataArray: number[]) => {
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

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/projeto/listar');
                setProjetos(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProjetos();
    }, []);

    return (
        <div className="container-principal">
            <Sidebar />
            {projetos.length > 0 ? (
                <div className="container-externo">
                    <div>
                        {projetos.map((projeto) => (
                            <div className="container-projeto" key={projeto.id}>
                                <div className="itens-esquerda">
                                    <p><strong>Referência do projeto:</strong> {projeto.referenciaProjeto}</p>
                                    <p><strong>Coordenador:</strong> {projeto.coordenador}</p>
                                    <p><strong>Valor:</strong> {formatarValor(projeto.valor)}</p>
                                </div>
                                <div className='agrupar-meio-esquerda'>
                                    <div className="itens-meio">
                                        <p><strong>Início:</strong> {formatarData(projeto.dataInicio)}</p>
                                        <p><strong>Término:</strong> {formatarData(projeto.dataTermino)}</p>
                                    </div>
                                    <div className="itens-direita cursor-pointer" onClick={() => navigate(`/projeto/${projeto.id}`, { state: projeto })}>
                                        <i className="bi bi-file-earmark-text"></i>
                                        <p><strong>Detalhes</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="conteudo-projetos">
                    <div className="sem-projetos">
                        <p>Ainda não há projetos cadastrados</p>
                    </div>
                </div>
            )}
            <button
                onClick={() => navigate('/adm/cadastrar-projeto')}
                className="botao-novo-projeto">
                Novo projeto
            </button>
        </div>
    );
};

export default Projetos;
