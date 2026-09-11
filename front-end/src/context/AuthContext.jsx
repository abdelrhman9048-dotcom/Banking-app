import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token")

                if (!token) {
                    setLoading(false)
                    return
                }

                const { data } = await axios.get(
                    "http://localhost:4000/api/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setUser(data)

            } catch (err) {
                console.error(
                    "FETCH USER ERROR:",
                    err.response?.data || err.message
                )

                localStorage.removeItem("token")
                localStorage.removeItem("user")

            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])


    const login = async (email, password) => {
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/auth/login",
                {
                    email,
                    password,
                }
            )

            console.log("LOGIN SUCCESS:", data)

            setUser(data)

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            )

            localStorage.setItem(
                "token",
                data.token
            )

        } catch (err) {
            console.error(
                "LOGIN ERROR:",
                err.response?.data || err.message
            )

            throw err
        }
    }


    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            )

            console.log("REGISTER SUCCESS:", data)

            setUser(data)

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            )

            localStorage.setItem(
                "token",
                data.token
            )

        } catch (err) {
            console.error(
                "REGISTER ERROR:",
                err.response?.data || err.message
            )

            throw err
        }
    }


    const logout = () => {
        setUser(null)

        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                register,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}