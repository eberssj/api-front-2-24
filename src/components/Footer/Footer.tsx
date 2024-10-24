import "./Footer.css";
import logoGithub from "./logo_github.svg";
import logoAsync from "./logo_async.svg";

function Footer() {
  
  return (
    
   <footer>
    <div className="footer_cima">
        <div className="footer_esq">
            <a href="https://github.com/A-Sync-Fatec/api-fatec-3sem-24" target="_blank">
                <img src={logoGithub} alt="GitHub Logo" />
            </a>

            <button className="footer_voltar" onClick={() => window.scrollTo({ top: 0 })} > Voltar ao Topo
            </button>
        </div>
        <div className="footer_dir">
            <p>Este site é um projeto API (Aprendizagem por Projeto Integrador) desenvolvido pelo grupo ASYNC no 2° Semestre de 2024.</p>
            <img src={logoAsync} />
        </div>
    </div>
    <div className="footer_baixo">
        <p>FAPG Portal de Transparência © Todos os direitos reservados 2024 - ASYNC</p>
        <p>Política de Privacidade</p>
    </div>
    </footer>

  );
}

export default Footer;