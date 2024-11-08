import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../hook/ContextAuth"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/GerenciarAdms.css";

const GerenciarAdms: React.FC = () => {
    const { adm } = useContext(AuthContext);
    const navigate = useNavigate();
    const [adms, setAdms] = useState<Adm[]>([]);
    const [novoAdm, setNovoAdm] = useState<Partial<Adm>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!adm || adm.tipo !== 1) {
            alert("Acesso negado! Apenas super administradores podem acessar esta área.");
            navigate("/");
            return;
        }
        listarAdms();
    }, [adm, navigate]);

    const listarAdms = async () => {
        if (!adm) return;

        try {
            const response = await axios.get("http://localhost:8080/adm/listar", {
                headers: { Authorization: `Bearer ${adm.token}` },
            });
            setAdms(response.data);
        } catch (error) {
            console.error("Erro ao listar administradores:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const excluirAdm = async (id: number) => {
        if (!adm) return; // Verifica se 'adm' não é nulo ou indefinido

        try {
            await axios.delete(`http://localhost:8080/adm/excluir/${id}`, {
                headers: { Authorization: `Bearer ${adm.token}` },
                params: { idSuperAdm: adm.id },
            });
            alert("Administrador excluído com sucesso!");
            listarAdms();
        } catch (error) {
            console.error("Erro ao excluir administrador:", error);
            alert("Erro ao excluir administrador.");
        }
    };

    if (isLoading) return <div>Carregando...</div>;

    return (
        <div className="container-gerenciar-adms">
            <h1>Gerenciar Administradores</h1>
            <div className="form-criar-adm">
                <h2>Criar Novo Administrador</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setNovoAdm({ ...novoAdm, nome: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setNovoAdm({ ...novoAdm, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="CPF"
                    onChange={(e) => setNovoAdm({ ...novoAdm, cpf: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    onChange={(e) => setNovoAdm({ ...novoAdm, telefone: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setNovoAdm({ ...novoAdm, senha: e.target.value })}
                />
                <select
                    onChange={(e) => setNovoAdm({ ...novoAdm, tipo: e.target.value })}
                >
                    <option value="1">Super Administrador</option>
                    <option value="2">Administrador Comum</option>
                </select>
                <button onClick={criarAdm} className="botao-projeto">Criar Administrador</button>
            </div>

            <h2>Lista de Administradores</h2>
            <ul className="lista-adms">
                {adms.map((adm) => (
                    <li key={adm.id} className="adm-item">
                        <span>
                            {adm.nome} - {adm.tipo === '1' ? "Super Admin" : "Admin Comum"}
                        </span>
                        <button onClick={() => excluirAdm(adm.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GerenciarAdms;
