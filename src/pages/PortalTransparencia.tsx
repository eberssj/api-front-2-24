import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import '../styles/PortalTransparencia.css';
import { Projeto } from "../Type/Projeto";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PortalTransparencia = () => {
    const navigate = useNavigate();
    const [projetos, setProjetos] = useState<Projeto[]>([]);

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

    return (
        <div className="container-principal">
            <Sidebar />
            <div className="container-texto">
                <h1>Fundação de Apoio à Pesquisa de Pós-Graduandos (FAPG)</h1>
                <p>A Fundação vem com o objetivo de trazer transformações importantes para o meio acadêmico, e busca conseguir isso com a obstinação dos seus dirigentes <br /> e funcionários no sentido de torná-la sempre mais ágil e precisa.</p>
                <br />
                {projetos.length > 0 ? (
                    <>
                        <p>Abaixo estão todos os projetos desenvolvidos.</p>
                        <br />
                        <div className="container-projetos-externo">
                            <div>
                                {projetos.map((projeto) => (
                                    <div className="container-projeto" key={projeto.id}>
                                        <div className="itens-esquerda">
                                            <p><strong>Referência do projeto:</strong> {projeto.referenciaProjeto}</p>
                                            <p><strong>Coordenador:</strong> {projeto.coordenador}</p>
                                            <p><strong>Valor:</strong> R$:{projeto.valor}</p>
                                        </div>
                                        <div className="itens-meio">
                                            <p><strong>Início:</strong> {formatarData(projeto.dataInicio)}</p>
                                            <p><strong>Término:</strong> {formatarData(projeto.dataTermino)}</p>
                                        </div>
                                        <div className="itens-direita cursor-pointer" onClick={() => navigate(`/projeto/${projeto.id}`, { state: projeto })}>
                                            <i className="bi bi-file-earmark-text"></i>
                                            <p><strong>Detalhes</strong></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No momento ainda não há projetos.</p>
                )}
            </div>
        </div>
    );
};

export default PortalTransparencia;
