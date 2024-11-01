import { useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export const RedefinirSenha = () => {
    const [novaSenha, setNovaSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handlePasswordChange = async (e: any) => {
        e.preventDefault();

        if (!token) {
            setMensagem("Token inválido ou ausente.");
            return;
        }

        try {
            await axios.post(`http://localhost:8080/adm/redefinir-senha?token=${token}`, novaSenha, {
                headers: {
                    'Content-Type': 'text/plain',
                }
            });
            setMensagem('Senha redefinida com sucesso! Redirecionando para login...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error: any) {
            let errorMessage;
            if (error.response?.data) {
                errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : error.response.data.error || 'Erro desconhecido ao redefinir a senha.';
            } else {
                errorMessage = 'Erro ao redefinir a senha.';
            }
            setMensagem(errorMessage);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Redefinir Senha</h2>
            <form onSubmit={handlePasswordChange}>
                <input
                    type="password"
                    placeholder="Nova Senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '20px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Redefinir Senha
                </button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};
