import "../styles/Historico.css";
import { Sidebar } from "../components/Sidebar/Sidebar";
import IconePesquisar from "../img/pesquisar_cinza.svg";
import IconeSeta from "../img/seta_data.svg"



const Historico = () => {

    return (
        <>
            <Sidebar />
            <div className="hist_container">
                <h2 className="notif_titulo">Histórico de Ações</h2>

                <div className="hist_cima">
                    <div className="hist_pesquisa">
                        <h2>BARRA DE BUSCA</h2>
                        <div className="hist_pesquisa_barra">
                            <div className="hist_pesquisa_esq">
                                <img src={IconePesquisar} />
                            </div>
                            <input type="text" placeholder="Pesquise por um admin ou ID de projeto..."></input>
                        </div>
                    </div>
                    <div className="hist_datas">
                        <div>
                            <h2>INÍCIO</h2>
                            <input type="date" />
                        </div>
                        <img src={IconeSeta} />
                        <div>
                            <h2>FIM</h2>
                            <input type="date" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Historico;
