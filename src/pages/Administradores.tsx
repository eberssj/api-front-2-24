import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/Administradores.css"

export const Administradores = () => {
    return (
        <div className="container-principal">
            <Sidebar />
            <div className="container-externo">
                <div className="container-adm">
                    <div className="container-info">
                        <p><strong className="strong">Nome:</strong> Nome Exemplo</p>
                        <p><strong className="strong">CPF:</strong> 123.456.789-00</p>
                        <p><strong className="strong">Email:</strong> emailexemplo@gmail.com</p>
                    </div>
                    <div className="container-info">
                        <p><strong className="strong">Status:</strong> Ativo</p>
                        <p><strong className="strong">Telefone:</strong> (12) 99999-9999</p>
                        <p><strong className="strong">Data de criação:</strong> 10/10/2022</p>
                    </div>
                    <div className="container-detalhes-desativar">
                        <div className="detalhes">
                            <i className="bi bi-file-text"></i> 
                            <p><strong>Detalhes</strong></p>
                        </div>
                        <div className="desativar">
                            <i className="bi bi-person-fill-slash"></i>
                            <p><strong>Desativar</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
