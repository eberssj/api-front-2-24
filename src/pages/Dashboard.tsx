import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import '../styles/Dashboard.css';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';

const Dashboard = () => {
    const [projetos, setProjetos] = useState([]);
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

    // Dados para gráficos
    const coordenadorData = {
        labels: projetos.map(projeto => projeto.coordenador),
        datasets: [
            {
                label: 'Valores dos Projetos',
                data: projetos.map(projeto => projeto.valor),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const faixaOrcamentariaData = {
        labels: projetos.map(projeto => projeto.coordenador),
        datasets: [
            {
                label: 'Faixa Orçamentária',
                data: projetos.map(projeto => projeto.valor),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const datasExecucaoData = {
        labels: projetos.map(projeto => new Date(projeto.data_inicio).toLocaleDateString('pt-BR')),
        datasets: [
            {
                label: 'Data de Início',
                data: projetos.map(projeto => new Date(projeto.data_inicio).getTime()),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="dashboard-container-principal-projetos">
            <Sidebar />
            <div className="dashboard-container-input">
                <h1>Selecione um filtro</h1>
                <select
                    value={filtro}
                    onChange={handleFiltroChange}
                    className="dashboard-select"
                >
                    <option value="">Escolha uma opção</option>
                    <option value="coordenador">Coordenador</option>
                    <option value="faixaOrcamentaria">Faixa Orçamentária</option>
                    <option value="datasExecucao">Datas de Execução</option>
                </select>

                {/* O conteúdo filtrado será mostrado aqui */}
                <div className="dashboard-graficos-container">
                    {filtro === 'coordenador' && (
                        <div>
                            <h2>Gráfico de Coordenadores</h2>
                            <Bar data={coordenadorData} />
                        </div>
                    )}
                    {filtro === 'faixaOrcamentaria' && (
                        <div>
                            <h2>Gráfico de Faixa Orçamentária</h2>
                            <Bar data={faixaOrcamentariaData} />
                        </div>
                    )}
                    {filtro === 'datasExecucao' && (
                        <div>
                            <h2>Gráfico de Datas de Execução</h2>
                            <Line data={datasExecucaoData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
