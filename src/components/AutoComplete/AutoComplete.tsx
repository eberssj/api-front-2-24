import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Projeto } from '../../Type/Projeto';
import '../../styles/PortalTransparencia.css'

interface AutoCompleteProps {
    prop: keyof Projeto;
    onValueChange: (value: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ prop, onValueChange }) => {
    const [opcoes, setOpcoes] = useState<string[]>([]);
    const [valorSelecionado, setValorSelecionado] = useState('');

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await axios.get<Projeto[]>('http://localhost:8080/projeto/listar');
                const projetos = response.data;
                const opcoesEspecificas = Array.from(new Set(projetos.map((projeto) => projeto[prop] as string))).sort((a, b) => a.localeCompare(b));
                setOpcoes(opcoesEspecificas);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProjetos();
    }, [prop]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setValorSelecionado(value);
        onValueChange(value);
    };

    return (
        <div>
            <select
                value={valorSelecionado}
                onChange={handleSelectChange}
                className="input-padrao"
            >
                <option value="">Escolha uma opção</option>
                {opcoes.map((opcao, index) => (
                    <option key={index} value={opcao}>
                        {opcao}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AutoComplete;