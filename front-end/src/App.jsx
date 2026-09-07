import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Header from "./component/Header";
import ProtectedRoute from "./component/ProtectedRoute";
import Dashboard  from "./pages/Dashboard";
import Deposit  from "./pages/Deposit";
import Login  from "./pages/Login";
import MyCard from "./pages/MyCard";
import Notifications  from "./pages/Notifications";
import Profile  from "./pages/Profile";
import Register  from "./pages/Register";
import Transfer  from "./pages/Transfer";
import Transactions from "./pages/Transactions";
import VerifyDeposit  from "./pages/VerifyDeposit";


const App = () => {
    return (
        <Router>
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
                    <Route path="/MyCard" element={<ProtectedRoute><MyCard /></ProtectedRoute>} />
                    <Route path="/Notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                    <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/Transfer" element={<Transfer />} />
                    <Route path="/Transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                    <Route path="/Verifydeposit" element={<ProtectedRoute><VerifyDeposit /></ProtectedRoute>} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;