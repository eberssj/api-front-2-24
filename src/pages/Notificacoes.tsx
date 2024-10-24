import NotificacaoPedido from '../components/NotificacaoPedido/NotificacaoPedido';
import NotificacaoAlerta from '../components/NotificacaoAlerta/NotificacaoAlerta';
import { Sidebar } from '../components/Sidebar/Sidebar';
import '../styles/Notificacoes.css';

const Notificacoes = () => {
    
    return (

        <div className="notif_container">

            <Sidebar />

            <h1 className="notif_titulo">Notificações</h1>
        
        <div className="notif_meio">
            <div className="notif_meio_esq">
                <h2 className="notif_subtitulo" >Pedidos de Alteração</h2>
                <NotificacaoPedido />
                <NotificacaoPedido />
                <NotificacaoPedido />
            </div>
            <div className="notif_divisoria">
            </div>
            <div className="notif_meio_dir">
            <h2 className="notif_subtitulo" >Alertas de Vencimento</h2>
                <NotificacaoAlerta />
            </div>
        </div>

        </div>
    );
};

export default Notificacoes;
