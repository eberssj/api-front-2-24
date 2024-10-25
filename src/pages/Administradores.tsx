import { useContext, useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/Administradores.css"
import { AuthContext } from "../hook/ContextAuth";
import { AdmProps } from "../Type/Adm";
import axios from "axios";
import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import IconEditar from "../img/editar.svg"
import IconVer from "../img/ver.svg"
import IconUnplug from "../img/unplug.svg"
import UserAdd from "../img/user_add.svg"

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
            <h1 className="notif_titulo">Administradores</h1>

            <div className="container_admin">
                {adms.map((adm) => (
                    <div className="container-projeto" key={adm.id}>
                        <div className="container-info">
                            <p><span>Nome:</span> {adm.nome}</p>
                            <p><span>CPF:</span> {adm.cpf}</p>
                            <p><span>Email:</span> {adm.email}</p>
                        </div>
                        <div className="container-info">
                            <p><span>Ativo:</span> {adm.ativo ? "Sim" : "Não"}</p>
                            <p><span>Telefone:</span> ({adm.telefone?.ddd}) {adm.telefone?.numero}</p>
                            <p><span>Data de cadastro:</span> {adm.dataCadastro ? new Date(adm.dataCadastro).toLocaleDateString() : "Não informado"}</p>
                        </div>
                        <div className="container-detalhes-desativar">
                            <div className="admin_botao_acoes editar">
                                <img src={IconEditar} />
                                <h2>Editar</h2>
                            </div>
                            <div className="admin_botao_acoes ver ">
                                <img src={IconVer} />
                                <h2>Ver</h2>
                            </div>
                            <div className="admin_botao_acoes desativ">
                                <img src={IconUnplug} />
                                <h2>Desativ.</h2>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin_botao_cadastro">
                <BotaoCTA img={UserAdd} escrito="Cadastrar Novo Admin" aparencia="primario" link="/adm/cadastrar-administrador"/>
            </div>

        </div>
    )}