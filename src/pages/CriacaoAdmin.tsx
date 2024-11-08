import React, { useEffect, useState, useContext, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import { AuthContext } from "../hook/ContextAuth";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/CriacaoAdmin.css";
import { Toast } from '../components/Swal/Swal'

interface Adm {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
    tipo: number;
    ativo: boolean;
    dataCadastro?: string;
}

const CriacaoAdmin: React.FC = () => {
    const { adm } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const isEditMode = Boolean(id);

    const [novoAdm, setNovoAdm] = useState<Partial<Adm>>({
        tipo: 2, // Valor padrão para administrador comum
        ativo: true, // Ao criar Admin ele vira ativo por padrão
        dataCadastro: new Date().toLocaleDateString("pt-BR")
    });

    const [senhaAntiga, setSenhaAntiga] = useState<string>('');

    useEffect(() => {
        if (!adm || adm.tipo !== 1) {
            alert("Acesso negado! Apenas super administradores podem acessar esta área.");
            navigate("/");
            return;
        }

        if (isEditMode) {
            axios.get(`http://localhost:8080/adm/${id}`, {
                headers: { Authorization: `Bearer ${adm.token}` },
            })
            .then((response) => {
                setNovoAdm(response.data); // Preenche o estado com os dados do admin
                setSenhaAntiga(response.data.senha); // Salva a senha antiga para comparação
            })
            .catch((error) => console.error("Erro ao carregar administrador:", error));
        }
    }, [adm, id, isEditMode, navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoAdm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTipoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNovoAdm((prev) => ({ ...prev, tipo: parseInt(e.target.value) }));
    };

    const salvarAdm = async (e: FormEvent) => {
        e.preventDefault();
        if (!adm) return;

        try {
            const salt = bcrypt.genSaltSync(10);
            const senhaCriptografada = bcrypt.hashSync(novoAdm.senha || '', salt);

            const admData = { ...novoAdm, senha: senhaCriptografada };

            if (isEditMode && senhaAntiga !== novoAdm.senha) {
                const senhaCriptografada = bcrypt.hashSync(novoAdm.senha || '', salt);
                novoAdm.senha = senhaCriptografada;
            }

            if (isEditMode) {
                await axios.put(`http://localhost:8080/adm/${id}`, novoAdm, {
                    headers: { Authorization: `Bearer ${adm.token}` },
                    params: { idSuperAdm: adm.id }
                });
                
                Toast.fire({
                    icon: 'success',
                    title: 'Administrador editado com sucesso!',
                    position: 'top',
                    background: '#ffffff',
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.style.marginTop = '32px';
                        const progressBar = toast.querySelector('.swal2-timer-progress-bar') as HTMLElement;
                        if (progressBar) {
                            progressBar.style.backgroundColor = '#28a745'; // Define a cor verde para a barra de progresso
                        }
                    }
                });
            } else {
                await axios.post("http://localhost:8080/adm/criar", admData, {
                    headers: { Authorization: `Bearer ${adm.token}` },
                    params: { idSuperAdm: adm.id },
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Administrador criado com sucesso!',
                    position: 'top',
                    background: '#ffffff',
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.style.marginTop = '32px';
                        const progressBar = toast.querySelector('.swal2-timer-progress-bar') as HTMLElement;
                        if (progressBar) {
                            progressBar.style.backgroundColor = '#28a745'; // Define a cor verde para a barra de progresso
                        }
                    }
                });
            }

            navigate("/adm/administradores");
        } catch (error) {
            console.error("Erro ao salvar administrador:", error);
            alert("Erro ao salvar administrador.");
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="criad_container">
                <h1 className="notif_titulo">{isEditMode ? "Editar Administrador" : "Criar Administrador"}</h1>

                <form onSubmit={salvarAdm}>
                    <div className="criad_form_linha">
                        <div className="criad_form_linha_input">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={novoAdm.nome || ''}
                                placeholder="Digite aqui..."
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={novoAdm.email || ''}
                                placeholder="Digite aqui..."
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="criad_form_linha baixo">
                        <div className="criad_form_linha_input">
                            <label htmlFor="cpf">CPF:</label>
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                value={novoAdm.cpf || ''}
                                placeholder="Digite aqui..."
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                type="tel"
                                id="telefone"
                                name="telefone"
                                value={novoAdm.telefone || ''}
                                placeholder="Digite aqui..."
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="criad_form_linha baixo">
                        <div className="criad_form_linha_input">
                            <label htmlFor="senha">Senha:</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder={isEditMode ? "Digite a nova senha..." : "Digite aqui..."}
                                onChange={handleChange}
                                minLength={8}
                                required={!isEditMode}
                            />
                        </div>
                    </div>
                    
                    {!isEditMode && (
                        <>
                            <p>Tipo de Administrador:</p>
                            <div className="criad_form_linha_radio">
                                <div className="criad_form_linha_radio_tipo">
                                    <input
                                        type="radio"
                                        id="super_admin"
                                        name="tipo"
                                        value="1"
                                        checked={novoAdm.tipo === 1}
                                        onChange={handleTipoChange}
                                        required
                                    />
                                    <label htmlFor="super_admin">Super Admin</label>
                                </div>

                                <div className="criad_form_linha_radio_tipo">
                                    <input
                                        type="radio"
                                        id="admin"
                                        name="tipo"
                                        value="2"
                                        checked={novoAdm.tipo === 2}
                                        onChange={handleTipoChange}
                                        required
                                    />
                                    <label htmlFor="admin">Admin</label>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="criad_botao_cad">
                        <BotaoCTA escrito={isEditMode ? "Salvar" : "Cadastrar"} aparencia="primario" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CriacaoAdmin;