import { useContext, useEffect, useState } from "react";
import BotaoCTA from "../BotaoCTA/BotaoCTA";
import Aprovar from "./aprovar.svg";
import Lixeira from "./lixeira.svg";
import Visualizar from "./visualizar.svg";
import axios from "axios";
import "./NotificacaoPedido.css";
import { AuthContext } from "../../hook/ContextAuth";
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

function NotificacaoPedido() {
  const [pedidos, setPedidos] = useState<PermissaoDto[]>([]);
  const { adm } = useContext(AuthContext); // Obtém o token do administrador
  const navigate = useNavigate()

  useEffect(() => {
    if (!adm || !adm.token) {
      alert("Token não encontrado ou usuário não autenticado");
      return;
    }

    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/permissao/pedidos", {
          headers: {
            'Authorization': `Bearer ${adm.token}`, // Passa o token no header
          },
        });
        setPedidos(response.data);
      } catch (error: any) {
        alert("Erro ao buscar dados dos pedidos: " + error.message);
        if (axios.isAxiosError(error) && error.response) {
          alert("Detalhes do erro: " + JSON.stringify(error.response.data));
        } else {
          console.error("Erro desconhecido:", error);
        }
      }
    };

    fetchPedidos();
  }, [adm]);

  const handleAprovar = async (id: number) => {
    try {
      await axios.post(`http://localhost:8080/permissao/aceitar/${id}`, null, {
        headers: {
          'Authorization': `Bearer ${adm?.token}`,
        },
        params: {
          adminAprovadorId: adm?.id, // Passa o ID do administrador aprovador
        },
      });
      alert("Pedido aprovado com sucesso!");

      // Atualiza a lista de pedidos após a aprovação
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));
    } catch (error: any) {
      alert("Erro ao aprovar o pedido: " + error.message);
      if (axios.isAxiosError(error) && error.response) {
        alert("Detalhes do erro: " + JSON.stringify(error.response.data));
      }
    }
  };

  if (pedidos.length === 0) {
    return <p>No momento ainda não há pedidos de alteração</p>;
  }

  const handleVisualizar = (informacoesProjeto: string) => {
    navigate("/projeto/aceitar", { state: JSON.parse(informacoesProjeto) })
  };

  return (
    <div className="noped_container">
      {pedidos.map((pedido) => {
        const tipoAcaoFormatado = pedido.tipoAcao === "Criacao" ? "CRIAÇÃO" : pedido.tipoAcao.toUpperCase();

        return (
          <div key={pedido.id} className="noped_item">
            <h1>{tipoAcaoFormatado}</h1>
            <div className="noped_hr"></div>
            <p>O administrador {pedido.adminNome} (ID {pedido.adminSolicitanteId}) quer {tipoAcaoFormatado.toLowerCase()} um novo projeto.</p>
            <div className="noped_baixo">
              <BotaoCTA img={Visualizar} escrito="Ver" aparencia="primario" onClick={() => handleVisualizar(pedido.informacaoProjeto)}  />
              <div className="noped_baixo_dir">
                <BotaoCTA
                  img={Aprovar}
                  escrito=""
                  aparencia="primario"
                  cor="verde"
                  onClick={() => handleAprovar(pedido.id)}
                />
                <BotaoCTA img={Lixeira} escrito="" aparencia="primario" cor="vermelho" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NotificacaoPedido;
