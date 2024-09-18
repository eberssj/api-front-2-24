import Swal, { SweetAlertOptions } from "sweetalert2";
import './Swal.css';

export const warning = (message: string) => {
    const options: SweetAlertOptions = {
        title: "Aviso!",
        text: message,
        icon: 'warning',
        confirmButtonText: 'OK',
        backdrop: 'rgba(0,0,0,0.7)',
        timer: 2000, // 3 segundos
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'my-popup-class',
            title: 'my-title-class',
            confirmButton: 'my-confirm-button-class',
            timerProgressBar: 'my-progress-bar-class'
        }
    };
    Swal.fire(options);
};

export const erroror = (message: string) => {
    const options: SweetAlertOptions = {
        title: "Error!",
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
        backdrop: 'rgba(0,0,0,0.7)',
        timer: 3000, // 3 segundos
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'my-popup-class',
            title: 'my-title-class',
            confirmButton: 'my-confirm-button-class',
            timerProgressBar: 'my-progress-bar-class'
        }
    };
    Swal.fire(options);
};

export const success = (message: string) => {
    const options: SweetAlertOptions = {
        title: "Sucesso!",
        text: message,
        icon: 'success',
        confirmButtonText: 'OK',
        backdrop: 'rgba(0,0,0,0.7)',
        timer: 3000, // 3 segundos
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'my-popup-class',
            title: 'my-title-class',
            confirmButton: 'my-confirm-button-class',
            timerProgressBar: 'my-progress-bar-class'
        }
    };
    Swal.fire(options);
};

export const cadastradoEmailSenha = () => {
    const options: SweetAlertOptions = {
        title: "E-mail ou senha já existentes!",
        icon: 'question',
        confirmButtonText: 'OK',
        backdrop: 'rgba(0,0,0,0.7)',
        timer: 3000, // 3 segundos
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'my-popup-class',
            title: 'my-title-class',
            confirmButton: 'my-confirm-button-class',
            timerProgressBar: 'my-progress-bar-class'
        }
    };
    Swal.fire(options);
};

export const loginSenhaEmail = () => {
    const options: SweetAlertOptions = {
        title: "Usuário inexistente ou senha incorreta",
        icon: 'question',
        confirmButtonText: 'OK',
        backdrop: 'rgba(0,0,0,0.7)',
        timer: 3000, // 3 segundos
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'my-popup-class',
            title: 'my-title-class',
            confirmButton: 'my-confirm-button-class',
            timerProgressBar: 'my-progress-bar-class'
        }
    };
    Swal.fire(options);
};

export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,// 1.25 segundos
    background: `rgba( 240, 240, 240, 1 )`,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});