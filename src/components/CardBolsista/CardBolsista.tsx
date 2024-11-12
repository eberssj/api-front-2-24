import React, { useContext } from "react";
import IconeBolsista from "../../img/bolsistas.svg";
import IconeEditar from "../../img/editar.svg";
import IconeLixeira from "../../img/lixeira_branco.svg";
import "./CardBolsista.css";
import axios from "axios";
import { AuthContext } from "../../hook/ContextAuth";
import { useNavigate } from "react-router-dom";

interface CardBolsistaProps {
    id: number;
    nome: string;
    areaAtuacao: string;
    projeto_id: number;
    convenio: string;
    valorBolsa: string;
    duracaoBolsa: string;
    cidade: string;
    telefone: string;
    cpf: string;
}

const CardBolsista: React.FC<CardBolsistaProps> = ({
    id,
    nome,
    areaAtuacao,
    projeto_id,
    convenio,
    valorBolsa,
    duracaoBolsa,
    cidade,
    telefone,
    cpf,
}) => {

    const navigate = useNavigate();
    const { adm } = useContext(AuthContext); // Acessa o token do administrador autenticado

    // Função para excluir o bolsista
    const excluirBolsista = async () => {
        if (!window.confirm(`Tem certeza que deseja excluir o bolsista ${nome}?`)) {
            return;
        }

        try {
            // Corrigido para usar 'id' em vez de 'idBolsista'
            await axios.delete(`http://localhost:8080/bolsistas/deletar/${id}?idAdm=${adm?.id}`, {
                headers: {
                    Authorization: `Bearer ${adm?.token}`, // Cabeçalho de autorização com token
                    "Content-Type": "application/json",
                },
            });
            alert("Bolsista excluído com sucesso!");
            window.location.reload(); // Atualiza a página para refletir a exclusão
        } catch (error) {
            console.error("Erro ao excluir bolsista:", error);
            alert("Erro ao excluir bolsista.");
        }
    };

    return (
        <div className="cabo_container">
            <div className="cabo_info">
                <div className="cabo_esq">
                    <img src={IconeBolsista} alt="Ícone Bolsista" />
                </div>
                <div className="cabo_meio_1">
                    <p><span>Nome: </span>{nome}</p>
                    <p><span>Área Atuação: </span>{areaAtuacao}</p>
                    <p><span>Projeto: </span>{projeto_id}</p>
                </div>
                <div className="cabo_meio_2">
                    <p><span>Convênio: </span>{convenio}</p>
                    <p><span>Valor Bolsa: </span>{valorBolsa}</p>
                    <p><span>Duração Bolsa: </span>{duracaoBolsa}</p>
                </div>
                <div className="cabo_dir">
                    <p><span>Cidade: </span>{cidade}</p>
                    <p><span>Telefone: </span>{telefone}</p>
                    <p><span>CPF: </span>{cpf}</p>
                </div>
            </div>
            <div className="cabo_botoes">
                <div className="cabo_botoes botao" onClick={() => navigate(`/adm/bolsista/editar/${id}`)}>
                    <img src={IconeEditar} alt="Ícone Editar" />
                </div>
                <div className="cabo_botoes botao excluir" onClick={excluirBolsista}>
                    <img src={IconeLixeira} alt="Ícone Lixeira" />
                </div>
            </div>
        </div>
    );
};

export default CardBolsista;
