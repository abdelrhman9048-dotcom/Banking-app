import axios from "../api/axios"

export const AdminAuthContext = createContext()

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem("admin")
        if (stored) setAdmin(JSON.parse(stored))
    },[])

    const login = async (email, password) => {
        const { data } = await axios.post("/admin/login", { email, password});

        setAdmin(data);
        localStorage.setItem("admin", JSON.stringify(data))
        localStorage.setItem("adminToken", data.token)
    }

    const register = async (name, email, password) => {
        const { data } = await axios.post("/admin/register", {
            name,
            email,
            password
        })

        setAdmin(data)
        localStorage.setItem("admin", JSON.stringify(data))
        localStorage.setItem("adminToken", data.token)
    };
    const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin")
    localStorage.removeItem("adminToken")
};

return (
    <AdminAuthContext.Provider
        value={{ admin, setAdmin, login, register, logout }}
    >
        {children}
    </AdminAuthContext.Provider>
)
}