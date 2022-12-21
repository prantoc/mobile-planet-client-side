import { useEffect, useState } from "react"

export const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/users/admin/${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('mobile-planet')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin)
                    setIsAdminLoading(false)
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading];
}