import { Sidebar } from "../components/Sidebar/Sidebar"
import '../styles/PortalTransparencia.css';

const PortalTransparencia = () => {

    return (
        <div className="container-principal">
            <Sidebar />
            <div className="container-texto">
                <h1>Fundação de Apoio à Pesquisa de Pós-Graduandos(FAPG)</h1>
                <p>A Fundação vem com o objetivo de trazer transformações importantes para o  meio acadêmico, e busca conseguir isso com a obstinação dos seus  dirigentes <br /> e funcionários no sentido de torná-la sempre mais ágil e  precisa</p>
            
                <br />
            
                <p>Abaixo estão todos os projetos desenvolvidos.</p>
            </div>

            <div className="container-projetos-externo">
                <div className="container-projeto">
                    <div className="itens-esquerda">
                        <p><strong>Refêrencia do projeto:</strong> Capacitação na Modalidade Online em “Operações em Processos Siderúrgicos”</p>
                        <p><strong>Coordenador:</strong> João Maurício Godoy</p>
                        <p><strong>Valor:</strong> R$12345,90</p>
                    </div>
                    <div className="itens-meio">
                        <p><strong>Início:</strong> dd/mm/aaaa</p>
                        <p><strong>Término:</strong> dd/mm/aaaa</p>
                    </div>
                    <div className="itens-direita">
                        <i className="bi bi-file-earmark-text"></i>
                        <p><strong>Detalhes</strong></p>
                    </div>
                </div>

                <div className="container-projeto">
                    <div className="itens-esquerda">
                        <p><strong>Refêrencia do projeto:</strong> Capacitação na Modalidade Online em “Operações em Processos Siderúrgicos”</p>
                        <p><strong>Coordenador:</strong> João Maurício Godoy</p>
                        <p><strong>Valor:</strong> R$12345,90</p>
                    </div>
                    <div className="itens-meio">
                        <p><strong>Início:</strong> dd/mm/aaaa</p>
                        <p><strong>Término:</strong> dd/mm/aaaa</p>
                    </div>
                    <div className="itens-direita">
                        <i className="bi bi-file-earmark-text"></i>
                        <p><strong>Detalhes</strong></p>
                    </div>
                </div>

                <div className="container-projeto">
                    <div className="itens-esquerda">
                        <p><strong>Refêrencia do projeto:</strong> Capacitação na Modalidade Online em “Operações em Processos Siderúrgicos”</p>
                        <p><strong>Coordenador:</strong> João Maurício Godoy</p>
                        <p><strong>Valor:</strong> R$12345,90</p>
                    </div>
                    <div className="itens-meio">
                        <p><strong>Início:</strong> dd/mm/aaaa</p>
                        <p><strong>Término:</strong> dd/mm/aaaa</p>
                    </div>
                    <div className="itens-direita">
                        <i className="bi bi-file-earmark-text"></i>
                        <p><strong>Detalhes</strong></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortalTransparencia