import { useEffect, useState, useContext } from "react";
import "../styles/Relatorio.css";
import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import { Sidebar } from "../components/Sidebar/Sidebar";
import IconeBolsista from "../img/bolsistas.svg";
import IconeConvenio from "../img/convenio.svg";
import IconeMaterial from "../img/material.svg";
import IconeAnalise from "../img/analise.svg";
import IconeDownload from "../img/download.svg";
import CardBolsista from "../components/CardBolsista/CardBolsista";
import axios from "axios";
import { AuthContext } from "../hook/ContextAuth";

interface Bolsista {
    id: number;
    nome: string;
    areaAtuacao: string;
    projetoId: number;
    convenio: string;
    cidade: string;
    cpf: string;
    telefone: string;
    valorBolsa: string;
    duracaoBolsa: string;
}

const Relatorio = () => {
    const [bolsistas, setBolsistas] = useState<Bolsista[]>([]);
    const { adm } = useContext(AuthContext); // Acessa o contexto de autenticação para obter o token

    // Função para listar bolsistas
    const listarBolsistas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bolsistas/listar", {
                headers: {
                    Authorization: `Bearer ${adm?.token}`, // Cabeçalho de autorização com o token
                    "Content-Type": "application/json",
                },
            });
            setBolsistas(response.data);
        } catch (error) {
            console.error("Erro ao listar bolsistas:", error);
            alert("Erro ao listar bolsistas.");
        }
    };

    // Chama a função listarBolsistas quando o componente é montado
    useEffect(() => {
        listarBolsistas();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="rela_container">
                <p className="notif_titulo">Relatório Anual</p>
                
                <div className="rela_cadastro">
                    <h2 className="rela_titulo">Cadastros</h2>
                    <div className="rela_cadastro_baixo">
                        <div className="rela_cadastro_botao">
                            <img src={IconeBolsista} />
                            <p>Cadastrar Bolsista</p>
                        </div>
                        <div className="rela_cadastro_botao">
                            <img src={IconeConvenio} />
                            <p>Cadastrar Convênio</p>
                        </div>
                        <div className="rela_cadastro_botao">
                            <img src={IconeMaterial} />
                            <p>Cadastrar Material</p>
                        </div>
                        <div className="rela_cadastro_botao">
                            <img src={IconeAnalise} />
                            <p>Adicionar Análise</p>
                        </div>
                    </div>
                </div>

                <div className="rela_gerar">
                    <p>Clique no botão à direita para gerar e baixar um PDF com o relatório de toda a atividade do ano atual.</p>
                    <BotaoCTA img={IconeDownload} escrito="Baixar Relatório" aparencia="primario" cor="verde" />
                </div>

                <div className="rela_bolsistas">
                    <h2 className="rela_titulo">Bolsistas Cadastrados</h2>
                    {bolsistas.length > 0 ? (
                        bolsistas.map((bolsista) => (
                            <CardBolsista
                                key={bolsista.id}
                                id={bolsista.id}
                                nome={bolsista.nome}
                                areaAtuacao={bolsista.areaAtuacao}
                                projeto_id={bolsista.projetoId}
                                convenio={bolsista.convenio}
                                valorBolsa={bolsista.valorBolsa}
                                duracaoBolsa={bolsista.duracaoBolsa}
                                cidade={bolsista.cidade}
                                telefone={bolsista.telefone}
                                cpf={bolsista.cpf}
                            />
                        ))
                    ) : (
                        <p>Nenhum bolsista cadastrado.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Relatorio;
