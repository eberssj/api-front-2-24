import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/CriacaoAdmin.css";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useContext, useState, ChangeEvent, useEffect } from "react";
import { AuthContext } from "../hook/ContextAuth";
import { Toast } from "../components/Swal/Swal";
import axios from "axios";

const CadastrarConvenio = () => {
    const { adm } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);

    const [novoConvenio, setnovoConvenio] = useState({
        nome: "",
        tipoConvenio: "",
        objetivo: "",
        instituicao: "",
        prazo: ""
    });

    useEffect(() => {
        const fetchConvenioData = async () => {
            if (isEditMode) {
                try {
                    const response = await axios.get(`http://localhost:8080/convenio/listar/${id}`, {
                        headers: {
                            Authorization: `Bearer ${adm?.token}`,
                        },
                    });
    
                    // Verifica o formato da data recebida
                    console.log("Data recebida do backend:", response.data.prazo);
    
                    const convenioData = response.data;
    
                    // Converter o campo 'prazo' para o formato 'YYYY-MM-DD'
                    const prazoDate = new Date(convenioData.prazo);
                    const prazoFormatted = prazoDate.toISOString().split('T')[0];
    
                    // Atribuir o valor formatado ao campo 'prazo'
                    convenioData.prazo = prazoFormatted;
    
                    // Atualizar o estado
                    setnovoConvenio(convenioData);
                } catch (error) {
                    console.error("Erro ao buscar dados do Convênio:", error);
                    alert("Erro ao carregar os dados do Convênio para edição.");
                }
            }
        };
        fetchConvenioData();
    }, [id, isEditMode, adm]);
    

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setnovoConvenio((prev) => ({ ...prev, [name]: value }));
    };

    const salvarConvenio = async (e: FormEvent) => {
        e.preventDefault();
        if (!adm) return;

        try {
            const ConvenioData = {
                ...novoConvenio
            };

            console.log("JSON enviado para o backend:", ConvenioData);
            console.log("Token enviado para o backend:", adm?.token);

            let response;

            if (isEditMode) {
                response = await axios.put(`http://localhost:8080/convenio/editar/${id}`, ConvenioData, {
                    headers: { Authorization: `Bearer ${adm.token}` },
                    params: { idAdm: adm.id },
                });
            } else {
                response = await axios.post("http://localhost:8080/convenio/criar", ConvenioData, {
                    headers: { Authorization: `Bearer ${adm.token}` },
                    params: { idAdm: adm.id },
                });
            }

            if (response.status === 200 || response.status === 201) {
                Toast.fire({
                    icon: 'success',
                    title: response.data.message || (isEditMode ? 'Convênio editado com sucesso!' : 'Convênio cadastrado com sucesso!'),
                    position: 'top',
                    background: '#ffffff',
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.style.marginTop = '32px';
                        const progressBar = toast.querySelector('.swal2-timer-progress-bar') as HTMLElement;
                        if (progressBar) {
                            progressBar.style.backgroundColor = '#28a745';
                        }
                    }
                });
                navigate("/adm/relatorio");
            } else {
                throw new Error(response.data.message || 'Erro inesperado.');
            }
        } catch (error: any) {
            // Exibe o objeto de erro completo no console
            console.error("Erro completo:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        
            if (error.response) {
                // Quando há uma resposta do servidor com status de erro, mostra os detalhes
                console.error("Detalhes do erro da resposta:", {
                    mensagem: error.message,
                    dadosResposta: error.response.data,
                    statusResposta: error.response.status,
                    cabecalhosResposta: error.response.headers,
                });
                alert(error.response.data?.message || "Erro ao salvar Convênio.");
            }
        }
        
        
    };

    return (
        <div>
            <Sidebar />
            <div className="criad_container">
                <div className="infopro_cima">
                    <h1 className="infopro_titulo">{isEditMode ? "Editar Convênio" : "Cadastrar Convênio"}</h1>
                    <div className="infopro_cima_dir">
                        <BotaoCTA img="/src/img/voltar.svg" escrito="Voltar" aparencia="primario" onClick={() => navigate(-1)} />
                    </div>
                </div>

                <form onSubmit={salvarConvenio}>
                    <div className="criad_form_linha">
                        <div className="criad_form_linha_input">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={novoConvenio.nome}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="tipoConvenio">Tipo de Convênio:</label>
                            <input
                                type="text"
                                id="tipoConvenio"
                                name="tipoConvenio"
                                value={novoConvenio.tipoConvenio}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>

                        <div className="criad_form_linha_input maior">
                            <label htmlFor="objetivo">Objetivo</label>
                            <input
                                type="text"
                                id="objetivo"
                                name="objetivo"
                                value={novoConvenio.objetivo}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>
                    </div>

                    <div className="criad_form_linha baixo">
                        <div className="criad_form_linha_input">
                            <label htmlFor="instituicao">Instituição</label>
                            <input
                                type="text"
                                id="instituicao"
                                name="instituicao"
                                value={novoConvenio.instituicao}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="prazo">Prazo</label>
                            <input
                                type="date"
                                id="prazo"
                                name="prazo"
                                value={novoConvenio.prazo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="criad_botao_cad">
                        <BotaoCTA escrito={isEditMode ? "Salvar Alterações" : "Cadastrar Convênio"} aparencia="primario" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastrarConvenio;