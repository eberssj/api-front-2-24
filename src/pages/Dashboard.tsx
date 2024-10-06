import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Projeto } from '../Type/Projeto';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [filtro, setFiltro] = useState<string>('');

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

    const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFiltro(e.target.value);
    };

    return (
        <div className="container-principal-projetos">
            <Sidebar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', width: '100%' }}>
                <h1>Selecione um filtro</h1>
                <select
                    value={filtro}
                    onChange={handleFiltroChange}
                    style={{ padding: '10px', fontSize: '16px', width: '300px', textAlign: 'center', marginBottom: '20px' }}
                >
                    <option value="">Escolha uma opção</option>
                    <option value="coordenador">Coordenador</option>
                    <option value="dataExecucao">Data de Execução</option>
                    <option value="classificacao">Classificação</option>
                    <option value="situacaoAtual">Situação Atual</option>
                    <option value="faixaOrcamentaria">Faixa Orçamentária</option>
                </select>

                {/* O conteúdo filtrado será mostrado aqui */}
                <div style={{ marginTop: '20px' }}>
                    <p>Aqui será exibido o conteúdo baseado na escolha do filtro: {filtro}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
