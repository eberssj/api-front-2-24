import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./NotificacaoAlerta.css";

interface NotificacaoAlertaProps {
  id: number;
  dataInicio: number[];
  dataTermino: number[];
  diasParaVencer: number;
}

const formatarDataParaVisualizacao = (dataArray: number[]) => {
  if (Array.isArray(dataArray) && dataArray.length === 3) {
    const [ano, mes, dia] = dataArray.map(num => String(num).padStart(2, '0'));
    return `${dia}/${mes}/${ano}`;
  }
  return '';
};

const NotificacaoAlerta: React.FC<NotificacaoAlertaProps> = ({ id, dataInicio, dataTermino, diasParaVencer }) => {
  const navigate = useNavigate();

  return (
    <div className="noale_container">
      <div className="noale_cima">
        <h1 onClick={() => navigate(`/projeto/editar/${id}`)}>PROJETO ID {id}</h1>
      </div>
      <div className="noale_hr"></div>
      <p className="noale_aviso">{diasParaVencer === 0 ? "Este projeto vencerá HOJE." : `Este projeto vencerá em ${diasParaVencer} dia(s).`} </p>
      <p>Data de Início: {formatarDataParaVisualizacao(dataInicio)}</p>
      <p>Data de Término: {formatarDataParaVisualizacao(dataTermino)}</p>
    </div>
  );
};

export default NotificacaoAlerta;