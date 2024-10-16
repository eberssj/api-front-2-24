import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import '../styles/EditarProjeto.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AuthContext } from '../hook/ContextAuth';

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
    const { adm } = useContext(AuthContext);
    const location = useLocation();
    const projeto: Projeto = location.state; // Recebe o projeto da navegação
    const navigate = useNavigate();

    // Definindo os estados para armazenar as atualizações do projeto
    const [formData, setFormData] = useState<Projeto>(projeto);

    // Função para lidar com a mudança nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Função para enviar o formulário de edição
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios({
            method: 'put',
            url: `http://localhost:8080/projeto/editar/${projeto.id}`, // Corrigi o endpoint
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adm?.token}`
            }
        })
        .then(() => {
            alert('Projeto atualizado com sucesso!');
            navigate(-1); // Voltar à página anterior
        })
        .catch(error => {
            console.error('Erro ao atualizar o projeto:', error);
        });
    };

    return (
        <div className="container-principal">
            <Sidebar />
            <form className="formulario" onSubmit={handleSubmit}>
                <div className='cabecalho'>
                    <strong onClick={() => navigate(-1)} className="link-voltar">
                        <i className="bi bi-arrow-left text-3xl text-blue-900"></i>
                    </strong>
                    <h1 className="texto-titulo">Editar Projeto</h1>
                </div>
                <div className='container-informacoes'>
                    <div>
                        <label className='titulo'>Referência do Projeto</label> <br />
                        <input className='texto' type="text" name="referenciaProjeto" value={formData.referenciaProjeto} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='titulo'>Empresa</label> <br />
                        <input className='texto' type="text" name="empresa" value={formData.empresa} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='titulo'>Objeto</label> <br />
                        <textarea className='texto' name="objeto" value={formData.objeto} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='titulo'>Descrição</label> <br />
                        <input className='texto' type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='titulo'>Coordenador</label> <br />
                        <input className='texto' type="text" name="coordenador" value={formData.coordenador} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='titulo'>Valor</label> <br />
                        <input className='texto' type="number" name="valor" value={formData.valor} onChange={handleChange} />
                    </div>
                </div>
                <div className="botoes-editar">
                    <button type="submit" className="botao-salvar">Salvar</button>
                    <button type="button" className="botao-cancelar" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarProjeto;