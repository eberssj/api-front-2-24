import React, { useEffect, useState, useContext, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import MaskedInput from "react-text-mask";
import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import { AuthContext } from "../hook/ContextAuth";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/CriacaoAdmin.css";
import { Toast } from '../components/Swal/Swal';

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
        tipo: 2,
        ativo: true,
        dataCadastro: new Date().toLocaleDateString("pt-BR"),
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
                response.data.cpf = formatCPF(response.data.cpf);
                response.data.telefone = formatTelefone(response.data.telefone);
                setNovoAdm(response.data);
                setSenhaAntiga(response.data.senha);
            })
            .catch((error) => console.error("Erro ao carregar administrador:", error));
        }
    }, [adm, id, isEditMode, navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoAdm((prev) => ({ ...prev, [name]: value }));
    };

    const salvarAdm = async (e: FormEvent) => {
        e.preventDefault();
        if (!adm) return;

        if (!novoAdm.cpf || novoAdm.cpf.replace(/\D/g, '').length !== 11) {
            alert("CPF incompleto.");
            return;
        }

        if (!novoAdm.telefone || novoAdm.telefone.replace(/\D/g, '').length !== 11) {
            alert("Telefone incompleto.");
            return;
        }

        try {
            const salt = bcrypt.genSaltSync(10);
            let senhaCriptografada = '';

            if (isEditMode && novoAdm.senha && senhaAntiga !== novoAdm.senha) {
                senhaCriptografada = bcrypt.hashSync(novoAdm.senha, salt);
            }

            const admData = {
                ...novoAdm,
                senha: senhaCriptografada || novoAdm.senha,
                cpf: novoAdm.cpf?.replace(/\D/g, ''),
                telefone: novoAdm.telefone?.replace(/\D/g, ''),
            };

            let response;

            if (isEditMode) {
                response = await axios.put(`http://localhost:8080/adm/${id}`, admData, {
                    headers: { Authorization: `Bearer ${adm.token}` },
                    params: { idSuperAdm: adm.id },
                });
            } else {
                response = await axios.post("http://localhost:8080/adm/criar", admData, {
                    headers: { Authorization: `Bearer ${adm.token}` },
                    params: { idSuperAdm: adm.id },
                });
            }

            if (response.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: response.data.message || (isEditMode ? 'Administrador editado com sucesso!' : 'Administrador criado com sucesso!'),
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

                navigate("/adm/administradores");
            } else {
                throw new Error(response.data.message || 'Erro inesperado.');
            }
        } catch (error: any) {
            console.error("Erro ao salvar administrador:", error);
            const errorMessage = error.response?.data?.message || "Erro ao salvar administrador.";
            alert(errorMessage);
        }
    };

    const formatCPF = (cpf: string) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    const formatTelefone = (telefone: string) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
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
                            <MaskedInput
                                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                id="cpf"
                                name="cpf"
                                value={novoAdm.cpf || ''}
                                placeholder="___.___.___-__"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="criad_form_linha_input">
                            <label htmlFor="telefone">Telefone:</label>
                            <MaskedInput
                                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                id="telefone"
                                name="telefone"
                                value={novoAdm.telefone || ''}
                                placeholder="(__) _____-____"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="criad_form_linha baixo">
                        {isEditMode && (
                            <div className="criad_form_linha_input">
                                <label htmlFor="senha">Senha:</label>
                                <input
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    placeholder="Digite aqui..."
                                    onChange={handleChange}
                                    minLength={8}
                                />
                            </div>
                        )}
                    </div>

                    <div className="criad_botao_cad">
                        <BotaoCTA escrito={isEditMode ? "Salvar" : "Cadastrar"} aparencia="primario" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CriacaoAdmin;