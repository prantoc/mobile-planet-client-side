import { useEffect, useState } from "react"

export const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false)
    const [isSellerLoading, setIsSellerLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/users/seller/${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('mobile-planet')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsSeller(data.isSeller)
                    setIsSellerLoading(false)
                })
        }
    }, [email])
    return [isSeller, isSellerLoading];
}