import BotaoCTA from "../BotaoCTA/BotaoCTA";
import Aprovar from "./aprovar.svg";
import Lixeira from "./lixeira.svg";
import Visualizar from "./visualizar.svg";
import "./NotificacaoPedido.css";
import { useNavigate } from "react-router-dom";

interface PermissaoDto {
  id: number;
  adminSolicitanteId: number;
  adminNome: string;
  statusSolicitado: string;
  dataSolicitacao: string;
  dataAprovado?: string;
  admId: number;
  projetoId: number;
  informacaoProjeto: string;
  tipoAcao: string;
}

interface NotificacaoPedidoProps {
  pedido: PermissaoDto;
  onAprovar: (id: number) => void;
  onRejeitar: (id: number) => void;
}

function NotificacaoPedido({ pedido, onAprovar, onRejeitar }: NotificacaoPedidoProps) {
  const navigate = useNavigate();

  const handleVisualizar = (informacoesProjeto: string) => {
    navigate("/projeto/aceitar", { state: JSON.parse(informacoesProjeto) });
  };

  const tipoAcaoFormatado = (() => {
    if (pedido.tipoAcao === "Criacao") return "CRIAÇÃO";
    if (pedido.tipoAcao === "Editar") return "EDIÇÃO";
    if (pedido.tipoAcao === "Exclusao") return "EXCLUSÃO";
    return pedido.tipoAcao.toUpperCase();
  })();

  return (
    <div className="noped_container">
      <h1>{tipoAcaoFormatado}</h1>
      <div className="noped_hr"></div>
      <p>O administrador {pedido.adminNome} ID {pedido.adminSolicitanteId} solicitou a {tipoAcaoFormatado.toLowerCase()} de um projeto.</p>
      <div className="noped_baixo">
        <BotaoCTA img={Visualizar} escrito="Ver" aparencia="primario" onClick={() => handleVisualizar(pedido.informacaoProjeto)} />
        <div className="noped_baixo_dir">
          <BotaoCTA img={Aprovar} escrito="" aparencia="primario" cor="verde" onClick={() => onAprovar(pedido.id)} />
          <BotaoCTA img={Lixeira} escrito="" aparencia="primario" cor="vermelho" onClick={() => onRejeitar(pedido.id)} />
        </div>
      </div>
    </div>
  );
}

export default NotificacaoPedido;