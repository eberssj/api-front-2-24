import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { AuthContext } from "../hook/ContextAuth";

// Registrar componentes do gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EstatisticasBolsistas: React.FC = () => {
    const { adm } = useContext(AuthContext);
    const [numeroBolsistas, setNumeroBolsistas] = useState<number>(0);
    const [valorTotalBolsa, setValorTotalBolsa] = useState<number>(0);
    const [bolsistasPorArea, setBolsistasPorArea] = useState<{ [key: string]: number }>({});

    // Obter o número total de bolsistas
    const fetchNumeroBolsistas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bolsistas/numero", {
                headers: {
                    Authorization: `Bearer ${adm?.token}`,
                },
            });
            console.log("Resposta da API para número de bolsistas:", response.data);
            setNumeroBolsistas(response.data);
        } catch (error) {
            console.error("Erro ao buscar o número de bolsistas:", error);
        }
    };
    

    // Obter o valor total pago em bolsas
    // Obter o valor total pago em bolsas
    const fetchValorTotalBolsa = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bolsistas/valor-total", {
                headers: {
                    Authorization: `Bearer ${adm?.token}`,
                },
            });
            console.log("Resposta da API para valor total:", response.data);
            const valorTotal = isNaN(parseFloat(response.data)) ? 0 : parseFloat(response.data);
            setValorTotalBolsa(valorTotal);
        } catch (error) {
            console.error("Erro ao buscar o valor total pago em bolsas:", error);
        }
    };
    

    // Obter a quantidade de bolsistas por área de atuação
    const fetchBolsistasPorArea = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bolsistas/por-area", {
                headers: {
                    Authorization: `Bearer ${adm?.token}`,
                },
            });
            setBolsistasPorArea(response.data);
        } catch (error) {
            console.error("Erro ao buscar a quantidade de bolsistas por área:", error);
        }
    };

    // Carregar as informações ao montar o componente
    useEffect(() => {
        fetchNumeroBolsistas();
        fetchValorTotalBolsa();
        fetchBolsistasPorArea();
    }, []);

    // Configuração dos dados para o gráfico
    const data = {
        labels: Object.keys(bolsistasPorArea),
        datasets: [
            {
                label: "Quantidade de Bolsistas",
                data: Object.values(bolsistasPorArea),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Quantidade de Bolsistas por Área de Atuação",
            },
        },
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Estatísticas dos Bolsistas</h1>
            <div>
                <h2>Número Total de Bolsistas: {numeroBolsistas}</h2>
            </div>
            <div>
                <h2>Valor Total Pago em Bolsas: R$ {Number(valorTotalBolsa).toFixed(2)}</h2>
            </div>
            <div style={{ width: "80%", margin: "0 auto" }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default EstatisticasBolsistas;