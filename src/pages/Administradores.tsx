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
import { useNavigate } from "react-router-dom";

export const Administradores = () => {

    const { adm } = useContext(AuthContext);
    const [adms, setAdms] = useState<AdmProps[]>([]);

    const navigate = useNavigate();


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

    const HandleEdit = (id: any) => {
        navigate(`/editarAdmin/${id}`);
    };


    return (
        <div className="container-principal">

            <Sidebar />
            <h1 className="notif_titulo">Administradores</h1>

            <div className="container_admin">
                {adms.map((adm) => (
                    <div className="admin_card_container" key={adm.id}>
                        
                        <div className="admin_card_inicio">
                            <div className="admin_card_esq">
                                <img src="../src/img/foto_perfil_admin.svg" />
                            </div>
                            <div className="admin_card_dir">
                                <p>{adm.nome}</p>
                                <p><span>{adm.email}</span></p>
                            </div>
                        </div>
                        <div className="container-detalhes-desativar">
                            <div className="admin_botao_acoes editar" onClick={() => HandleEdit(adm.id)}>
                                <img src={IconEditar} alt="Editar" />
                                <h2>Editar</h2>
                            </div>
                            <div className="admin_botao_acoes ver " onClick={() => navigate(`/adm/informacoes/${adm.id}`)}>
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