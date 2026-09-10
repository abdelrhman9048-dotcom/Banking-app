import { useContext, useState } from "react";

const Deposit = () => {
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    console.log("Deposit amount:", amount);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm mx-auto mt-10 text-center">
      <h2 className="text-xl font-bold mb-4">💰 إيداع رصيد</h2>

      <input
        type="number"
        placeholder="أدخل المبلغ بالدولار"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded-md p-2 w-full text-center mb-4"
      />

      <button
        onClick={handleDeposit}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
      >
        متابعة الدفع عبر Stripe
      </button>
    </div>
  );
};

export default Deposit;