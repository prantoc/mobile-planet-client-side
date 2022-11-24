import toast from "react-hot-toast";
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

export { successToast, errorToast }