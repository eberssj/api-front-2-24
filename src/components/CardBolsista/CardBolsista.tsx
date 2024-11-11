import React from 'react';
import IconeBolsista from "../../img/bolsistas.svg";
import IconeEditar from '../../img/editar.svg';
import IconeLixeira from '../../img/lixeira_branco.svg';
import "./CardBolsista.css";

interface CardBolsistaProps {
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
    nome,
    areaAtuacao,
    projeto_id,
    convenio,
    valorBolsa,
    duracaoBolsa,
    cidade,
    telefone,
    cpf
}) => {
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
                <div className="cabo_botoes botao">
                    <img src={IconeEditar} alt="Ícone Editar" />
                </div>
                <div className="cabo_botoes botao excluir">
                    <img src={IconeLixeira} alt="Ícone Lixeira" />
                </div>
            </div>
        </div>
    );
};

export default CardBolsista;