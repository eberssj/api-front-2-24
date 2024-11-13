import MaskedInput from "react-text-mask";
import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/CriacaoAdmin.css";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useContext, useState, ChangeEvent, useEffect } from "react";
import { AuthContext } from "../hook/ContextAuth";
import { Toast } from "../components/Swal/Swal";
import axios from "axios";

const CadastrarBolsista = () => {
    const { adm } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);

    const [novoBolsista, setnovoBolsista] = useState({
        nome: "",
        cidade: "",
        cpf: "",
        telefone: "",
        valorBolsa: "",
        duracaoBolsa: "",
        areaAtuacao: "",
        convenio: "",
        projeto: ""
    });

    useEffect(() => {
        const fetchBolsistaData = async () => {
            if (isEditMode) {
                try {
                    const response = await axios.get(`http://localhost:8080/bolsistas/${id}`, {
                        headers: {
                            Authorization: `Bearer ${adm?.token}`,
                        },
                    });
                    setnovoBolsista(response.data);
                } catch (error) {
                    console.error("Erro ao buscar dados do bolsista:", error);
                    alert("Erro ao carregar os dados do bolsista para edição.");
                }
            }
        };
        fetchBolsistaData();
    }, [id, isEditMode, adm]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setnovoBolsista((prev) => ({ ...prev, [name]: value }));
    };

    const salvarBolsista = async (e: FormEvent) => {
        e.preventDefault();
        if (!adm) return;

        if (!novoBolsista.cpf || novoBolsista.cpf.replace(/\D/g, '').length !== 11) {
            alert("CPF incompleto.");
            return;
        }

        if (!novoBolsista.telefone || novoBolsista.telefone.replace(/\D/g, '').length !== 11) {
            alert("Telefone incompleto.");
            return;
        }

        try {

            const bolsistaData = {
                ...novoBolsista,
                cpf: novoBolsista.cpf.replace(/\D/g, ''),
                telefone: novoBolsista.telefone.replace(/\D/g, ''),
                projeto: { id: novoBolsista.projeto },
            };

            let response;

            if (isEditMode) {
                response = await axios.put(`http://localhost:8080/bolsistas/editar/${id}`, bolsistaData, {
                    headers: { Authorization: `Bearer ${adm.token}` },
                    params: { idAdm: adm.id },
                });
            } else {
                response = await axios.post("http://localhost:8080/bolsistas/criarBolsista", bolsistaData, {
                    headers: { Authorization: `Bearer ${adm.token}` },
                    params: { idAdm: adm.id },
                });
            }

            if (response.status === 200 || response.status === 201) {
                Toast.fire({
                    icon: 'success',
                    title: response.data.message || (isEditMode ? 'Bolsista editado com sucesso!' : 'Bolsista cadastrado com sucesso!'),
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
            console.error("Erro ao salvar bolsista:", error);
            const errorMessage = error.response?.data?.message || "Erro ao salvar bolsista.";
            alert(errorMessage);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="criad_container">
                <div className="infopro_cima">
                    <h1 className="infopro_titulo">{isEditMode ? "Editar Bolsista" : "Cadastrar Bolsista"}</h1>
                    <div className="infopro_cima_dir">
                        <BotaoCTA img="/src/img/voltar.svg" escrito="Voltar" aparencia="primario" onClick={() => navigate(-1)} />
                    </div>
                </div>

                <form onSubmit={salvarBolsista}>
                    <h2 className="criad_subtitulo">Informações Pessoais</h2>
                    <div className="criad_form_linha">
                        <div className="criad_form_linha_input">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={novoBolsista.nome}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="cidade">Cidade:</label>
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                value={novoBolsista.cidade}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>
                    </div>

                    <div className="criad_form_linha baixo">
                        <div className="criad_form_linha_input">
                            <label htmlFor="cpf">CPF:</label>
                            <MaskedInput
                                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                id="cpf"
                                name="cpf"
                                value={novoBolsista.cpf}
                                onChange={handleChange}
                                placeholder="___.___.___-__"
                                required
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="telefone">Telefone:</label>
                            <MaskedInput
                                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                id="telefone"
                                name="telefone"
                                value={novoBolsista.telefone}
                                onChange={handleChange}
                                placeholder="(__) _____-____"
                                required
                            />
                        </div>
                    </div>

                    <h2 className="criad_subtitulo top">Informações sobre a Bolsa</h2>
                    <div className="criad_form_linha baixo">
                        <div className="criad_form_linha_input">
                            <label htmlFor="valorBolsa">Valor da Bolsa:</label>
                            <input
                                type="number"
                                id="valorBolsa"
                                name="valorBolsa"
                                value={novoBolsista.valorBolsa}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="duracaoBolsa">Duração da Bolsa (em meses):</label>
                            <input
                                type="number"
                                id="duracaoBolsa"
                                name="duracaoBolsa"
                                value={novoBolsista.duracaoBolsa}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="areaAtuacao">Área de Atuação:</label>
                            <input
                                type="text"
                                id="areaAtuacao"
                                name="areaAtuacao"
                                value={novoBolsista.areaAtuacao}
                                onChange={handleChange}
                                placeholder="Digite aqui..."
                                required
                            />
                        </div>
                    </div>

                    <div className="criad_form_linha baixo">
                        <div className="criad_form_linha_input">
                            <label htmlFor="areaAtuacao">Projeto</label>
                            <select
                                id="projeto"
                                name="projeto"
                                value={novoBolsista.projeto}
                                onChange={handleChange}
                                required >
                                <option value="">Selecione um projeto</option>
                                <option value="1">Teste 01</option>
                                <option value="2">Teste 02</option>
                                <option value="3">Teste 03</option>
                                {/* Listar projetos existentes aqui depois (apenas o nome), e no value do option 
                                enviar o ID do projeto que tem aquele nome */}
                            </select>
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="convenio">Convênio</label>
                            <select
                                id="convenio"
                                name="convenio"
                                value={novoBolsista.convenio}
                                onChange={handleChange}
                                required >
                                <option value="">Selecione um Convênio</option>
                                <option value="teste01">Teste 01</option>
                                <option value="teste02">Teste 02</option>
                                <option value="teste03">Teste 03</option>
                                {/* Listar convênios existentes aqui depois */}
                            </select>
                        </div>
                    </div>

                    <div className="criad_botao_cad">
                        <BotaoCTA escrito={isEditMode ? "Salvar Alterações" : "Cadastrar Bolsista"}  aparencia="primario" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastrarBolsista;