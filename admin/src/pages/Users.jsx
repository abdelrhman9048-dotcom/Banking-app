import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Users as UsersIcon, Mail, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("/admin/users");
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("هل انت متأكد من حذف هذا المستخدم؟")) return;

        try {
            await axios.delete(`/admin/users/${id}`);
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div
            className="pt-20 min-h-screen bg-linear-to-br from-[#0a0f1f] via-[#1a237e] to-[#3f51b5]
            py-12 px-6 text-white"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="max-w-7xl mx-auto"
            >
                <h2
                    className="text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-indigo-400
                    via-purple-400 to-pink-400 text-transparent bg-clip-text"
                >
                    👥 قائمة المستخدمين
                </h2>

                {loading ? (
                    <div className="text-center text-gray-300 text-lg">
                        ⏳جاري تحميل المستخدمين...
                    </div>
                ) : users.length === 0 ? (
                    <p className="text-center text-gray-400 text-lg">
                        لا يوجد مستخدمين بعد.
                    </p>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.08 },
                            },
                        }}
                    >
                        {users.map((u, index) => (
                            <motion.div
                                key={u._id}
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    rotateX: 2,
                                    rotateY: -2,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                className="relative p-6 rounded-2xl border border-white/10
                                bg-linear-to-br from-white/5 via-indigo-900/10 to-purple-900/10
                                backdrop-blur-md shadow-lg shadow-black/30
                                hover:shadow-2xl hover:bg-white/10 transition-all duration-300"
                            >
                                <div
                                    className="absolute top-4 right-4 bg-white/10 p-2
                                    rounded-full text-indigo-400"
                                >
                                    <UsersIcon size={20} />
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-indigo-300">
                                    {u.name}
                                </h3>

                                <div className="flex items-center text-gray-200 text-sm mb-2">
                                    <Mail
                                        size={16}
                                        className="ml-2 text-indigo-400"
                                    />
                                    {u.email}
                                </div>

                                <div
                                    className="flex items-center ml-18 gap-2
                                    text-green-400 font-semibold mt-12"
                                >
                                    ${u.balance.toFixed(2)}
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => deleteUser(u._id)}
                                    className="absolute bottom-4 left-4 flex items-center gap-1
                                    bg-red-500/80 hover:bg-red-600 transition px-3 py-1.5
                                    rounded-lg text-sm font-semibold shadow-md"
                                >
                                    <Trash2 size={14} />
                                    حذف
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Users;