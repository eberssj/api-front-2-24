import "../styles/Relatorio.css";
import BotaoCTA from "../components/BotaoCTA/BotaoCTA";

import { Sidebar } from "../components/Sidebar/Sidebar";
import IconeBolsista from "../img/bolsistas.svg";
import IconeConvenio from "../img/convenio.svg";
import IconeMaterial from "../img/material.svg";
import IconeAnalise from "../img/analise.svg";
import IconeDownload from "../img/download.svg";
import CardBolsista from "../components/CardBolsista/CardBolsista";

const Relatorio = () => {

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
            <CardBolsista
                nome="João Silva"
                areaAtuacao="DSM"
                projeto_id={12}
                convenio="Convênio ABC"
                valorBolsa="R$ 1.500,00"
                duracaoBolsa="12 meses"
                cidade="São Paulo"
                telefone="(11) 1234-5678"
                cpf="123.456.789-00"
            />
        </div>

      </div>
    </>
  );
};

export default Relatorio;