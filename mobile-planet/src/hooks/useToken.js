import { useEffect, useState } from "react"

export const useToken = email => {
    const [token, setToken] = useState('')
    useEffect(() => {
        if (email) {
            fetch(`https://b612-used-products-resale-server-side-prantoc.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('mobile-planet', data.accessToken)
                        setToken(data.accessToken)
                    }
                })
        }
    }, [email])
    return token;
}