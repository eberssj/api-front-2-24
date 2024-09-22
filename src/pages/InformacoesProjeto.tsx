import { Link, useLocation } from 'react-router-dom';
import { Projeto } from '../Type/Projeto';
import { Sidebar } from '../components/Sidebar/Sidebar';

const InformacoesProjeto = () => {
    const location = useLocation();
    const projeto: Projeto = location.state;

    const formatarData = (dataArray: number[]) => {
        if (Array.isArray(dataArray) && dataArray.length === 3) {
            return new Date(dataArray[0], dataArray[1] - 1, dataArray[2]).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
        }
        return 'Data inválida';
    };

    return (
        <div className="container-principal">
        <Sidebar />
          <div className="formulario">
          <div className="cabecalho">
              <Link to="/adm/projetos" className="link-voltar">
                <strong><i className="bi bi-arrow-left text-3xl text-blue-900"></i></strong>
              </Link>
              <h1 className="texto-titulo">Informações do Projeto</h1>
            </div>
            <div className='container-informacoes'>
                <div>
                    <p className='titulo'>Referência do projeto</p>
                    <p className='texto'>{projeto.referenciaProjeto}</p>
                </div>
                <div>
                    <p className='titulo'>Empresa</p>
                    <p className='texto'>{projeto.empresa}</p>
                </div>
                <div>
                    <p className='titulo'>Objeto</p>
                    <p className='texto'>{projeto.objeto}</p>
                </div>
                <div>
                    <p className='titulo'>Descrição</p>
                    <p className='texto'>{projeto.descricao}</p>
                </div>

                <div>
                    <p className='titulo'>Coordenador</p>
                    <p className='texto'>{projeto.coordenador}</p>
                </div>
    
                <div>
                    <p className='titulo'>Valor do Projeto</p>
                    <p className='texto'>R${projeto.valor}</p>
                </div>
                <div>
                    <p className='titulo'>Data de início</p>
                    <p className='texto'>{formatarData(projeto.dataInicio)}</p>
                </div>
                <div>
                    <p className='titulo'>Data de término</p>
                    <p className='texto'>{formatarData(projeto.dataTermino)}</p>
                </div>
    
                <div>
                    <p className='titulo'>Propostas/Relatórios Técnicos</p>
                    <p>{projeto.propostaRelatorio}</p>
                </div>
                <div>
                    <p className='titulo'>Contratos</p>
                    <p>{projeto.contrato}</p>
                </div>
                <div>
                    <p className='titulo'>Artigos</p>
                    <p>{projeto.artigo}</p>
                </div>
            </div>
            </div>
      </div>
    );
};

export default InformacoesProjeto;
