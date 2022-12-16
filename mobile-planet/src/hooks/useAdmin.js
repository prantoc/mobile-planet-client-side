import { useEffect, useState } from "react"

export const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`, {
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