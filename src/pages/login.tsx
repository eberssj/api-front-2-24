import { useContext, useState } from "react";
import { useAuth } from "../hook/Auth";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../hook/Axios";
import axios from "axios";
import { AuthContext } from "../hook/ContextAuth";
import '../styles/Login.css';

interface JwtPayLoad {
    tipo: string;
    sub: string;
}

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { post } = useAxios();
    const [erro, setErro] = useState(false);
    const { setAdm } = useContext(AuthContext);

    const handleLogin = () => {
        post("http://localhost:8080/login", { email, password })
            .then(async res => {
                const data = res.data;
                const decoded = jwtDecode<JwtPayLoad>(data.token);
                const tipo = await axios.get(`http://localhost:8080/adm/${decoded.sub}/tipo`, {
                    headers: { Authorization: `Bearer ${data.token}` }
                });

                const admData = {
                    token: data.token,
                    tipo: tipo.data,
                    sub: decoded.sub,
                    email
                };

                login(admData);
                setAdm(admData);
                navigate("/adm", { replace: true });
            })
            .catch(() => {
                setErro(true);
            });
    };

    return (
        <div className="login-container">
            <div className="login-left-side">
                <div className="login-form">
                    <h1>Entre como administrador</h1>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button onClick={handleLogin}>Entrar</button>
                    {erro && <div className="login-error">Erro ao fazer login</div>}
                    <Link to="/register">Cadastre-se</Link>
                </div>
            </div>

            <div className="login-right-side">
                {/* Não é mais necessário a tag <img> */}
            </div>
        </div>
    );
}
