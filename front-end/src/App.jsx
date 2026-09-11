import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./component/Header"
import ProtectedRoute from "./component/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Transfer from "./pages/Transfer"
import Profile from "./pages/Profile"
import MyCard from "./pages/Cards"
import Deposit from "./pages/Deposit"
import VerifyDeposit from "./pages/VerifyDeposit"
import Notifications from "./pages/Notifications"
import { AuthProvider } from "./context/AuthContext"


const App = () => {
    return (
              <AuthProvider>
            <Router>
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                        <Route path="/transfer" element={<ProtectedRoute><Transfer /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/mycard" element={<ProtectedRoute><MyCard /></ProtectedRoute>} />
                        <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
                        <Route path="/verify-deposit" element={<ProtectedRoute><VerifyDeposit /></ProtectedRoute>} />
                        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;