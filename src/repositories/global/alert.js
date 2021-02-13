import route from '@/router/index'
import Swal from 'sweetalert2'

var alert = {
  responseCatch(error, code) {
    let errors = []
    if(error.response.status == 422) // Error de validación
      errors = error.response.data.errors;
    else if(error.response.status == 401) { // Error de token
      Swal.fire({icon: 'info',title: 'Su sesión a terminado',footer: code});
      localStorage.clear();
      route.push({ path: '/login' });
    } else if(error.response.status == 403) // Error de 
      Swal.fire({icon: 'error',title: error.message,text: error.response.data.message,footer: code});
    else if(error.response.status == 405) // Error de URL o ruta invalida
      Swal.fire({icon: 'error',title: error.message,text: error.response.data.message,footer: code});
    else if(error.response.status == 404) // Registro no encontrado
      route.push({ path: '/pages/404' });
    else
      Swal.fire({icon: 'error',title: error.message,text: error.response.data.message,footer: 'Ocurrió un error favor de comunicarse con soporte. ('+code+')'});
    
    return errors
  },
  response200(titulo, mensaje) {
    Swal.fire({
      toast: false, // Opcion para hacer la ventana mas pequeña o grande
      //background: '#77DD77',
      position: 'top-end',
      icon: 'success',
      title: titulo,
      html: mensaje,
      showConfirmButton: false,
      showCloseButton: true,
      timerProgressBar: true,
      timer: 30000
    })
  },
}

export default alert