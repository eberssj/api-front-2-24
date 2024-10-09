/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const [filtro, setFiltro] = useState<string>('coordenador'); // Filtro padrão para coordenador

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

    useEffect(() => {
        // Carregar a biblioteca de gráficos do Google
        const loadGoogleCharts = () => {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.onload = () => {
                if (window.google) {
                    window.google.charts.load('current', { packages: ['bar'] });
                    window.google.charts.setOnLoadCallback(drawChart);
                }
            };
            document.body.appendChild(script);
        };

        const drawChart = () => {
            if (window.google && projetos.length > 0) {
                // Definir os dados do gráfico com base no filtro selecionado
                let data;
                const options = {
                    width: 800,
                    height: 600,
                    legend: { position: 'none' },
                    bar: { groupWidth: "90%" }
                };

                if (filtro === 'coordenador') {
                    // Agrupar por coordenador
                    const coordenadorCounts: Record<string, number> = projetos.reduce((acc, projeto) => {
                        acc[projeto.coordenador] = (acc[projeto.coordenador] || 0) + 1;
                        return acc;
                    }, {} as Record<string, number>);
                    data = new window.google.visualization.arrayToDataTable([
                        ['Coordenador', 'Quantidade de Projetos'],
                        ...Object.entries(coordenadorCounts),
                    ]);
                } else if (filtro === 'faixaOrcamentaria') {
                    // Agrupar por faixa orçamentária
                    const faixaOrcamentariaCounts: Record<string, number> = projetos.reduce((acc, projeto) => {
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

                    // Definir a ordem fixa das faixas
                    const faixasOrcamentarias = [
                        'Até 10k', '10k a 20k', '20k a 30k', '30k a 40k', '40k a 50k',
                        '50k a 60k', '60k a 70k', '70k a 80k', '80k a 90k', '90k a 100k', 'Acima de 100k'
                    ];

                    // Preencher valores ausentes com zero
                    const dataArray = faixasOrcamentarias.map(faixa => [faixa, faixaOrcamentariaCounts[faixa] || 0]);

                    data = new window.google.visualization.arrayToDataTable([
                        ['Faixa Orçamentária', 'Quantidade de Projetos'],
                        ...dataArray,
                    ]);
                }
                
                
                const chart = new window.google.charts.Bar(document.getElementById('chart_div'));
                chart.draw(data, window.google.charts.Bar.convertOptions(options));
            }
        };

        loadGoogleCharts();
    }, [projetos, filtro]); // Redesenhar gráfico quando os projetos ou o filtro mudarem

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
                    <option value="coordenador">Coordenador</option>
                    <option value="faixaOrcamentaria">Faixa Orçamentária</option>
                    <option value="data">Data</option>
                </select>

                {/* Div que contém o gráfico */}
                <div id="chart_div" style={{ marginTop: '50px' }}></div>
            </div>
        </div>
    );
};

export default Dashboard;