import React, { useContext } from "react";
import IconeConvenio from "../../img/convenio.svg";
import IconeEditar from "../../img/editar.svg";
import IconeLixeira from "../../img/lixeira_branco.svg";
import "./CardConvenio.css";
import axios from "axios";
import { AuthContext } from "../../hook/ContextAuth";
import { useNavigate } from "react-router-dom";

interface CardConvenioProps {
    id: number;
    nome: string;
    tipoConvenio: string;
    objetivo: string;
    instituicao: string;
    prazo: string;
}

const CardConvenio: React.FC<CardConvenioProps> = ({
    id,
    nome,
    tipoConvenio,
    objetivo,
    instituicao,
    prazo
}) => {

    const navigate = useNavigate();
    const { adm } = useContext(AuthContext); // Acessa o token do administrador autenticado

    // Função para excluir o Convenio
    const excluirConvenio = async () => {
        if (!window.confirm(`Tem certeza que deseja excluir o Convênio ${nome}?`)) {
            return;
        }

        try {
            // Corrigido para usar 'id' em vez de 'idConvenio'
            await axios.delete(`http://localhost:8080/convenio/deletar/${id}?idAdm=${adm?.id}`, {
                headers: {
                    Authorization: `Bearer ${adm?.token}`, // Cabeçalho de autorização com token
                    "Content-Type": "application/json",
                },
            });
            alert("Convenio excluído com sucesso!");
            window.location.reload(); // Atualiza a página para refletir a exclusão
        } catch (error) {
            console.error("Erro ao excluir Convenio:", error);
            alert("Erro ao excluir Convenio.");
        }
    };

    return (
        <div className="caco_container">
            <div className="caco_info">
                <div className="caco_esq">
                    <div className="caco_esq_info">
                        <img className="caco_esq_icone" src={IconeConvenio} alt="Ícone Convenio" />
                        <p>{instituicao}</p>
                    </div>
                    <div className="caco_botoes">
                        <div className="caco_botoes botao" onClick={() => navigate(`/adm/Convenio/editar/${id}`)}>
                            <img src={IconeEditar} alt="Ícone Editar" />
                        </div>
                    <div className="caco_botoes botao excluir" onClick={excluirConvenio}>
                        <img src={IconeLixeira} alt="Ícone Lixeira" />
                    </div>
            </div>
                </div>
                <div className="caco_baixo">
                    <p><span>Nome: </span>{nome}</p>
                    <p><span>Tipo: </span>{tipoConvenio}</p>
                    <p><span>Prazo: </span>{prazo}</p>
                    <p><span>Objetivo: </span>{objetivo}</p>
                </div>
            </div>
        </div>
    );
};

export default CardConvenio;
