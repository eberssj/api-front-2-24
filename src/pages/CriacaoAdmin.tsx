import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "../styles/CriacaoAdmin.css";

export default function CriacaoAdmin() {
    return (
        <div>
            <Sidebar />
            
            <div className="criad_container">
                <h1 className="notif_titulo">Criar Administrador</h1>

            <form>
                <div className="criad_form_linha">
                    <div className="criad_form_linha_input">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite aqui..." required />
                    </div>

                    <div className="criad_form_linha_input">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Digite aqui..." required />
                    </div>
                </div>

                <div className="criad_form_linha baixo">
                    <div className="criad_form_linha_input">
                        <label htmlFor="cpf">CPF:</label>
                        <input type="text" id="cpf" name="cpf" placeholder="Digite aqui..." required />
                    </div>

                    <div className="criad_form_linha_input">
                        <label htmlFor="telefone">Telefone:</label>
                        <input type="tel" id="telefone" name="telefone" placeholder="Digite aqui..." required />
                    </div>
                </div>

                <p>Tipo de Administrador:</p>

                <div className="criad_form_linha_radio">
                    <div className="criad_form_linha_radio_tipo">
                        <input type="radio" id="super_admin" name="tipo_admin" value="Super Admin" required />
                        <label htmlFor="super_admin">Super Admin</label>
                    </div>

                    <div className="criad_form_linha_radio_tipo">
                        <input type="radio" id="admin" name="tipo_admin" value="Admin" required />
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
}
