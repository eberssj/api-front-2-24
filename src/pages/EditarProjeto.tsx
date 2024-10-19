import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import '../styles/EditarProjeto.css';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AuthContext } from '../hook/ContextAuth';

interface Projeto {
    id: number;
    referenciaProjeto: string;
    empresa: string;
    objeto: string;
    descricao: string;
    coordenador: string;
    valor: number;
    dataInicio: string;
    dataTermino: string;
}

const EditarProjeto = () => {
    const { adm } = useContext(AuthContext);
    const location = useLocation();
    const projeto: Projeto = location.state;
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Projeto>(projeto);
    const [files, setFiles] = useState({
        propostas: null,
        contratos: null,
        artigos: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles && selectedFiles.length > 0) {
            setFiles((prevFiles) => ({
                ...prevFiles,
                [name]: selectedFiles[0],
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('projeto', JSON.stringify(formData)); // Adiciona os dados do projeto como JSON

        if (files.propostas) formDataToSend.append('propostas', files.propostas);
        if (files.contratos) formDataToSend.append('contratos', files.contratos);
        if (files.artigos) formDataToSend.append('artigos', files.artigos);

        try {
            await axios.put(`http://localhost:8080/projeto/editar/${projeto.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${adm?.token}`, // Apenas o token JWT
                },
            });

            alert('Projeto atualizado com sucesso!');
            navigate(-1);
        } catch (error) {
            console.error('Erro ao atualizar o projeto:', error);
            alert('Erro ao atualizar o projeto. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="container-principal">
            <Sidebar />
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="cabecalho">
                    <strong onClick={() => navigate(-1)} className="link-voltar">
                        <i className="bi bi-arrow-left text-3xl text-blue-900"></i>
                    </strong>
                    <h1 className="texto-titulo">Editar Projeto</h1>
                </div>
                <div className="container-informacoes">
                    <div>
                        <label className="titulo">Referência do Projeto</label>
                        <input
                            className="texto"
                            type="text"
                            name="referenciaProjeto"
                            value={formData.referenciaProjeto}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="titulo">Empresa</label>
                        <input
                            className="texto"
                            type="text"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="titulo">Objeto</label>
                        <textarea
                            className="texto"
                            name="objeto"
                            value={formData.objeto}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="titulo">Descrição</label>
                        <input
                            className="texto"
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="titulo">Coordenador</label>
                        <input
                            className="texto"
                            type="text"
                            name="coordenador"
                            value={formData.coordenador}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="titulo">Valor</label>
                        <input
                            className="texto"
                            type="number"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="titulo">Data de Início</label>
                        <input
                            className="texto"
                            type="date"
                            name="dataInicio"
                            value={formData.dataInicio}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="titulo">Data de Término</label>
                        <input
                            className="texto"
                            type="date"
                            name="dataTermino"
                            value={formData.dataTermino}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="titulo">Propostas (Novo arquivo)</label>
                        <input type="file" name="propostas" className='input-padrao' onChange={handleFileChange} />
                    </div>
                    <div>
                        <label className="titulo">Contratos (Novo arquivo)</label>
                        <input type="file" name="contratos" className='input-padrao' onChange={handleFileChange} />
                    </div>
                    <div>
                        <label className="titulo">Artigos (Novo arquivo)</label>
                        <input type="file" name="artigos" className='input-padrao' onChange={handleFileChange} />
                    </div>
                </div>
                <div className="botoes-editar">
                    <button type="submit" className="botao-salvar">
                        Salvar
                    </button>
                    <button type="button" className="botao-cancelar" onClick={() => navigate(-1)}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarProjeto;
