import React, { useEffect, useState, useContext, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs"; 
import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import { AuthContext } from "../hook/ContextAuth";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/CriacaoAdmin.css";

interface Adm {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
    tipo: number; // 1 para super admin, 2 para admin comum
    ativo: string;
    dataCadastro?: string;
}

const CriacaoAdmin: React.FC = () => {
    const { adm } = useContext(AuthContext);
    const navigate = useNavigate();
    const [novoAdm, setNovoAdm] = useState<Partial<Adm>>({
        tipo: 2, // Valor padrão para administrador comum
    });

    useEffect(() => {
        if (!adm || adm.tipo !== 1) {
            alert("Acesso negado! Apenas super administradores podem acessar esta área.");
            navigate("/");
            return;
        }
    }, [adm, navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoAdm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTipoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNovoAdm((prev) => ({ ...prev, tipo: parseInt(e.target.value) }));
    };

    const criarAdm = async (e: FormEvent) => {
        e.preventDefault();
        if (!adm) return;

        try {
            // Criptografando a senha antes de enviar
            const salt = bcrypt.genSaltSync(10);
            const senhaCriptografada = bcrypt.hashSync(novoAdm.senha || '', salt);

            const admData = {
                ...novoAdm,
                senha: senhaCriptografada, // Enviando a senha criptografada
            };

            await axios.post("http://localhost:8080/adm/criar", admData, {
                headers: { Authorization: `Bearer ${adm.token}` },
                params: { idSuperAdm: adm.id },
            });

            alert("Administrador criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar administrador:", error);
            alert("Erro ao criar administrador.");
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="criad_container">
                <h1 className="notif_titulo">Criar Administrador</h1>

                <form onSubmit={criarAdm}>
                    <div className="criad_form_linha">
                        <div className="criad_form_linha_input">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
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
                                placeholder="Digite aqui..."
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="criad_form_linha">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite aqui..."
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <p>Tipo de Administrador:</p>
                    <div className="criad_form_linha_radio">
                        <div className="criad_form_linha_radio_tipo">
                            <input
                                type="radio"
                                id="super_admin"
                                name="tipo"
                                value="1"
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
                                onChange={handleTipoChange}
                                required
                                defaultChecked
                            />
                            <label htmlFor="admin">Admin</label>
                        </div>
                    </div>

                    <div className="criad_botao_cad">
                        <BotaoCTA escrito="Cadastrar" aparencia="primario" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CriacaoAdmin;
