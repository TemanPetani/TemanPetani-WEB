import Swal from 'sweetalert2';

export default Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  width: 600,
  timer: 8000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
