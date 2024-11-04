import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/VerAdministrador.css";
import { AdmProps } from "../Type/Adm";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { AuthContext } from "../hook/ContextAuth"; // Importa o contexto de autenticação

const VerAdministrador = () => {
  const { id } = useParams();
  const { adm } = useContext(AuthContext); // Pega o token do contexto
  const [admin, setAdmin] = useState<AdmProps | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/adm/${id}`, {
          headers: { Authorization: `Bearer ${adm?.token}` },
        });
        setAdmin(response.data);
      } catch (error) {
        console.error("Erro ao carregar os detalhes do administrador:", error);
      }
    };

    fetchAdmin();
  }, [id, adm]);

  if (!admin) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Sidebar />
      <div className="verad_container">
        <h1>Informações do Administrador</h1>
        <div className="verad_info">
          <p><strong>Nome:</strong> {admin.nome}</p>
          <p><strong>CPF:</strong> {admin.cpf}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Telefone:</strong> ({admin.telefone?.ddd}) {admin.telefone?.numero}</p>
          <p><strong>Ativo:</strong> {admin.ativo ? "Sim" : "Não"}</p>
          <p><strong>Tipo:</strong> {Number(admin.tipo) === 1 ? "Super Admin" : Number(admin.tipo) === 2 ? "Admin" : "Tipo Desconhecido"}</p>
          <p className="verad_cad"><strong>Data de Cadastro:</strong> {admin.dataCadastro ? (admin.dataCadastro instanceof Date ? admin.dataCadastro.toLocaleDateString("pt-BR") : admin.dataCadastro) : "Não informado"}</p>
        </div>
      </div>
    </>
  );
};

export default VerAdministrador;