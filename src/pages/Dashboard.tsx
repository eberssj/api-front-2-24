import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import '../styles/Dashboard.css';
import { Projeto } from '../Type/Projeto';
import axios from 'axios';

declare global {
    interface Window {
        google: any;
    }
}

const Dashboard = () => {
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

    useEffect(() => {
        const loadGoogleCharts = () => {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.onload = () => {
                if (window.google) {
                    window.google.charts.load('current', { packages: ['corechart'] });
                    window.google.charts.setOnLoadCallback(drawAllCharts);
                }
            };
            document.body.appendChild(script);
        };

        const chartOptions = {
            width: '100%',
            height: '100%',
            backgroundColor: { fill: 'transparent' },
            legend: { position: 'none' },
            bar: { groupWidth: '90%' }
        };

        const drawAllCharts = () => {
            if (window.google && projetos.length > 0) {
                drawChartCoordenador();
                drawChartFaixaOrcamentaria();
                drawChartSituacaoAtual();
                drawChartDataDeExecucao();
            }
        };

        const drawChartCoordenador = () => {
            const coordenadorCounts = projetos.reduce((acc, projeto) => {
                acc[projeto.coordenador] = (acc[projeto.coordenador] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const data = new window.google.visualization.arrayToDataTable([
                ['Coordenador', 'Quantidade de Projetos'],
                ...Object.entries(coordenadorCounts),
            ]);

            const chart = new window.google.visualization.ColumnChart(document.getElementById('chart_coordenador'));
            chart.draw(data, chartOptions);
        };

        const drawChartFaixaOrcamentaria = () => {
            const faixaOrcamentariaCounts = projetos.reduce((acc, projeto) => {
                const valor = parseFloat(projeto.valor);
                const faixa = valor < 10000 ? 'Até 10k' :
                    valor < 20000 ? '10k a 20k' :
                    valor < 30000 ? '20k a 30k' :
                    valor < 40000 ? '30k a 40k' :
                    valor < 50000 ? '40k a 50k' :
                    valor < 60000 ? '50k a 60k' :
                    valor < 70000 ? '60k a 70k' :
                    valor < 80000 ? '70k a 80k' :
                    valor < 90000 ? '80k a 90k' :
                    valor < 100000 ? '90k a 100k' : 'Acima de 100k';
                acc[faixa] = (acc[faixa] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const dataArray = [
                'Até 10k', '10k a 20k', '20k a 30k', '30k a 40k', '40k a 50k',
                '50k a 60k', '60k a 70k', '70k a 80k', '80k a 90k', '90k a 100k', 'Acima de 100k'
            ].map(faixa => [faixa, faixaOrcamentariaCounts[faixa] || 0]);

            const data = new window.google.visualization.arrayToDataTable([
                ['Faixa Orçamentária', 'Quantidade de Projetos'],
                ...dataArray,
            ]);

            const chart = new window.google.visualization.ColumnChart(document.getElementById('chart_faixaOrcamentaria'));
            chart.draw(data, chartOptions);
        };

        const drawChartSituacaoAtual = () => {
            const situacaoCounts = projetos.reduce((acc, projeto) => {
                const hoje = new Date();
                const dataTermino = projeto.dataTermino ? new Date(projeto.dataTermino[0], projeto.dataTermino[1] - 1, projeto.dataTermino[2]) : null;
                const situacao = dataTermino && dataTermino <= hoje ? 'Finalizado' : 'Em andamento';
                acc[situacao] = (acc[situacao] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const data = new window.google.visualization.arrayToDataTable([
                ['Situação Atual', 'Quantidade de Projetos'],
                ...Object.entries(situacaoCounts),
            ]);

            const chart = new window.google.visualization.ColumnChart(document.getElementById('chart_situacaoAtual'));
            chart.draw(data, chartOptions);
        };

        const drawChartDataDeExecucao = () => {
            const anoExecucaoCounts = projetos.reduce((acc, projeto) => {
                const ano = projeto.dataInicio ? projeto.dataInicio[0] : 'Desconhecido';
                acc[ano] = (acc[ano] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const data = new window.google.visualization.arrayToDataTable([
                ['Ano de Execução', 'Quantidade de Projetos'],
                ...Object.entries(anoExecucaoCounts),
            ]);

            const chart = new window.google.visualization.ColumnChart(document.getElementById('chart_dataDeExecucao'));
            chart.draw(data, chartOptions);
        };

        loadGoogleCharts();

        const handleResize = () => {
            drawAllCharts();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [projetos]);

    return (
        <div className="dash_container">
            <Sidebar />
            <div className="container-grafico">
                <h1 className="dash_titulo">Dashboard</h1>
                <div className="dash_secao">
                    <p>Coordenadores com mais participação em projetos</p>
                    <div id="chart_coordenador" className="chart"></div>
                </div>
                <div className="dash_secao">
                    <p>Faixa Orçamentária dos projetos</p>
                    <div id="chart_faixaOrcamentaria" className="chart"></div>
                </div>
                <div className="dash_secao">
                    <p>Situação atual dos projetos</p>
                    <div id="chart_situacaoAtual" className="chart"></div>
                </div>
                <div className="dash_secao">
                    <p>Ano de atividade dos projetos</p>
                    <div id="chart_dataDeExecucao" className="chart"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
