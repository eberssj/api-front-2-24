import { useContext, useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/Administradores.css"
import { AuthContext } from "../hook/ContextAuth";
import { AdmProps } from "../Type/Adm";
import axios from "axios";

export const Administradores = () => {
    const { adm } = useContext(AuthContext);
    const [adms, setAdms] = useState<AdmProps[]>([]);


    useEffect(() => {
        const fetchAdms = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/adm/listar`, {
                    headers: { Authorization: `Bearer ${adm?.token}` },
                });
                setAdms(response.data || null);
            } catch (error) {
                console.error('Erro ao carregar o projeto:', error);
            }
        };

        fetchAdms();
    }, []);

    return (
        <div className="container-principal">
            <Sidebar />
            <div className="container-externo">
                {adms.map((adm) => (
                    <div className="container-adm" key={adm.id}>
                        <div className="container-info">
                            <p><strong className="strong">Nome:</strong> {adm.nome}</p>
                            <p><strong className="strong">CPF:</strong> {adm.cpf}</p>
                            <p><strong className="strong">Email:</strong> {adm.email}</p>
                        </div>
                        <div className="container-info">
                            <p><strong className="strong">Status:</strong> {adm.ativo}</p>
                            <p><strong className="strong">Telefone:</strong> ({adm.telefone?.ddd}) {adm.telefone?.numero}</p>
                            <p><strong className="strong">Data de cadastro:</strong> {adm.dataCadastro ? new Date(adm.dataCadastro).toLocaleDateString() : "Não informado"}</p>
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
                ))}
            </div>

        </div>
    )}