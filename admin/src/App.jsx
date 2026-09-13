import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cards from "./pages/Cards";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

import Header from "./components/Header";
import { AdminAuthContext } from "./context/AdminAuthContext";

function App() {
  const { logout } = useContext(AdminAuthContext);

  return (
    <BrowserRouter>
      <Header onLogout={logout} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;