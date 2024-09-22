import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PageNotAllowed() {

    const navigate = useNavigate();

    Swal.fire({
        title: "Acesso Negado!",
        confirmButtonText: "OK",
        width: 410,
        confirmButtonColor: 'rgb(255, 0, 53)',
        denyButtonColor: 'rgb(0,114,187)',
        heightAuto: false,
        backdrop: 'rgba(0,0,0,0.7)',
        customClass: { 
            confirmButton: 'cButton',
            denyButton: 'dButton',
        }

    }).then(() => {
            navigate("/");
    });

    return (
        <div>
            <h1>Error! 403</h1>
            <h1>Page Not Allowed!</h1>
        </div>
    )
}