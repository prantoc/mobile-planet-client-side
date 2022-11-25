import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const successToast = (message) => {
    toast.success(message, {
        id: 'clipboard',
        duration: 4000,
        position: 'top-center',
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
}
const errorToast = (message) => {
    toast.error(message, {
        id: 'clipboard',
        duration: 4000,
        position: 'top-center',
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
}



//# Sweet Alert Delete Confirmation Swal
const MySwal = withReactContent(Swal)
const deleteItem = () => {
    MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
}

export { successToast, errorToast, deleteItem }