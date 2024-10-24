import "./NotificacaoAlerta.css";
import Fechar from "./fechar.svg"

function NotificacaoAlerta() {
  
  return (
    
   <div className="noale_container">

        <div className="noale_cima">
          <h1>PROJETO ID 42</h1>
          <img src={Fechar} />
        </div>
        
        <div className="noale_hr">
        </div>

        <p className="noale_aviso">Este projeto vencerá em um dia.</p>

        <p>Data de Início: 20/10/2022</p>
        <p>Data de Término: 25/4/2024</p>

    </div>

  );
}

export default NotificacaoAlerta;