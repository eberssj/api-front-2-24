import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../styles/EditarProjeto.css';

// Definição da interface do Projeto
interface Projeto {
    id: number;
    referenciaProjeto: string;
    empresa: string;
    objeto: string;
    descricao: string;
    coordenador: string;
    valor: number;
    dataInicio: number[];
    dataTermino: number[];
}

const EditarProjeto = () => {
    const location = useLocation();
    const projeto: Projeto = location.state; // Recebe o projeto da navegação
    const navigate = useNavigate();

    // Definindo os estados para armazenar as atualizações do projeto
    const [formData, setFormData] = useState<Projeto>(projeto);

    // Função para lidar com a mudança nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Função para enviar o formulário de edição
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/projetos/editar/${projeto.id}`, formData)
            .then(() => {
                alert('Projeto atualizado com sucesso!');
                navigate(-1); // Voltar à página de informações do projeto
            })
            .catch(error => {
                console.error('Erro ao atualizar o projeto:', error);
            });
    };

    return (
        <div className="editar-projeto-container">
            <h1 className="titulo-editar">Editar Projeto</h1>
            <form className="form-editar" onSubmit={handleSubmit}>
                <div className="campo-editar">
                    <label>Referência do Projeto</label>
                    <input type="text" name="referenciaProjeto" value={formData.referenciaProjeto} onChange={handleChange} />
                </div>
                <div className="campo-editar">
                    <label>Empresa</label>
                    <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} />
                </div>
                <div className="campo-editar">
                    <label>Objeto</label>
                    <input type="text" name="objeto" value={formData.objeto} onChange={handleChange} />
                </div>
                <div className="campo-editar">
                    <label>Descrição</label>
                    <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
                </div>
                <div className="campo-editar">
                    <label>Coordenador</label>
                    <input type="text" name="coordenador" value={formData.coordenador} onChange={handleChange} />
                </div>
                <div className="campo-editar">
                    <label>Valor</label>
                    <input type="number" name="valor" value={formData.valor} onChange={handleChange} />
                </div>
                {/* Botões de ação */}
                <div className="botoes-editar">
                    <button type="submit" className="botao-salvar">Salvar</button>
                    <button type="button" className="botao-cancelar" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarProjeto;
