import BotaoCTA from "../BotaoCTA/BotaoCTA";
import "./NotificacaoPedido.css";
import Aprovar from "./aprovar.svg"
import Lixeira from "./lixeira.svg"
import Visualizar from "./visualizar.svg"

function NotificacaoPedido() {
  
  return (
    
   <div className="noped_container">

        <h1>EDIÇÃO</h1>
        
        <div className="noped_hr">
        </div>

        <p>Um administrador quer editar um projeto (ID 20)</p>
        <div className="noped_baixo">
            <BotaoCTA img={Visualizar} escrito="Ver" aparencia="primario" />
            <div className="noped_baixo_dir">
                <BotaoCTA img={Aprovar} escrito="" aparencia="primario" cor="verde" />
                <BotaoCTA img={Lixeira} escrito="" aparencia="primario" cor="vermelho" />
            </div>
        </div>
    </div>

  );
}

export default NotificacaoPedido;